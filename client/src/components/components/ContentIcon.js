import React, {useState} from 'react'
import '../pages/css/Dashboard.css'
import { Link } from 'react-router-dom'
import Popup from './Popup';

function ContentIcon({id,title,content}) {
  const [showPopUp,setShowPopUp] = useState(false);

  return (
    <>
    <div className='content_icon_dashboard'>
            <h4>{title}</h4>
            <p>{content}...</p>
            <Link to={`/link/${id}`}>View the content</Link>
            <button onClick={()=>setShowPopUp(true)}>Delete</button>
    </div>
    {
      showPopUp && <Popup id={id} setShowPopUp={setShowPopUp}/>
    }
    </>
  )
}

export default ContentIcon