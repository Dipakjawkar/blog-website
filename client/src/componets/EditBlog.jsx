import React from 'react'
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EditBlog() {
    

    const [blog, setBlog] = useState({ title: "", description: "", img: "", content: "" });
    const history = useNavigate();
    const { id } = useParams()
    const fillData = () => {
        console.log(id)
        fetch('/api/v1/blog/get-blog/'+id,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }
      ).then((val) => {
        return val.json()
     }).then((val) => {
        console.log(val)
        setBlog(val.blog)
     })


       
    }

    const onChangeHandal = (e) => {
        setBlog({ ...blog, [e.target.name]: e.target.value })
    }
   
    
    const formSubmitHandal = async (e) => {
        const { title, description, img, content } = blog

        try {
            const res = await fetch('/api/v1/blog/update/' + id, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title, description, img, content
                })
            })
            const data = await res.json();
            if (data.success === true) {
                alert("Blog Edit Successfull !")
                history('/myblogs')
            } else {
                alert("plese Login")
                history("/signin")
            }
        } catch (e) {
            console.log(e)
        }
        setBlog({ title: "", description: "", img: "", content: "" })

    }




    return (
        <div className='body'>
            <div className="outer-box">
                <h1>EDIT BLOG</h1>
                <br />
                <button onClick={() => fillData()}>Fill Data</button>
                <input type="text" style={{ width: "80vw" }} placeholder='Title' value={blog.title} name='title' onChange={onChangeHandal} />
                <br />
                <input type="text" style={{ width: "80vw" }} placeholder='description' value={blog.description} name='description' onChange={onChangeHandal} />
                <br />
                <input type="text" style={{ width: "80vw" }} placeholder='IMG Link' value={blog.img} name='img' onChange={onChangeHandal} />
                <br />
                <input type="text" style={{ width: "80vw" }} placeholder='Enter Some text here !' value={blog.content} name='content' onChange={onChangeHandal} />
                <br />
                <div><input style={{ backgroundColor: "rgb(166, 0, 255)", color: "white", fontWeight: "bold" }} type="button" value='POST' onClick={formSubmitHandal} /></div>
                {/* <p>do you have a account ?</p>
        <p>signin</p> */}
            </div>
        </div>
    )
}

export default EditBlog