import React, {useEffect} from 'react'
import '../pages/css/ContentPage.css'

function ContentPage({data,summary}) {

  const handleCopy = async (text) => {
     try {
      await navigator.clipboard.writeText(text);
      console.log('Text successfully copied to clipboard!');
      } catch (err) {
      console.error('Unable to copy to clipboard. Error:', err);
      }   
  };

  return (
    <div className='content_page'>
        <div className='container'>
            <div className='center-sb'>
            <h4>Transcription</h4>
            <h4 className='copy_btn' onClick={()=>handleCopy(data.transcription)}>Copy</h4>
            </div>
            <p>{data.transcription}</p>
        </div>

        <div className='container'>
            <div className='center-sb'>
            <h4>Summary</h4>
            <h4 className='copy_btn' onClick={()=>handleCopy(data.summary)}>Copy</h4>
            </div>
            <p>{data.summary}</p>
        </div>
    </div>
  )
}

export default ContentPage