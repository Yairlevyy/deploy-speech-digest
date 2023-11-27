import React, {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { Helmet } from 'react-helmet';
import './css/Connection.css'

function SignUp() {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [errorMsg,setErrorMsg] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const signUp = async () => {
    const data = {email,password}
    console.log(data)
    try {
      const response = await fetch('/users/signup', {
        headers:{
          "content-type":"application/json"
        },
        method: 'POST',
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        navigate(`/dashboard/${data.user_id}`);
        console.log('Successful login!', data.user_id);
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData.msg);
        setErrorMsg(errorData.msg);
      };
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(()=>{
  const checkUser = async () => {
  const storedToken = localStorage.getItem('token');
  console.log("token:",storedToken)
  try {
      const response = await fetch('/users/check-user', {
        headers:{
          "content-type":"application/json"
        },
        method: 'POST',
        body: JSON.stringify({token:storedToken}),
      });
      if (response.ok) {
        const data = await response.json();
        navigate(`/dashboard/${data.user_id}`);
      } 
    } catch (error) {
      console.error('Error:', error);
    }
  };
  checkUser();
  },[])

  return (
    <div className='center connection_page'>
      <h1 className='mb_40'>SpeechDigest.ai</h1>
      <div className='form mb_80'>
        <h3>Create your Account for Free</h3>
        <div className='input_container'>
            <label htmlFor='email'>Email</label><br/>
            <input type='email' name='email' placeholder='Type your answer here...' onChange={handleInputChange}/>
        </div>
        <div className='input_container'>
            <label htmlFor='password'>Password</label><br/>
            <input type='password' name='password' placeholder='Type your answer here...' onChange={handleInputChange}/>
        </div>
        <p className='color_red'>{errorMsg ? errorMsg : null}</p>
        <button onClick={signUp}>Sign Up</button>
        <p>Already have an account ? <Link className='a_connection' to='/signin'>Sign In</Link></p>
      </div>
    <Helmet>
      <title>SpeechDigest.ai - Sign Up</title>
    </Helmet>
    </div>
  )
}

export default SignUp