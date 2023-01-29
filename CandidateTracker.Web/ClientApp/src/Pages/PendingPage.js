import axios from 'axios';
import React, { useState, useEffect } from 'react';
import PendingRow from '../Components/PendingRow';



const PendingPage = () =>{

    const [candidates, setCandidates] = useState([]);

    useEffect(() => {
        const getPendingCandidates = async () => {
          const {data} = await axios.get('/api/candidate/getpendingcandidates');
          setCandidates(data);
        }
        getPendingCandidates();
    }, [])


    return(
            <table className="table table-hover table-striped table-bordered">
                <thead>
                    <tr>
                        <th></th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {candidates.map(c => <PendingRow 
                                            candidate={c}
                                            key={c.id}>
                                        </PendingRow>)}
                </tbody>
            </table>
    )
}

export default PendingPage;