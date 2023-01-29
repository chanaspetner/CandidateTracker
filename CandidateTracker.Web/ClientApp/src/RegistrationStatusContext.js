import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const RegistrationStatusCountContext = createContext();

const RegistrationStatusCountContextComponent = ({ children }) => {
    const [pendingCount, setPendingCount] = useState(0);
    const [confirmedCount, setConfirmedCount] = useState(0);
    const [refusedCount, setRefusedCount] = useState(0);

    const updatePendingCount = async () => {
        const { data } = await axios.get('/api/candidate/getpendingcount');
        setPendingCount(data);
    }

    const updateConfirmedCount = async () => {
        const { data } = await axios.get('/api/candidate/getconfirmedcount');
        setConfirmedCount(data);
    }

    const updateRefusedCount = async () => {
        const { data } = await axios.get('/api/candidate/getrefusedcount');
        setRefusedCount(data);
    }

    useEffect(() => {
        updateConfirmedCount();
        updatePendingCount();
        updateRefusedCount();
    }, [])

    return (
        <RegistrationStatusCountContext.Provider value={{ 
            pendingCount, updatePendingCount,
            confirmedCount, updateConfirmedCount,
            refusedCount, updateRefusedCount
        }}>
            {children}
        </RegistrationStatusCountContext.Provider>
    )

}

const useStatusCount = () => {
    return useContext(RegistrationStatusCountContext);
}

export {RegistrationStatusCountContextComponent, useStatusCount}
