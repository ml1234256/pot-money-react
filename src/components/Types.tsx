import { useState } from 'react';
import styled from 'styled-components';

const TypesWrapper = styled.div`
    >ul{
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgb(0, 122, 204);
        font-size:18px;
        height:40px;
        padding: 0 16px;
        >li {
            color: #fff;
            width:20%;
            position: relative;
            padding:4px 0;
            &.selected::after {
                content: '';
                position:absolute;
                bottom:0;
                left: 0;
                width: 100%;
                height: 2px;
                background-color: #fff;
            }
        }
    }
    
`;

type Props = {
    value: '-' | '+',
    onChange: (value: '-' | '+') => void;
}

const Types: React.FC<Props> = (props) => {
    const typesMap = { '-': '支出', '+': '收入' };
    const [typesList] = useState<('-' | '+')[]>(['-', '+']);
    const type = props.value;
    return (
        <TypesWrapper>
            <ul>
                {typesList.map(
                    item => <li key={item}
                        className={type === item ? 'selected' : ''}
                        onClick={() => {props.onChange(item)}}
                    >
                        {typesMap[item]}
                    </li>
                )}
            </ul>
        </TypesWrapper>
    )
};

export  {Types};