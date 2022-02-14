import Layout from "components/Layout";
import { useEffect, useRef, useState } from "react";
import {Types} from 'components/Types';
import { RecordItem, Type, useRecord } from "hooks/useRecord";
import styled from "styled-components";
import { Tag, useTags } from "hooks/useTags";
import { Progress } from 'antd';
import React from 'react';
import ReactECharts from 'echarts-for-react';
import dayjs from "dayjs";
import {roundNum as roundAmount} from '../lib/roundNum';
 
const ContentWrapper = styled.div`
    overflow:auto;
    scrollbar-width: none; /* Firefox 64 */
    &::-webkit-scrollbar {
        display: none;
    } 
`;
const ChartWrapper = styled.div`
    overflow: auto;
    min-height: 300px;
    scrollbar-width: none; /* Firefox 64 */
    &::-webkit-scrollbar {
        display: none;
    } 
    >.chart{
       // min-height: 280px;
        width: 300%;
    } 
`;
const LeaderBoard = styled.ul`
    li{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 40px;
        >.total-mount {
        margin-top: 12px;
        width: 90%;
        text-align: left;
        font-size:14px;
        font-weight: 600;
        border-bottom: 1px solid rgb(211, 211, 211);
        padding-bottom:2px;
        }
        >.bord-list {
            width: 90%;
            font-size: 16px;
            margin-top:20px;
            display:flex;
            >.tag {
        
            }
            >.percent {
                margin-left: 10px;
                font-size: 12px;
                color: #aaa;
                display:flex;
                align-items: center;
            }
            >.total{
               flex-grow:1;
               display:flex;
               justify-content: flex-end;
            }
        }
        >.bar {
            width:90%;
            margin-top: -10px;
            margin-bottom: 10px;
            padding:0;
        }
        .ant-progress-inner {
            background-color:rgba(0, 122, 204, 0.2);
        }
    }
`;

const Statistics: React.FC = (props: any) => {
    const [type, setType] = useState<Type>('-');
    const { records, computeGroupedList } = useRecord();
    const { tags, findTagName } = useTags();
    const chartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chartRef.current) {
            chartRef.current.scrollLeft = chartRef.current.scrollWidth;
        }
    },[])
    const computedLeaderList = () => {
        const tagList = tags.filter(tag => tag.type === type);
        const recordList = records.filter((item: RecordItem) => item.type === type);
        let array: any[] = [];
        tagList.forEach((item: Tag) => {
            array.push({ tagId: item.id, total: 0});
        });
        const today = new Date();
        recordList.forEach((item: RecordItem) => {
            const day = new Date(item.createdAt);
            const MONTH = 86400000 * 31;
            if(today.valueOf() - day.valueOf() < MONTH) {
                array.forEach((arrItem: any) => {
                    if(item.tagId === arrItem.tagId) {
                        arrItem.total += parseFloat(item.amount);
                    }
                })
            }
        })
        array = array.filter(item => item.total !== 0).sort((a, b) => b.total - a.total);
        return array;
    }
    const leaderList = computedLeaderList();
    const groupedList = computeGroupedList();
    const totalMount = () => {
        let mount = 0;
        leaderList.forEach(item => mount += item.total);
        return mount;
    }

    const keyValueList = () => {
            const today = new Date();
            const array = [];
            for(let i = 0; i< 31; i++) {
                const dateString = dayjs(today).subtract(i, 'day').format('YYYY-MM-DD');
                const found = groupedList.filter(item => item.createdAt === dateString);
                if (found.length >= 1) {
                    array.push({
                        key: dateString, value: type === '-' ? found[0].totalExpend : found[0].totalIncome
                    });
                } else {
                    array.push({
                        key: dateString, value: 0
                    })
                }
            }
            array.sort((a, b) => {
                if (a.key >= b.key) {
                    return 1;
                }else {
                    return -1;
                }
            })
            return array;
    }
  
    const chartOptions = () => {
            const keys = keyValueList().map(item => item.key);
            const values = keyValueList().map(item => item.value); 
            return {
                grid: {
                    left: 0,
                    right: 0,
                    bottom: 36,
                },
                xAxis: {
                    data: keys,
                    axisTick: {alignWithLabel: true},
                    axisLabel: {
                        formatter: function (value: string) {
                        return value.substr(5);
                    }
            }
                },
                yAxis: {
                    type:'value',
                    show:false,
                },
                series: [{
                    type: 'line',
                    data: values,
                    symbolSize: 10,
                }],
                tooltip: {
                    show:true,
                    triggerOn: 'click',
                    position: 'top',
                    formatter: '{c}',
                }
            }
        }

    const onChange = (type:Type) => {
        setType(type)
    }
    const leaderListDom = () => {
        let content;
        content = leaderList.map((item, index) =>
                        <li key={index.toString()}>
                            <div className="bord-list">                       
                                <span className="tag"> {findTagName(item.tagId)} </span>
                                <span className="percent"> {(Math.round((item.total / totalMount()) * 1000) / 10) + '%'} </span>
                                <span className="total">{roundAmount(item.total)} </span>
                            </div>
                            <Progress percent={item.total / totalMount() * 100}
                                showInfo={false}
                                strokeColor={'#007acc'}
                                strokeWidth={2}
                                className="bar" />
                        </li>)
        return <ul>{content}</ul>;
    }
    return (
        <Layout>
            <Types value={type} onChange={type => onChange( type )} />
            <ContentWrapper>
                <ChartWrapper ref={chartRef}>
                    <ReactECharts option={chartOptions()} className="chart" />
                </ChartWrapper>
                <LeaderBoard>
                    <li>
                        <div className="total-mount">
                            {`总${type === '-' ? "支出":"收入"}：${roundAmount(totalMount())}`}
                        </div>
                    </li>
                    {leaderListDom()}
                </LeaderBoard>
            </ContentWrapper>
        </Layout>
    )
}

export default Statistics;