import React from 'react'
import '../pages/css/Dashboard.css'
import { Link,useNavigate } from 'react-router-dom'

function NavBar({data,setData,setFilteredData,filteredData,handlePageChange,currentPage,totalPages}) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate('/signin')
  }
  
  const handleInputChange = (event) => {
    const inputValue = event.target.value.toLowerCase();

    // If the input is empty, revert to the initial data
    if (!inputValue) {
      setFilteredData(data);
      return;
    }

    // Filter the data based on the input value
    const filtered = data.filter((item) =>{
      return item.title.toLowerCase().includes(inputValue)
    });

    setFilteredData(filtered);
  };

  return (
    <>
    <div className='navbar_container laptop_header'>
        <h2>SpeechDigest.ai</h2>
        <div className='search_container'>
          <div className='mr-10'>
            <input type='text' placeholder='Search here...' onChange={handleInputChange}/>
            <button>Search</button>
          </div>  
          <div className='change_page_container'>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >Prev</button>
            <span>{`${currentPage} of ${totalPages}`}</span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >Next</button>
          </div>
        </div>
        <div className='logout'>
          <button onClick={handleLogout}>↪ Log Out</button>
        </div>
    </div>
    <div className='navbar_container mobile_header'>
        <div className='header_container'>
            <h2>SpeechDigest.ai</h2>
            <div className='logout'>
              <button onClick={handleLogout}>↪ Log Out</button>
            </div>
        </div>
        <div className='search_container'>
          <div className='mr-10'>
            <input type='text' placeholder='Search here...' onChange={handleInputChange}/>
            <button>Search</button>
          </div>  
          <div className='change_page_container'>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >Prev</button>
            <span>{`${currentPage} of ${totalPages}`}</span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >Next</button>
          </div>
        </div>
    </div>
    </>
  )
}

export default NavBar