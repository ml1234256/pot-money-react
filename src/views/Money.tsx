import Layout from "components/Layout";
import {Types} from 'components/Types';
import Tags from 'components/Money/Tags';
import Notes from 'components/Money/Notes';
import NumberPad from 'components/Money/NumberPad';
import { useState } from "react";
import { Type, useRecord } from "hooks/useRecord";
import dayjs from "dayjs";

const today = dayjs().format('YYYY-MM-DD');
const defaultFormData = {
    type: '-' as Type,
    tagId: 0 as number,
    notes: '',
    amount: '0.00',
    createdAt: today as string,
}

const Money: React.FC = () => {
    const [selected, setSelected] = useState(defaultFormData);
    const { addRecord } = useRecord();

    const onChange = (obj: Partial<typeof defaultFormData>) => {
        setSelected({ ...selected, ...obj });
    }
    const submit = () => {
        if (selected.tagId === 0) {
            window.alert('请选择标签');
            return;
        }
        if (selected.amount === '0.00' || selected.amount === '0' || selected.amount === '0.' || selected.amount === '0.0') { 
            window.alert('请输入金额');
            return
        }
        addRecord(selected);
        //setSelected(defaultFormData);
    }
    return (
        <Layout>
            <Types value={selected.type} onChange={type => onChange({ type })} />
            <Tags type={selected.type} value={selected.tagId} onChange={tagId => onChange({ tagId })} />
            <Notes defaultNotes={selected.notes}  onChange={(notes: string) => onChange({ notes })} />
            <NumberPad value={selected.amount}
                createdAt={selected.createdAt}
                onChange={(amount: string) => onChange({ amount })}
                onChangeDate={(createdAt: string) => onChange({ createdAt })}
                onOK={submit} />
        </Layout>
    )
}

export default Money;