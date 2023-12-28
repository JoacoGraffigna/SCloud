import React from 'react'
import '../../styles/home.css'
import { Form } from '../form/Form'
import CLOUD from '../home/CLOUD.png'

function Home() {
  return (
    <main className="home-container">
      <picture className='title-container'>
        <img src={CLOUD} alt='SCLOUD icon'/>
      </picture>

      <Form />    

    </main>
  )
}

export { Home }