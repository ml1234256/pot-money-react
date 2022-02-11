// import { ChangeEventHandler } from 'react';
import styled from 'styled-components';


const NotesWrapper = styled.div`
    border-top: 1px solid rgb(211, 211, 211);
    border-bottom: 1px solid rgb(211, 211, 211);
    padding: 0 12px;
    input {
        /* flex-grow: 1; */
        height: 48px;
        width: 100%;
        border: none;
    }

`;

const Notes = (props: any) => {
    const note = props.defaultNotes;


    // const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    //     props.onChange(e.target.value);
    // }
    return (
        <NotesWrapper>
            <input  type="text" defaultValue={note} onBlur={(e) => props.onChange(e.target.value)} placeholder="备注..." className="notes" />
        </NotesWrapper>
    )
};

export default Notes;