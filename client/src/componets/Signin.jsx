import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/authContext';

function Signin() {
  const { setIsLoggedIn } = useAuth();

  const [user, setUser] = useState({email:"",password:""});
  const history = useNavigate();
  const onChangeHandal = (e) =>{
    setUser({...user, [e.target.name]:e.target.value})
  }
  const formSubmitHandal = async (e) =>{
    const {password, email} = user
    if( !password || !email ){
      return alert("Plesee Fill all fields !")
    }
    try{
      const res = await fetch('/api/v1/user/signin',{
        method:"POST",
        headers:{
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({
           password, email
        })
      })
      const data = await res.json();
      if(data.success===true){
        alert("Signin Successfull !")
        console.log(data)
        setIsLoggedIn(true);
        history('/')
      }else{
        alert("Invalid Email and password")
      }
    }catch(e){
      console.log(e)
    }
    setUser({email:"",password:""})
   
  }


  return (
<>
<div className='body'> 
      <div className="outer-box">
      <h1>SIGNIN</h1>
      <br />
        <input type="text" placeholder='USER NAME OR EMAIL ID' name='email' value={user.email} onChange={onChangeHandal}/>
        <br />
        <input type="text" placeholder='PASSWORD' name='password' value={user.password} onChange={onChangeHandal}/>
        <br />
        <div><input className='btn-fill'  type="button" value='SIGNIN' onClick={formSubmitHandal} /></div>
        <p>forgot your password ?</p>
        <p onClick={()=>history('/signup')}>signup</p>
      </div>
    </div>
</>
  )
}

export default Signin