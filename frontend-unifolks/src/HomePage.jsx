import { Typography } from '@material-ui/core';
import React from 'react'
import NavBar from './components/NavBar';
import image from './images/sitting.svg'
export default function HomePage() {
  return (
    <div class="homepage">
        <NavBar/>

        <div class="homepage-body">
          <div className="content">
            <h1 class="homepage-tagline">
              Find folks at university!
            </h1>
            <p class="homepage-bio">
              An internal tool to search people among university. Be it from academic or administrative people, we have got your back!
              If you are admin, kindly login via login button, else we will love to have you as our own folk!
            </p>
          </div>
          <div className="media">
            <img src={image} alt="Background" />
          </div>
        </div>
    </div>
  )
}
