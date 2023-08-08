import React from 'react'
import GameCard from '../Components/GameCard'
import '../styles/home.css'
import ironLogo from '../images/IronLogo.jpg'
import '../styles/home.css'

function Home() {
  return (
    <div className='home-container'>
      <div className="home-title"><img className='logo' src={ironLogo}/><div className="title">IRON</div></div>
      <div className="content-container">
        <GameCard/>
      </div>
    </div>
  )
}

export default Home