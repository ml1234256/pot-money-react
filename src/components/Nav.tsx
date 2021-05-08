import { NavLink } from "react-router-dom";
import styled from 'styled-components';
import '../helper.scss';

const NavWrapper = styled.nav`
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.25);
    >ul {
            display: flex;
            padding: 5px 0 2px 0;
            
        > li {
                flex-grow: 1;
            > a{
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                line-height: 1.5;
                .icon {
                    width: 28px;
                    height: 28px;
                }
                &.selected {
                    color: rgb(5, 84, 163);
                    .icon {
                        fill: rgb(5, 84, 163);
                    }
                }
            }
           
        }
       

    }
   
`;
const Nav: React.FC = () => {
    return (
        <NavWrapper>
            <ul>
                <li>
                    <NavLink to="/detail" activeClassName="selected">
                    <svg className="icon">
                        <use xlinkHref="#icon-mingxi"/>
                    </svg>
                    明细
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/money" activeClassName="selected">
                        <svg className="icon">
                            <use xlinkHref="#icon-tianjia"/>
                        </svg>
                        记账
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/statistics" activeClassName="selected">
                        <svg className="icon">
                            <use xlinkHref="#icon-tongji2"/>
                        </svg>
                        统计
                    </NavLink>
                </li>
            </ul>
            
        </NavWrapper>
    )
};

export default Nav;