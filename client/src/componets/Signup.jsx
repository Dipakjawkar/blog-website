import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
function Signup() {
  const [user, setUser] = useState({name:"",email:"",password:"",cpassword:""});
  const history = useNavigate();
  const onChangeHandal = (e) =>{
    setUser({...user, [e.target.name]:e.target.value})
  }
  const formSubmitHandal = async (e) =>{
    const {name, password, email, cpassword} = user
  
    if(!name || !password || !email || !cpassword ){
      return alert("Plesee Fill all fields !")
    }
    if(password!==cpassword){
      return alert("Password and C-Password Not match")
    }
    try{
      const res = await fetch('/api/v1/user/signup',{
        method:"POST",
        headers:{
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({
          name, password, email, cpassword
        })
      })
      const data = await res.json();
      if(data.success===true){
        alert("Signup Successfull !")
        history('/signin')
      }else{
        alert("Duplicat Email")
      }
    }catch(e){
      console.log(e)
    }
    setUser({name:"",email:"",password:"",cpassword:""})
   
  }

  return (
    <>
     <div className='body'> 
      <div className="outer-box">
      <h1>SIGNUP</h1>
      <br />
        <input type="text" placeholder='NAME' value={user.name} name='name' onChange={onChangeHandal} />
        <br />
        <input type="text" placeholder='EMAIL' value={user.email} name='email' onChange={onChangeHandal} />
        <br />
        <input type="text" placeholder='PASSWORD' value={user.password} name='password'   onChange={onChangeHandal} />
        <br />
        <input type="text" placeholder='CONFORM PASSWORD' value={user.cpassword} name ='cpassword' onChange={onChangeHandal} />
        <br />
        <div><input style={{backgroundColor:"rgb(166, 0, 255)",color:"white",fontWeight:"bold"}} type="button" value='SIGNUP' onClick={formSubmitHandal} /></div>
        <p>do you have a account ?</p>
        <p onClick={()=>history('/signin')}>signin</p>
      </div>
    </div>
    </>
  )
}

export default Signup