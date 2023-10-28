import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function BlogPage() {
    const [post, setPost] = useState()
    const [postpage, setPostpage] = useState()
    const { id } = useParams()


    const feachUser = () => {

        fetch('api/v1/blog/get-blog/' + id,
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
            setPostpage(val.blog)
        })


        fetch('api/v1/blog',
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

    useEffect(() => {
        feachUser()
    }, [])



    return (
        <div className='home-main'>
            <div className="left">
                <div className="cards-title">
                    All POSTS
                </div>

                <div className="container">

                    {post ? <>

                    <h1>  {postpage.title}</h1>
                    <img
                      src={postpage.img}
                      alt="card__image"

                      width={600}
                    />
                        <div style={{textAlign:"center", margin:"10px"}}>{postpage.content}</div>
                    </> : <>Loading...</>}

                </div>
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

export default BlogPage