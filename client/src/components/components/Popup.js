import React from 'react'

function Popup({id,setShowPopUp}) {

  const handleRefresh = () => {
    window.location.reload();
  };
  
  const deleteData = async () => {
      try {
        const storedToken = localStorage.getItem('token');
        const response = await fetch(`/data/delete-data-by-id/${id}?token=${storedToken}`,{
          method:"DELETE",
          headers:{
            'content-type':'application/json'
          }
        });
        
        if (response.ok) {
        const responseData = await response.json();
        // ***
        console.log('Ok! Response:', responseData);
        handleRefresh();
        // ***
        } else {
        const errorData = await response.json();
        console.error('Error:', errorData);
        };

      } catch (error) {
        console.error('Error:', error);
      }
  };


  return (
    <div className='popup'>
        <p>Are you sure you want to delete?</p>
        <button onClick={deleteData}>Yes</button>
        <button onClick={()=>setShowPopUp(false)}>No</button>
    </div>
  )
};

export default Popup