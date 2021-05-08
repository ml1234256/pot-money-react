import styled from 'styled-components';
import Nav from './Nav';

const LayoutWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    @media (min-width: 500px) {
        width: 375px;
        height: 667px;
        border: 1px solid #d9d9d9;
        margin: 20px auto;
    } 
`;
const Main = styled.div`
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        overflow: auto;
        scrollbar-width: none; /* Firefox 64 */
        
`;

const Layout: React.FC = (props: any) => {
    return (
        <LayoutWrapper>
            <Main>
                {props.children}
            </Main>
            <Nav />
        </LayoutWrapper>
    )
};

export default Layout;