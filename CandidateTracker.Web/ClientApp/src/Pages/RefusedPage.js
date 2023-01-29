import React, {useEffect, useState}from 'react';
import CandidateRow from '../Components/CandidateRow';
import axios from 'axios';

const RefusedPage = () => {
    const [candidates, setCandidates] = useState([]);
    const [toggleNotes, setToggleNotes] = useState(false);

    useEffect(() => {
        const getRefusedCandidates = async () => {
          const {data} = await axios.get('/api/candidate/getrefusedcandidates');
          setCandidates(data);
        }
        getRefusedCandidates();
    }, [toggleNotes])

    const onToggleNotesClick = () => {
        setToggleNotes(!toggleNotes);
    }

    const showNotes = () => {
        if(toggleNotes){
            return
        }
        else{
            return(
                <th>Notes</th>
            )
        }
    }


    return(
        <div className='container'>
            <div className='row mt-2'>
                <h1>Refused</h1>
            </div>
            <div className='row mt-2'>
                <button className='btn btn-success' onClick={onToggleNotesClick}>Toggle Notes</button>
            </div>
            <table className="table table-hover table-striped table-bordered">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        {showNotes()}
                    </tr>
                </thead>
                <tbody>
                    {candidates.map(c => <CandidateRow 
                                            toggleNotes={toggleNotes}
                                            candidate={c}
                                            key={c.id}>
                                        </CandidateRow>)}
                </tbody>
            </table>
        </div>
)

}

export default RefusedPage;