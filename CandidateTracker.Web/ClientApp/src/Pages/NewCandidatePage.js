import React from 'react';
import useForm from "../Hooks/useForm";
import { useStatusCount } from '../RegistrationStatusContext';
import axios from 'axios';
import { useHistory } from 'react-router-dom';


const NewCandidatePage = () => {
    const [formData, setFormData] = useForm({firstName: '', lastName: '', email: '', phoneNumber: '', notes: ''});
    const {updatePendingCount} = useStatusCount();
    const history = useHistory();

    const onSubmitClick = async () => {
        await axios.post('/api/candidate/addcandidate', formData);
        updatePendingCount();
        history.push('/');
    }

    return (
        <div className="card card-body bg-light">
            <h4>Add Candidate</h4>
                <input type="text" 
                       onChange={setFormData} 
                       name="firstName" 
                       placeholder="First Name" 
                       className="form-control mt-2" 
                       value={formData.firstName} />
                <input type="text" 
                       onChange={setFormData}
                       name="lastName" 
                       placeholder="Last Name" 
                       className="form-control mt-2" 
                       value={formData.lastName}/>
                <input type="text" 
                       onChange={setFormData}
                       name="email" 
                       placeholder="Email" 
                       className="form-control mt-2"
                       value={formData.email}/>
                <input type="text" 
                       onChange={setFormData}
                       name="phoneNumber" 
                       placeholder="Phone Number" 
                       className="form-control mt-2" 
                       value={formData.phoneNumber}/>
                <textarea rows="5" 
                          onChange={setFormData}
                          className="form-control mt-2" 
                          name="notes"
                          value={formData.notes}></textarea>
                <button onClick={onSubmitClick} className="btn btn-primary">Submit</button>
        </div>
    )
}

export default NewCandidatePage;