import React from 'react';

const CandidateRow = props => {

    const { id, firstName, lastName, phoneNumber, email, notes } = props.candidate;

    const toggleNotes = () => {
        if(props.toggleNotes){
            return
        }
        else{
            return(
                <td>{notes}</td>
            )
        }
    }

    return(
            <tr>
                <td>{firstName}</td>
                <td>{lastName}</td>
                <td>{phoneNumber}</td>
                <td>{email}</td>
                {toggleNotes()}
            </tr>
    )

}

export default CandidateRow;