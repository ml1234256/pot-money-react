import dayjs from "dayjs";
import { useEffect, useState } from "react";

export type Type = '-' | '+';

export type RecordItem = {
    type: '-' | '+';
    tagId: number;
    notes: string;
    amount: string;
    createdAt: string;
} 

export const useRecord = () => {
    const [records, setRecords] = useState<RecordItem[]>([]);

    useEffect(() => { 
        const localRecords = JSON.parse(window.localStorage.getItem('records') || '[]');
        setRecords(localRecords);
    }, [])
    useEffect(() => {
        window.localStorage.setItem('records', JSON.stringify(records));
    }, [records])

    const addRecord = (record: RecordItem) => {
        setRecords([ ...records, record ]);
    }
    const removeTagRecords = (tagId: number) => {
        setRecords(records.filter(item => item.tagId !== tagId));
    }
    const computeGroupedList = (yearMonth?:String) => {
        if (records.length === 0) return [];
        const newList = yearMonth ?
                        (JSON.parse(JSON.stringify(records)) as RecordItem[]).filter(item => dayjs(item.createdAt).format('YYYY-MM') === yearMonth).sort((a: RecordItem, b: RecordItem) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf()) :
                        (JSON.parse(JSON.stringify(records)) as RecordItem[]).sort((a: RecordItem, b: RecordItem) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
        
        if(newList.length === 0) return [];
        type Result = {
            createdAt: string; 
            items: RecordItem[];
            totalExpend?: number;
            totalIncome?: number;
        }[];
        const result: Result = [{createdAt: dayjs(newList[0].createdAt).format('YYYY-MM-DD'), items: [newList[0]]}];
        for (let i = 1; i < newList.length; i++) {
                const current = newList[i];
                const last = result[result.length - 1];
                if(dayjs(last.createdAt).isSame(dayjs(current.createdAt), 'day')) {
                    last.items.push(current);
                } else {
                    result.push({createdAt: dayjs(current.createdAt).format('YYYY-MM-DD'), items: [current]});
                }
            }
            result.map(group => {
                group.totalExpend = group.items.reduce((sum, item) => {
                    return item.type === '-' ? sum + parseFloat(item.amount) : sum;
                }, 0); 
            })
            result.map(group => {
                group.totalIncome = group.items.reduce((sum, item) => {
                    return item.type === '+' ? sum + parseFloat(item.amount) : sum;
                }, 0); 
            })
            return result;
    }
    return { records, addRecord, removeTagRecords, computeGroupedList}
}


