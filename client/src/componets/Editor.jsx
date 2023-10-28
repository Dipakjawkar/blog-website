import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Editor() {
    
    const [blog, setBlog] = useState({title:"",description:"",img:"",content:""});
    const history = useNavigate();
    const onChangeHandal = (e) =>{
      setBlog({...blog, [e.target.name]:e.target.value})
    }
    const formSubmitHandal = async (e) =>{
      const {title, description, img, content} = blog
    
      if(!title || !description || !content ){
        return alert("Plesee Fill all fields !")
      }
      
      try{
        const res = await fetch('/api/v1/blog/post',{
          method:"PUT",
          headers:{
            "Content-Type" : "application/json"
          },
          body: JSON.stringify({
            title, description, img, content
          })
        })
        const data = await res.json();
        if(data.success===true){
          alert("New Blog Successfull !")
          history('/myblogs')
        }else{
          alert("plese Login")
          history("/signin")
        }
      }catch(e){
        console.log(e)
      }
      setBlog({title:"",description:"",img:"",content:""})
     
    }


  return (
    <div className='body'> 
      <div className="outer-box">
      <h1>NEW BLOG</h1>
      <br />
        <input type="text" style={{width:"80vw"}} placeholder='Title' value={blog.title} name='title' onChange={onChangeHandal} />
        <br />
        <input type="text" style={{width:"80vw"}} placeholder='description' value={blog.description} name='description' onChange={onChangeHandal} />
        <br />
        <input type="text" style={{width:"80vw"}} placeholder='IMG Link' value={blog.img} name='img'   onChange={onChangeHandal} />
        <br />
        <input type="text" style={{width:"80vw"}} placeholder='Enter Some text here !' value={blog.content} name ='content' onChange={onChangeHandal} />
        <br />
        <div><input style={{backgroundColor:"rgb(166, 0, 255)",color:"white",fontWeight:"bold"}} type="button" value='POST' onClick={formSubmitHandal} /></div>
        {/* <p>do you have a account ?</p>
        <p>signin</p> */}
      </div>
    </div>
  )
}

export default Editor