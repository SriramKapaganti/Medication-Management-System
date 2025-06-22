
import styled from 'styled-components'

export const BackgroundImage = styled.div`
background-image: url('/auth-bg.png');
  background-size: cover;
  background-position: left;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FormBox = styled.form`
  background-color: rgba(255, 255, 255, 0.9);
  padding: 2rem;
  border-radius: 12px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 0 10px #ccc;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Logo = styled.img`
    height:100px;
    width:100px;
    border-radius:50px;
`

export const InputContainer = styled.div`
    width:100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    gap: px;
    padding: 9px;
    gap:9px;
`
export const InputBox = styled.input`
    height:36px;
    width:100%;
    border-radius:9px;
    border: 0px none;
`
export const Label = styled.label`
    font-size:18px;
    font-weight:500;
    color:#000000;
    font-family:"Roboto";
`
export const SignUpButton = styled.button`
  width: 100%;
  padding: 0.8rem;
  background-color: #007bff;
  border: none;
  color: white;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  margin:9px;
  font-size: 15px;
`
export const LoginButton = styled.button`
  width: 100%;
  padding: 0.8rem;
  background-color: #007bff;
  border: none;
  color: white;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  margin:9px;
  font-size: 15px;

`
export const FormMessage = styled.p`
  text-align: center;
  color: red;
  margin-top: 1rem;
`

export const SelectBox = styled.select`
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-top:9px;
`

export const OptionBox = styled.option`
    font-family:"Roboto";
`


export const NavBar = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ActionContainer = styled.div`
  display: flex;
  flex-direction:row;
  justify-content:space-between;
  width:300px;
  height:50px;
  align-items:center;
`;


export const About = styled.div`
  max-width: 800px;
  margin-top: 40px;
  text-align: center;
`;

export const Heading = styled.h1`
  font-size: 2.5rem;
  color: #2c3e50;
`;

export const AboutPage = styled.p`
  font-size: 1.1rem;
  color: #555;
  line-height: 1.7;
  margin-top: 20px;
`;

export const MedicationCard = styled.div`
  background: #f8f9fa;
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 8px;
`;

export const Page = styled.div`padding: 2rem;`;



export const DashboardBackground = styled.div`
  display:flex;
  flex-direction:column;
`       

export const ProfileContainer = styled.div`
  height:75px;
  width:200px;
  display:flex;
  flex-direction:row;
  justify-content:space-between;
  align-items:center;
`
export const LogoutButton = styled.button`
  padding: 0.8rem;
  background-color: #007bff;
  border: none;
  color: white;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  margin:9px;
  font-size: 15px;
`

export const ProfileIcon = styled.h1`
    height: 50px;
    width: 50px;
    border-radius: 30px;
    background-color: rgb(231 15 15 / 97%);
    color: rgba(7, 7, 7, 0.97);
    font-size: 30px;
    text-align: center;
`

export const AddPatientButton = styled.button`
  width: 100%;
  padding: 0.8rem;
  background-color:rgb(241, 243, 245);
  border: none;
  color: #000000;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  margin:9px;
  font-size: 15px;
`
export const PatientList = styled.ol`
  display:flex;
  flex-direction: row;
  list-style-type:none;
  flex-wrap:wrap;
  gap:9px;
`

export const ListOfMedicine = styled.ul`
  display:flex;
  flex-direction:column;
  justify-content:space-between;
  height:50px;
  width:300px;
  border-radius:12px;
  margin:9px;
  list-style-type:none;
`
export const MarKBox = styled.input`
  margin:5px;
  color:#000000;
`
export const DeleteButton = styled.button`
  color:#000000;
  background-color:transparent;
  font-size:18px;
  border:none;
`

export const PatientButton = styled.button`
  width: 100%;
  padding: 0.8rem;
  background-color:rgb(241, 243, 245);
  border: none;
  color: #000000;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  margin:9px;
  font-size: 15px;
`

export const MedBox = styled.div`
  height:300px;
  border-radius:12px;
  border-style:none;
  background-color:rgb(153, 157, 160);
  display:flex;
  flex-direction:row;
  justify-content:space-between;
  padding:10px;
  
`
