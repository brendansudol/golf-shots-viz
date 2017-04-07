import React, { Component } from 'react'

const img = `${process.env.PUBLIC_URL}/data/tourneys/1/course/holes/03_full.jpg`

class App extends Component {
  render() {
    return (
      <div className='p3'>
        <div className='h1'>🏌</div>
        <img src={img} alt='hole' />
      </div>
    )
  }
}

export default App
