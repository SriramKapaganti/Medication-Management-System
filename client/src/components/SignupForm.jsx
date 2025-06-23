import  { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../api/config';
import {
  BackgroundImage, FormBox, Logo, InputContainer, Label, InputBox,
  SelectBox, OptionBox, SignUpButton, FormMessage
} from './DesignLayout';

function SignUpForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'patient',
    caretaker_id: ''
  });
  const [caretakerEnable, setCaretakerEnable] = useState(true);
  const [listOfCareTaker, setListOfCareTaker] = useState([]);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'role') {
      setCaretakerEnable(value === 'patient');
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    console.log(formData)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/api/auth/signup`, formData, {
        withCredentials: true
      });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.error || 'Signup failed');
    }
  };

  useEffect(() => {
    axios.get(`${BASE_URL}/api/auth/caretaker`, {
      withCredentials: true
    })
    .then(res => setListOfCareTaker(res.data.caretakers))
    .catch(err => console.error('Error fetching caretakers:', err));
  }, []);

  return (
    <BackgroundImage>
      <FormBox onSubmit={handleSubmit}>
        <Logo src="/Logo.png" alt="Logo" />
        <InputContainer>
          <Label>USERNAME</Label>
          <InputBox name="username" onChange={handleChange} />
        </InputContainer>
        <InputContainer>
          <Label>PASSWORD</Label>
          <InputBox type="password" name="password" onChange={handleChange} />
        </InputContainer>
        <SelectBox name="role" value={formData.role} onChange={handleChange}>
          <OptionBox value="caretaker">Caretaker</OptionBox>
          <OptionBox value="patient">Patient</OptionBox>
        </SelectBox>
        {caretakerEnable && (
          <SelectBox name="caretaker_id" value={formData.caretaker_id} onChange={handleChange}>
            {listOfCareTaker.map(each => (
              <OptionBox key={each.id} value={each.id}>
                {each.username}
              </OptionBox>
            ))}
          </SelectBox>
        )}
        <SignUpButton>SignUp</SignUpButton>
        <FormMessage>{message}</FormMessage>
      </FormBox>
    </BackgroundImage>
  );
}

export default SignUpForm;
