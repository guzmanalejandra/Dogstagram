import React from 'react'
import RemoveGame from '../Components/RemoveGame'
import '../styles/home.css'
import ironLogo from '../images/IronLogo.jpg'
import '../styles/home.css'

function Remove() {
  return (
    <div className='home-container'>
      <div className="home-title"><img className='logo' src={ironLogo}/><div className="title">IRON</div></div>
      <div className="content-container">
        <RemoveGame/>
        
      </div>
    </div>
  )
}

export default Remove