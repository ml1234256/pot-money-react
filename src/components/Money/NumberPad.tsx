import dayjs from 'dayjs';
import React, { ChangeEventHandler, useEffect, useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    .outputBox{
        height: 48px;
        line-height: 48px;
        &::after {
            content: "";
            display: block;
            clear: both;
        }
        >.output {
                padding: 0 16px;
                font-size: 24px;
                float: right;
        }
    }
    .numPad {
        &::after {
            content: "";
            display: block;
            clear: both;
        }
        li {
            border-left: 1px solid rgb(211, 211, 211);
            border-top: 1px solid rgb(211, 211, 211);
            width: 25%;
            height: 52px;
            line-height: 52px;
            font-size:24px;
            float: left;
            cursor: pointer;

            &.ok {
                height: 104px;
                line-height: 104px;
                background-color: #777;
                color: #fff;
                float: right;
            }
        }
         .dateWrapper{
        //border:1px solid;
        overflow:hidden;
        position: relative;
        .dateText{
            position: absolute;
            right: 0px;
            top: 0px;
            background: #fff;
            pointer-events: none;
            line-height: 52px;
            font-size:16px;
            width: 100%;
            height: 100%;
        }
        .date {
            position: absolute;
            height:100%;
            right:28px;
            top:0px;
            border:none;
        }
    }
    }
`;

// type Props = {
//     value: string;
//     onChange: (value: number) => void;
//     onOK?: () => void;
// }
const NumberPad = (props:any) => {
    const [output, _setOutput] = useState(props.value);
    const setOutput = (output: string) => {
        _setOutput(output);
        props.onChange(output);
    }
    // useEffect(() => {
    //     (
    //         document.querySelector('.date') as HTMLInputElement).valueAsDate = new Date(props.defaultDate);
    // }, [])
    useEffect(() => {
        const dateText = document.querySelector('.dateText') as HTMLDivElement;
        if (dateText.innerHTML === '今天') {
            dateText.style.fontSize = '20px';
        } else {
            dateText.style.fontSize = '16px';
        }
    }, [props.createdAt])
    const getDate = () => {
        const today = dayjs().format('YYYY-MM-DD');
        return props.createdAt === today ? '今天' : props.createdAt;
    }
    const onChangeDate: ChangeEventHandler<HTMLInputElement> = (e) => {
            props.onChangeDate(e.target.value);
        }
    const onClickButtonWrapper = (e: React.MouseEvent) => {
        const input = (e.target as HTMLButtonElement).textContent as string;
        const indexOfPoint = output.indexOf('.');
        if (input === '') return;
        if ('0123456789.'.indexOf(input) >= 0) {
            if(output.length >= 11){
                return;
            }
            if (indexOfPoint >= 0 && output !== '0.00') {
                if(output.substring(indexOfPoint).length >= 3 || input === '.'){
                    return;
                }
            }
            if (output === '0.00' || output === '0') {
                if (input === '.') {
                    setOutput('0.');
                } else {
                    setOutput(input);
                }
            } else {
                setOutput(output + input);
            }
        } else if (input === 'del') {
            if (output === '0.00') {
                return;
            }
            if (output.length === 1) {
                if(output !== '0') {
                    setOutput('0.00');
                } else {
                    return;
                }  
            } else {
                setOutput(output.slice(0, -1));
            }
        } else if (input === 'AC') {
            setOutput('0.00');
        } else if (input === '确认') {
            if (props.onOK) props.onOK();
            _setOutput('0.00');
            return;
        }
    };
    return (
        <Wrapper>
            <div className="outputBox">
                <span className="output">{ output }</span>
            </div>
            <ul className="numPad" onClick={onClickButtonWrapper}>
                 <li className="num-left">1</li>
                    <li>2</li>
                    <li>3</li>
                    <li className="dateWrapper">
                        <input  type="date" onChange={onChangeDate} className="date" />          
                    <div className="dateText">{ getDate() }</div>
                    </li>

                    <li className="num-left">4</li>
                    <li >5</li>
                    <li>6</li>
                    <li>AC</li>

                    <li className="num-left">7</li>
                    <li>8</li>
                    <li>9</li>
                    <li className="ok">确认</li>

                    <li>.</li>    
                    <li>0</li>
                    <li>del</li>
            </ul>
        </Wrapper>

    )
};

export default NumberPad;