import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../api/config';
import {
  BackgroundImage, LoginButton, SignUpButton,
  NavBar, ActionContainer, Logo, About, Heading, AboutPage
} from '../components/DesignLayout';

function Homepage(onLogin) {
  const navigate = useNavigate();
  useEffect(() => {
      axios.get(`${BASE_URL}/api/auth/me`, { withCredentials: true })
        .then(response => {
          if (response.data?.user) {
            onLogin(response.data.user);
            navigate('/dashboard');
          }
        })
        .catch(() => {
          console.log("error")
        });
    }, []);
  return (
    <BackgroundImage style={{display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
      <NavBar>
        <Logo src="/Logo.png" alt="Logo" style={{height:"50px", width:"50px", margin:'5px'}}/>
        <ActionContainer>
          <SignUpButton onClick={() => navigate('/signup')}>Sign Up</SignUpButton>
          <LoginButton onClick={() => navigate('/login')}>Login</LoginButton>
        </ActionContainer>
      </NavBar>

      <About>
        <Heading>CareLink</Heading>
        <AboutPage>
          At CareLink, we bridge the gap between caretakers and patients through a seamless digital platform.
        </AboutPage>
      </About>
    </BackgroundImage>
  );
}

export default Homepage;
