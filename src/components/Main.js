import React, { Component } from 'react'

import Hole from './Hole'

const players = [
  {"id":"27649","name":"Brandt Snedeker"},
  {"id":"40058","name":"Zac Blair"},
  {"id":"37455","name":"Si Woo Kim"},
  {"id":"20691","name":"Greg Owen"},
  {"id":"29478","name":"Kevin Kisner"},
  {"id":"29461","name":"Jamie Lovemark"},
  {"id":"27436","name":"Graham DeLaet"},
  {"id":"24024","name":"Zach Johnson"},
  {"id":"08075","name":"Jerry Kelly"},
  {"id":"34264","name":"Hudson Swafford"}
]

class Main extends Component {
  state = {
    data: null,
    holeNum: 0,
    playerId: '27649',
    view: 'full',
  }

  componentDidMount() {
    fetch(`${process.env.PUBLIC_URL}/data/tourneys/1/summary.json`)
      .then(response => response.json())
      .then(data => this.setState({ data }))
  }

  handleChange = e => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  toggleView = () => {
    this.setState(prevState => {
      const view = prevState.view === 'full' ? 'green' : 'full'
      return { view }
    })
  }

  render() {
    const { data, holeNum, playerId } = this.state

    return (
      <div className='p2'>
        <div className='h1'>🏌</div>
        <select
          name='holeNum'
          onChange={this.handleChange}
          value={holeNum}
        >
          {[...Array(18)].map((_, i) => (
            <option key={i} value={i}>{i + 1}</option>
          ))}
        </select>
        <select
          name='playerId'
          onChange={this.handleChange}
          value={playerId}
        >
          {players.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
        {!data
          ? <div>Loading...</div>
          : <Hole
              toggleView={this.toggleView}
              {...this.state}
            />
        }
      </div>
    )
  }
}

export default Main
