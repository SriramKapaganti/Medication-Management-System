import {useState} from 'react'
import axios from 'axios';
import { BASE_URL } from '../api/config';


function AddMedication({ userId, fetchMedications }) {
  const [data, setData] = useState({ name: '', dosage: '', frequency: '' });

  const handleChange = e => setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.post(`${BASE_URL}/api/medications`, { ...data, user_id: userId });
    fetchMedications(userId)
  };

  return (
    <form onSubmit={handleSubmit} style={{display:'flex', flexDirection:'column', gap:"5px", width:'300px', height:"100%", justifyContent:"space-evenly"}}>
      <input name="name" placeholder="Name" onChange={handleChange} style={{borderRadius:'5px', height:'30px', border:'none'}}/>
      <input name="dosage" placeholder="Dosage" onChange={handleChange} style={{borderRadius:'5px', height:'30px', border:'none'}} />
      <input name="frequency" placeholder="Frequency" onChange={handleChange} style={{borderRadius:'5px', height:'30px', border:'none'}} />
      <button type="submit" style={{borderRadius:'5px',  border: 'none',height: '35px', width: '110px',fontFamily: 'Roboto'}} >Add Medication</button>
    </form>
  );
}

export default AddMedication
