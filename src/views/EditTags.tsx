import Layout from 'components/Layout';
import {Types} from 'components/Types';
import { Type, useRecord } from 'hooks/useRecord';
import { useTags } from 'hooks/useTags';
import { useState } from 'react';
import styled from 'styled-components';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';


const EditTagsWrapper = styled.div`
    overflow:auto;
    scrollbar-width: none; /* Firefox 64 */
        &::-webkit-scrollbar {
            display: none;
        }

    .tagList{
        > li {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid rgb(211, 211, 211);
            height: 40px;
            font-size: 16px;
            padding: 0 12px 0 16px;
            }
        }
        .edit{
                display: flex;  
                align-items: center;
                color:#444;
                > div {
                    padding-left: 8px;
                }
            }
        .remove {
            font-size: 20px;
            color: #f00;
        }
        .createTag {
            background: rgb(0, 115, 192);
            border: none;
            border-radius: 4px;
            color: #fff;
            font-size: 15px;
            margin: 80px auto;
            padding: 6px 12px;
        }
`;

const defaultFormData = {
    type: '-' as Type,
    tagIds: [] as number[],
    notes: '',
    amount: '0.00',
    createdAt: '',
}


const EditTags: React.FC = () => {
    const [selected, setSelected] = useState(defaultFormData);
    const { tags, addTag, removeTag: _removeTag, updateTag:_updateTag } = useTags();
    const { removeTagRecords } = useRecord();
    const tagList = tags.filter(tag => tag.type === selected.type)
    const { confirm } = Modal;



    const onChange = (obj: Partial<typeof defaultFormData>) => {
            setSelected({ ...selected, ...obj });
    }
    const createTag = () => {
        const tagName = window.prompt('标签名');
        if(tagName) addTag(tagName, selected.type);
    }
    const updateTag = (tagId: number) => {
        const tagName = window.prompt('标签名');
        if(tagName) _updateTag(tagId, tagName);
    }
    function removeTag(tagId: number) {
    confirm({
        title: '确认删除标签?',
        icon: <ExclamationCircleOutlined />,
        content: '删除标签会同时删除该标签下的所有记账',
        okText: '确认',
        okType: 'danger',
        cancelText: '取消',
        onOk() {
            _removeTag(tagId);
            removeTagRecords(tagId);
        },
        onCancel() {
            return;
        },
    });
    }

    return (
        <Layout>
            <Types value={selected.type} onChange={type => onChange({ type })} />
            <EditTagsWrapper>
                <ul className="tagList">
                    {
                        tagList.map(tag => <li key={tag.id}>
                            <span>{tag.name}</span>
                            <div className="edit">
                                <div>
                                    <svg className="icon" onClick={() => updateTag(tag.id)}>
                                        <use xlinkHref="#icon-xiugai"/>
                                     </svg>
                                </div>
                                <div className="remove">
                                    <svg className="icon" onClick={() => removeTag(tag.id)}>
                                        <use xlinkHref="#icon-shanchu"/>
                                    </svg>
                                </div>
                            </div>
                        </li>)
                        }
                        <button className="createTag" onClick={createTag} >新增标签</button>
                    </ul>         
            </EditTagsWrapper>
        </Layout>
    )
}

export { EditTags };