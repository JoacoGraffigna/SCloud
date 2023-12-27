import React from 'react'
import '../../App.css';
import Form from '../form/Form';
import CLOUD from '../home/CLOUD.png'

const Home = () => {
  return (
    <div className="App">
     <div className='titulo'>
     <img width={"200px"} src={CLOUD} alt='SCLOUD'/>
     </div>
    <Form></Form>      

    </div>
  )
}

export default Home
