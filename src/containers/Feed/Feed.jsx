import React, {useEffect}  from "react";
import { useSelector, useDispatch } from 'react-redux';

const Feed = () => {

    const feed = useSelector(state => state.feed);
    // зачем тут dispatch
    const dispatch = useDispatch()
    console.log(feed)
    
    

    // const navigate = useNavigate()
    // useEffect(() => {
    //     if (auth.access_token) {
    //         navigate('/')
    //     }
    // }, [auth.access_token, navigate])

  return (
    <div>
        Feed
    </div>
  );
}

export default Feed;