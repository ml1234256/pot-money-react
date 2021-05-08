import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {useTags} from 'hooks/useTags';
import { Type } from 'hooks/useRecord';

const TagWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding: 4px 6px;
    overflow:auto;
    scrollbar-width: none; /* Firefox 64 */
    &::-webkit-scrollbar {
        display: none;
    } 
    > .tagList {
        display: flex;
        flex-wrap: wrap;
        padding: 4px;
        > li {
            min-height: 40px;
            min-width: 25%;
            //border:1px solid;
            display:flex;
            justify-content:center;
            align-items:center;
            //padding: 6px;
            .tagName{
                line-height: 28px;
                font-size: 16px;
                min-height: 28px;
                min-width: 76px;
                border: 1px solid rgb(211, 211, 211);
                border-radius: 4px;
            }
            >.selected {
                background-color: #777;
                border-color:#777;
                color: #fff;
            }
            >.edit {
                color: #ccc;
            }
        }
    } 
`;

type Props = {
    value: number,
    onChange: (selected: number) => void,
    type: Type,
}
const Tags: React.FC<Props> = (props) => {
    const { tags } = useTags();
    const selectedTagId = props.value;
    const tagList = tags.filter(tag => tag.type === props.type);

    const onToggleTag = (tagId: number) =>
        selectedTagId === tagId ? props.onChange(0) : props.onChange(tagId);
    return (
        <TagWrapper>
            <ul className="tagList">
                {
                    tagList.map(tag => <li key={tag.id}
                        onClick={() => onToggleTag(tag.id)}>
                        <div className={`tagName ${selectedTagId === tag.id ? 'selected' : ''}`}>{tag.name}</div>
                    </li>)
                }
                    <li className="editTag"> 
                    <Link to="/editTags" className="edit">
                        <div className="tagName">全部</div>
                    </Link>
                    </li>
                </ul>
        
        </TagWrapper>
    )
};

export default Tags;