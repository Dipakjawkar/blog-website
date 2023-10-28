import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function Myblogs() {

  const [post, setPost] = useState();
  const history = useNavigate();
  const feachUser = () => {
    fetch('api/v1/blog/myblogs',
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
      setPost(val.blogs)
    })
  }
  const deleteBlog =  (id) =>{
    fetch('api/v1/blog/delete/'+id,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    }
  ).then((val) => {
    return val.json()
  }).then((val) => {
    console.log(val)
    feachUser()
  })
  }

  useEffect(() => {
    feachUser()
  }, [])


  return (
    <div className='home-main'>
      <div className="left">
      <button onClick={()=>history("/editor")}>ADD NEW POST</button>
        <div className="cards-title">
          All POSTS
        </div>

        

        <table>
          {post ? <>

            {post.map((val, index) => {
              return (<>
                <tr>
                  <td>1</td>
                  <td>{val.title}</td>
                  <td>
                    <input className='tabel-btn' onClick={()=>history('/'+val._id)} type="button" value="SHOW" />
                    <input className='tabel-btn ' onClick={()=>history('/editor/'+val._id)} type="button" value="EDIT" />
                    <input className='tabel-btn' onClick={()=>deleteBlog(val._id)} style={{backgroundColor:"rgb(166, 0, 255)",color:"white"}} type="button" value="DELETE" />
                  </td>
                </tr>

              </>)
            })}

          </> : <>Loading...</>}

        </table>
      </div>
      <div className="right">
        <div className="container">
          {post ? <>

            {post.map((val, index) => {
              return (<>


                <div className="card">
                  <div className="card__body">
                    <span className="tag tag-blue">Technology</span>
                    <h4>{val.title}</h4>
                    <p>
                      {val.description}
                    </p>
                  </div>
                </div>


              </>)
            })}

          </> : <>Loading...</>}

        </div>
      </div>
    </div>
  )
}

export default Myblogs