import Layout from "components/Layout";
import { useRecord } from "hooks/useRecord";
import styled from 'styled-components';
import dayjs from 'dayjs';
import { useTags } from "hooks/useTags";
import { ChangeEventHandler, useState } from 'react';
import {roundNum as roundAmount} from '../lib/roundNum';

const DetailHeader = styled.div`
    display: flex;
    align-items: center;
    background-color: rgb(0, 122, 204);
    color: #fff;
    font-size: 18px;
    padding: 20px 16px 6px 16px;
    >ul{
        flex-grow:1;
        >li{
            padding: 2px 0;
            >span {
                display:inline-block;
                width:50%;
            }
        }
    }
    >.dateWrapper {
        height:100%;
        min-width:80px;
       >div{
           padding:2px 0;
       }
       .monthWrapper {
        height:50%;
        overflow:hidden;
        position: relative;
        .monthText {
            position: absolute;
            right: 1px;
            top: 0px;
            pointer-events: none;
            font-size:16px;
            width: 100%;
            height: 100%;
            background:rgb(0, 122, 204);
            display:flex;
            justify-content:center;
            align-items: center;
            .triangle {
                display:inline-block;
                width: 0;
                height: 0;
          		border: 6px solid #fff;
                border-left-color: transparent; /* 透明色 */
                border-bottom-color: transparent;
                border-right-color: transparent;
                margin-top: 7px;
                margin-left:2px;
            }
        }
        .dateInput {
            position: absolute;
            height:90%;
            right:28px;
            top:2px;
            border:none;
        }
       }
    }
`;
const DetailMain = styled.div`
    overflow: auto;
    scrollbar-width: none; /* Firefox 64 */
    &::-webkit-scrollbar {
        display: none;
    } 
    .title {
        display: flex;
        justify-content: space-between;
        padding: 0.8em 12px;
        background-color: rgb(236, 236, 236);
        font-size: 12px;
        color: #000;
    }
    .record{
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid rgb(236, 236, 236);
        padding: 4px 14px 2px 14px;
        height: 50px;
        >.content {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            font-size: 16px;
            padding-bottom: 2px;
            >.remark {
            text-align: left;
            color: #ccc;
            font-size: 12px;
            padding-top:5px;
            }
        }
        >.amount {
            display: flex;
            align-items: center;
        }
}   
`;

const today = dayjs();
const Detail = () => {
    const { computeGroupedList} = useRecord();
    const { findTagName } = useTags();
    const [ checkMonth, setCheckMonth ] = useState<string[]>([today.format('YYYY'), today.format('MM')]);

    const getCheckMonth: ChangeEventHandler<HTMLInputElement> = (e) => {
        const checkMonth = dayjs(e.target.value);
        setCheckMonth([checkMonth.format('YYYY'), checkMonth.format('MM')]);
    }
 
    const groupedList = computeGroupedList(checkMonth.join('-'));

    const computedTotal = () => {
        let totalExpend = 0;
        let totalIncome = 0;
        let balance = 0;

        groupedList.forEach((item: any) => totalExpend += item.totalExpend);
        groupedList.forEach((item: any) => totalIncome += item.totalIncome)
        balance = totalIncome - totalExpend;
        return { totalExpend, totalIncome, balance };
    }
    const beautifyDate = (date: string) => {
            const day = dayjs(date);
            const now = dayjs();
            const week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
            let result = '';
            if (day.isSame(now, 'year')) {
                result = day.format('M月D日')
            } else (
                result = day.format('YYYY年M月D日')
            )
            if(day.isSame(now, 'day')) {
                result += ' 今天';
            } else {
                result += ' ' + week[day.day()]; 
            }
            return result;
        }
    const beautifyTotal = (expend: number, income: number) => {
            let string = '';
            if (income !== 0) {
                string = string + '收入：' + roundAmount(income);
            }
            if (expend !== 0) {
                string = string +' 支出：' + roundAmount(expend);
            }
          
            return string;
    }
    const recordListDom = () => {
        let content;
        if (groupedList.length === 0) {
            content = (<div>暂无数据</div>)
        } else {
            content = groupedList.map((group, index) =>
                <li key={index.toString()}>
                        <div className="title">
                            <span>{beautifyDate(group.createdAt)}</span>
                            <span className="totalAmount">{beautifyTotal(group.totalExpend as number, group.totalIncome as number)}</span>
                        </div>
                        <ul>
                            {
                                group.items.map((item, index) => <li key={index.toString()} className="record">
                                    <div className="content">
                                        <span>{findTagName(item.tagId)}</span>
                                        <span className="remark">{item.notes}</span>
                                    </div>
                                    <div className="amount">{item.type + item.amount}</div>
                                </li>)
                            }
                        </ul>
                    </li>);
        }
        return <ul className="recordList">{content}</ul>;
    }
    return (
        <Layout>
             <DetailHeader>
                <div className="dateWrapper">
                    <div className="year">{ checkMonth[0]}年</div>
                    <div className="monthWrapper">
                        <input  type="month" onChange={getCheckMonth} className="dateInput" />          
                        <div className="monthText">{ checkMonth[1]}月 <span className="triangle"></span></div>
                    </div>
                </div>
                <ul>
                    <li className="key">
                        <span>收入</span>
                        <span>支出</span>
                    </li>
                    <li className="value">
                        <span>{roundAmount(computedTotal().totalIncome)}</span>
                        <span>{roundAmount(computedTotal().totalExpend)}</span>
                    </li>
                </ul>
            </DetailHeader>
            <DetailMain>
                {recordListDom()}
            </DetailMain>
        </Layout>
    )
}

export default Detail;