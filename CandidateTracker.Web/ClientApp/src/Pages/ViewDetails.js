import axios from 'axios';
import React, { useEffect, useState} from 'react';
import { useParams } from 'react-router';
import { useStatusCount } from '../RegistrationStatusContext';

const ViewDetails = () => {

    const [candidate, setCandidate] = useState({});
    const [registrationStatus, setRegistrationStatus] = useState("");
    const { id } = useParams();
    const  {updatePendingCount, updateConfirmedCount, updateRefusedCount } = useStatusCount();

    useEffect(() => {
        const GetCandidate = async () => {
            const { data } = await axios.get(`/api/candidate/getcandidate?id=${id}`);
            setCandidate(data);
            updatePendingCount();
            updateConfirmedCount();
            updateRefusedCount();
        }

        GetCandidate();
    }, [registrationStatus]);

    const onConfirmClick = async () => {
        await axios.post(`/api/candidate/updatestatusconfirmed?id=${id}`);
        setRegistrationStatus("Confirmed");
    }
    const onRefuseClick = async () => {
        await axios.post(`/api/candidate/updatestatusrefused?id=${id}`);
        setRegistrationStatus("Refused");
    }

    const LoadButtons = () => {
        if(candidate.registrationStatus === "Pending"){
            return(
                <div>
                    <button onClick={onConfirmClick} className="btn btn-primary">Confirm</button>
                    <button onClick={onRefuseClick} className="btn btn-danger">Refuse</button>
                </div>
            );
        }
        else {
            return;
        }
    }


    return(       
        <div className="card card-body bg-light">
            <h4>Name: {candidate.firstName} {candidate.lastName}</h4>
            <h4>Email: {candidate.email}</h4>
            <h4>Phone: {candidate.phoneNumber}</h4>
            <h4>Status: {candidate.registrationStatus}</h4>
            <h4>Notes:</h4>
                <p>{candidate.notes}</p>
            {LoadButtons()}
        </div>

    )
}

export default ViewDetails;