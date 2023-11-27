import React, {useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import '../pages/css/Dashboard.css'
import ContentIcon from '../components/ContentIcon';
import NavBar from '../components/NavBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

function Dashboard() {
  const {user_id} = useParams();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [title,setTitle] = useState('');
  const [isLoading,setIsLoading] = useState(false);
  const [data,setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [serverMsg,setServerMsg] = useState(null);

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setServerMsg(null);
  };

  const uploadAudioFile = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(title)
    try {
      // Create a FormData object
      const storedToken = localStorage.getItem('token');
      console.log(storedToken)
      const formData = new FormData();
      formData.append('audioFile', file);

      // Make the POST request
      const response = await fetch(`/api/upload/${user_id}?token=${storedToken}&title=${title}`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Ok! Response:', responseData);
        setServerMsg(responseData.msg)
        setTimeout(handleRefresh,3000);
      } else {
        const errorData = await response.json();
        console.error('Error uploading file:', errorData);
        setServerMsg(errorData.error)
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const itemsPerPage = 7;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const checkUser = async () => {
  const storedToken = localStorage.getItem('token');
  console.log("token:",storedToken)
  try {
      const response = await fetch('/users/check-user', {
        headers:{
          "content-type":"application/json"
        },
        method: 'POST',
        body: JSON.stringify({token:storedToken}),
      });
      if (!response.ok) {
        const data = await response.json();
        navigate(`/signin`);
      } 
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getData = async () => {
      try {
        const storedToken = localStorage.getItem('token');
        const response = await fetch(`/data/get-data-by-user-id/${user_id}?token=${storedToken}`);
        
        if (response.ok) {
        const responseData = await response.json();
        setData(responseData)
        setFilteredData(responseData)
        console.log('Ok! Response:', responseData);
        } else {
        const errorData = await response.json();
        console.error('Error:', errorData);
        };

      } catch (error) {
        console.error('Error:', error);
      }
  };

  useEffect(()=>{
    checkUser();
    getData();
  },[]);

  return (
  <div className='dashboard_page'>
   <div className='center'>
    <NavBar data={data} setData={setData} filteredData={filteredData} setFilteredData={setFilteredData} handlePageChange={handlePageChange} currentPage={currentPage} totalPages={totalPages}/>
    <div className='dashboard_body'>
        <div className='input_dashboard_body'>
            <form onSubmit={(e)=>uploadAudioFile(e)}>
                <input type="file" accept="audio/*,video/*" id='file_to_transcript' onChange={handleFileChange}/>
                <label htmlFor='file_to_transcript'>{file ? "Change the file" : "Upload a new file"}</label>
                { file && 
                    <>
                    <p>{file.name}</p>
                    <input type='text' onChange={(e)=>setTitle(e.target.value)} placeholder='Enter the title...'/>
                    {
                      serverMsg ? <p style={{fontSize:'10px'}}>{serverMsg}</p> : null
                    }
                    {
                      isLoading ? <FontAwesomeIcon icon={faSpinner} spin size="2xl" style={{color:"#0149ac",}} /> :
                      <button type='submit' style={{padding:"4px 7px"}}>SpeechDigest</button>
                    }
                    </>
                }
            </form>
        </div>

        {
          currentItems.reverse().map((item)=>{
            const title = item.title;
            const content = item.transcription.substring(0,200);
            return(
              <div key={item.id}>
                <ContentIcon id={item.id} title={title} content={content}/>
              </div>
            )
          })
        }
    </div>
   </div>
   <Helmet>
    <title>SpeechDigest.ai - Dashboard</title>
   </Helmet>
  </div>
  )
}

export default Dashboard;