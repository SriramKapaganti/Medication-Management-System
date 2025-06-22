// Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {Logo, MedicationCard, NavBar, Page, DashboardBackground,
        ProfileContainer, LogoutButton, ProfileIcon,
        AddPatientButton, PatientList, ListOfMedicine, MarKBox, DeleteButton, PatientButton, MedBox,  } from './DesignLayout';
import AddMedication from './AddMedication';



function Dashboard({ user, setUser }) {
    console.log(user)
  const navigate = useNavigate()
  const [medications, setMedications] = useState([]);
  const [adherence, setAdherence] = useState(0);
  const [patientsList, setPatientsList] = useState([]);
  const [userId, setUserId] = useState("")

  const fetchMedications = async (user_id) => {
    console.log(user_id)
    setUserId(user_id)
    const res = await axios.get(`http://localhost:5000/api/medications/${user_id}`);
    console.log(res)
    setMedications(res.data);

   /* const total = res.data.length;
    const taken = res.data.filter(med => med.taken === 1).length;
    setAdherence(total === 0 ? 0 : Math.round((taken / total) * 100)); */
  };

  const markAsTaken = async (medId) => {
  await axios.post(`http://localhost:5000/api/medications/${medId}/log`);
  fetchMedications(userId);
};


  const LogoutUser = () => {
    axios.post("http://localhost:5000/api/auth/logout",{}, {withCredentials:true})
    .then(res => {console.log(res.data.message)
      setUser(null)
      navigate('/login')
    })
    .catch (err => console.error('Error In Logout'))
  }

  const onDelete = async (medId) => {
    try{await axios.delete(`http://localhost:5000/api/medications/${medId}`)
    fetchMedications(userId)}
    catch(err){
      console.error('Error deleting medication:', err);
    }
  }

  useEffect(() => {
    if (user.role === 'patient') {
    fetchMedications(user.id);
  }
    axios.get(`http://localhost:5000/api/auth/patientList/${user.id}`, {
      withCredentials: true
    }).then(res => setPatientsList(res.data.patientList))
    .catch(err => console.error('Error fetching patientList:', err))
  }, []);

  const PatientMedicineLog = () => {
    return(
      <ListOfMedicine>
            {medications !== "" ? medications.map(each => (<li style={{display:'flex', flexDirection:'row',gap:'5px', width:'max-content', alignItems:"center"}} key={each.id}>
              <MarKBox type="checkbox" onChange={() => markAsTaken()} />
              <p>{each.name.toUpperCase()}</p>
              <p>{each.dosage.toUpperCase()}</p>
              <p>{each.frequency.toUpperCase()}</p>
              <DeleteButton onClick={() => onDelete(each.id)}><i className="bi bi-trash-fill"></i></DeleteButton>
            </li>)) : <p>No Medicne Assigned</p> }
          </ListOfMedicine>
    )
  }

  const careTakerDashBoard = () => {
    const {username}= user
    return(
      <DashboardBackground>
        <NavBar style={{padding: '0px'}}>
          <Logo src="/logo.png" alt="Logo" />
          <ProfileContainer>
            <LogoutButton onClick={LogoutUser}>Logout</LogoutButton>
            <ProfileIcon>{username[0].toUpperCase()}</ProfileIcon>
          </ProfileContainer>
        </NavBar>
        <AddPatientButton>
          Add New Patient
        </AddPatientButton>
        <PatientList>
          {patientsList.map(each => (<li key={each.id}>
            <PatientButton onClick={() => fetchMedications(each.id)}>{each.username}</PatientButton>
          </li>))}
        </PatientList>
        <MedBox>
          {PatientMedicineLog()}
          <AddMedication userId={userId} fetchMedications={fetchMedications} />
        </MedBox>
      </DashboardBackground>
    )
  }

  const patientMedicineList = () => {
    return(
      <ListOfMedicine>
            {medications !== "" ? medications.map(each => (<li style={{display:'flex', flexDirection:'row',gap:'5px', width:'max-content', alignItems:"center"}} key={each.id}>
              <p>{each.name.toUpperCase()}</p>
              <p>{each.dosage.toUpperCase()}</p>
              <p>{each.frequency.toUpperCase()}</p>
              <p>Status: {each.taken === '1' ? 'Taken' : 'Not Taken'}</p>
            </li>)) : <p>No Medicne Assigned</p> }
          </ListOfMedicine>
    )
  }

  const pateintDashBoard = () => {
    const {username}= user
    return(
      <DashboardBackground>
        <NavBar style={{padding: '0px'}}>
          <Logo src="/logo.png" alt="Logo" />
          <ProfileContainer>
            <LogoutButton onClick={LogoutUser}>Logout</LogoutButton>
            <ProfileIcon>{username[0].toUpperCase()}</ProfileIcon>
          </ProfileContainer>
        </NavBar>
        <MedBox>
          {patientMedicineList()}
        </MedBox>
      </DashboardBackground>
    )
  }
  switch (user.role) {
  case "caretaker":
    return careTakerDashBoard();
  case "patient":
    return pateintDashBoard();
  default:
    return null;
}

  /*(
    <Page>
      <h2>Welcome, {user.username}</h2>
      <h3>Adherence: {adherence}%</h3>

      {medications.map(med => (
        <MedicationCard key={med.id}>
          <p><strong>{med.name}</strong> - {med.dosage}</p>
          <p>Frequency: {med.frequency}</p>
          
          {!med.taken && (
            <button onClick={() => markAsTaken(med.id)}>Mark as Taken</button>
          )}
        </MedicationCard>
      ))}
      <AddMedication userId={user.id} onAdd={fetchMedications} />
    </Page>
     <MedicineList>
        {medications.map(each => (<li key={each.id}><MarKBox type='checkbox' /> <MedcineTitle>{each.name}</MedcineTitle></li>))}
      </MedicineList>
  ); */
}

export default Dashboard;
