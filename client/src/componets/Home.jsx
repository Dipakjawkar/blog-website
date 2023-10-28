import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';



function Home() {
  const [post, setPost] = useState();
  const history = useNavigate();


  function timeAgo(mongooseTime) {
    const currentTime = new Date();
    const timeDifference = currentTime - mongooseTime;
  
    // Convert the time difference to minutes
    const minutesAgo = Math.floor(timeDifference / (1000 * 60));
  
    if (minutesAgo < 1) {
      return 'Just now';
    } else if (minutesAgo === 1) {
      return '1 minute ago';
    } else {
      return `${minutesAgo} minutes ago`;
    }
  }
  
  // Example usage:
  const mongooseTime = new Date('2023-10-17T12:30:00'); // Replace with your Mongoose time
  const timeAgoString = timeAgo(mongooseTime);
  console.log(timeAgoString); // Outputs something like "2 minutes ago" or "Just now"
  

  const feachUser = () => {
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

            {post.map((val, index) => {
              return (<>

                <div className="card" onClick={()=>history('/'+val._id)}>
                  <div className="card__header">
                    <img
                      src={val.img ? val.img : "https://newsletter.kokilabenhospital.com/wp-content/plugins/penci-portfolio//images/no-thumbnail.jpg"}
                      alt="card__image"
                      className="card__image"
                      width={600}
                    />
                  </div>
                  <div className="card__body">
                    <span className="tag tag-blue">Technology</span>
                    <h4>{val.title} and</h4>
                    <p>
                      {val.description}
                    </p>
                  </div>
                  <div className="card__footer">
                    <div className="user">
                      <img
                        src="https://i.pravatar.cc/40?img=1"
                        alt="user__image"
                        className="user__image"
                      />
                      <div className="user__info">
                        <h5>{val.user}</h5>
                        <small>{timeAgo(new Date(val.createdAt))}</small>
                      </div>
                    </div>
                  </div>
                </div>


              </>)
            })}

          </> : <>Loading...</>}

        </div>
      </div>
      <div className="right">
        <div className="container">
          {post ? <>

            {post.map((val, index) => {
              return (<>


                <div className="card" onClick={()=>history('/'+val._id)}>
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

export default Home