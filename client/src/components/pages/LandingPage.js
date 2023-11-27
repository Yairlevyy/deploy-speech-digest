import React from 'react';
import {Link} from 'react-router-dom';
import { Helmet } from 'react-helmet';
import './css/LandingPage.css';
import ImageSlider from '../components/ImageSlider';
import ImageOne from './Assets/slider.png'
import ImageTwo from './Assets/slider_two.png'
import ImageThree from './Assets/slider_three.png'

function LandingPage() {
  const images = [
    ImageOne,ImageTwo,ImageThree
  ]
  return (
    <div className='center lp_page'>
      <h1 className='mb_40'>SpeechDigest.ai</h1>
      <ImageSlider images={images} />
      <h1 className='mb_0 mw_400'>Transforming Talk into Text & Insight with AI</h1>
      <p className='mw_400'>Effortlessly transcribe audio/video files and gain organized summaries, thanks to cutting-edge AI.</p>
      <Link to="/signup">Get Started for Free</Link>
      <Helmet>
        <title>SpeechDigest.ai - Get Started</title>
      </Helmet>
    </div>
  )
};

export default LandingPage