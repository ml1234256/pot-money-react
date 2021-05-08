import Layout from 'components/Layout';
import {Types} from 'components/Types';
import { Type, useRecord } from 'hooks/useRecord';
import { useTags } from 'hooks/useTags';
import { useState } from 'react';
import styled from 'styled-components';

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
    tagIds: [] as number[],
    notes: '',
    types: '-' as Type,
    amount: '0.00',
    createdAt: '',
}


const EditTags: React.FC = () => {
    const [selected, setSelected] = useState(defaultFormData);
    const { tags, addTag, removeTag: _removeTag, updateTag } = useTags();
    const { removeTagRecords } = useRecord();
    const tagList = tags.filter(tag => tag.type === selected.types)
   
    const onChange = (obj: Partial<typeof defaultFormData>) => {
            setSelected({ ...selected, ...obj });
    }
    const createTag = () => {
        const tagName = window.prompt('标签名');
        addTag(tagName);
    }
    const removeTag = (tagId: number) => {
        _removeTag(tagId);
        removeTagRecords(tagId);
    }

    return (
        <Layout>
            <Types value={selected.types} onChange={types => onChange({ types })} />
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