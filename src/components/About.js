import React from 'react'

import { holeImg } from '../golf'

const About = () => (
  <div className='p2'>
    <div className='flex flex-wrap mxn1'>
      {[...Array(18)].map((_, i) => (
        <div key={i} className='flex col-12 sm-col-6 md-col-4 px1'>
          <div className='mb2'>
            <img src={holeImg(i)} alt={`hole ${i + 1}`} />
          </div>
        </div>
      ))}
    </div>
  </div>
)

export default About
