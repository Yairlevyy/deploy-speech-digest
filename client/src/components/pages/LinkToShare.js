import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import ContentPage from '../components/ContentPage'
import { useParams } from 'react-router-dom';

function LinkToShare() {
  const { id } = useParams();
  const [data,setData] = useState({});

useEffect(()=>{
    const getData = async () => {
      try {
        const storedToken = localStorage.getItem('token');
        const response = await fetch(`/data/get-data-by-id/${id}?token=${storedToken}`);
        
        if (response.ok) {
        const responseData = await response.json();
        setData(responseData[0])
        } else {
        const errorData = await response.json();
        console.error('Error:', errorData);
        };

      } catch (error) {
        console.error('Error:', error);
      }
    };
    getData();
  },[]);
  
  return (
    <div className='linktoshare_page'>
      <div className='header'>
        <h1>SpeechDigest.ai</h1>
      </div>
      <ContentPage data={data}/>
      <Helmet>
        <title>SpeechDigest.ai - Share</title>
      </Helmet>
    </div>
  )
}

export default LinkToShare