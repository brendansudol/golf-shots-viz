import React from 'react'

import { plotPoints } from '../golf'

const IMG_DIM = { w: 720, h: 327 }

const getImg = (num, view) => {
  const holeNum = `${+num < 9 ? '0' : ''}${+num + 1}`
  return `${process.env.PUBLIC_URL}/data/tourneys/1/course/holes/${holeNum}_${view}.jpg`
}

const Hole = ({ data, holeNum, playerId, view }) => {
  const { courses, players } = data.leaderboard
  
  const { course_name, holes } = courses[0]
  const hole = holes[holeNum]
  const round = hole.round[3]

  const player = players.find(p => p.player_id === playerId)
  const { shots } = player.holes[holeNum]

  const { tee, pin, shots: shotPts } = plotPoints(hole, round, shots, view, IMG_DIM)
  const img = getImg(holeNum, view)

  return (
    <div>
      <div>{course_name}</div>

      <div className='my1 relative' style={{ maxWidth: 700 }}>
        <img className='col-12' src={img} alt='hole' />
        <svg
          className='absolute left-0 top-0'
          viewBox={`0 0 ${IMG_DIM.w} ${IMG_DIM.h}`}
          style={{ width: '100%' }}
        >
          {shotPts.map((c, i) => (
            <circle key={i} cx={c.x} cy={c.y} r='4' fill='tomato' />
          ))}
          <circle cx={tee.x} cy={tee.y} r='2' fill='#fff' />
          <circle cx={pin.x} cy={pin.y} r='2' fill='#fff' />
        </svg>
      </div>

      <div>
        {shots.map((s, i) => (
          <pre className='m0' key={i}>{s.shottext}</pre>
        ))}
      </div>
    </div>
  )
}

export default Hole
