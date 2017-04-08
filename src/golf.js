import { inv, matrix, multiply } from 'mathjs'

const { abs, asin, atan2, cos, pow, sin, sqrt, tan, PI } = Math

export const fullPositions = hole => ({
  fov: +hole.hole_fov,
  roll: +hole.hole_roll,
  camera: {
    x: +hole.hole_camera_x,
    y: +hole.hole_camera_y,
    z: +hole.hole_camera_z,
  },
  target: {
    x: +hole.hole_target_x,
    y: +hole.hole_target_y,
    z: +hole.hole_target_z,
  },
})

export const greenPositions = hole => ({
  fov: +hole.green_fov,
  roll: +hole.green_roll,
  camera: {
    x: +hole.green_camera_x,
    y: +hole.green_camera_y,
    z: +hole.green_camera_z,
  },
  target: {
    x: +hole.green_target_x,
    y: +hole.green_target_y,
    z: +hole.green_target_z,
  },
})

export const getPositions = (hole, view) => (
  view === 'green' ? greenPositions(hole) : fullPositions(hole)
)

export const geoProps = positionData => {
  const { fov, roll, camera: c, target: t } = positionData

  const fovA = fov * PI / 180
  const tau = roll * PI / 180
  const dist = sqrt(pow(c.x - t.x, 2) + pow(c.y - t.y, 2) + pow(c.z - t.z, 2))
  const beta = (PI / 2) - asin((c.z - t.z) / dist)
  const y = (PI / 2) + atan2(c.y - t.y, c.x - t.x)

  const rotZ0 = matrix([
    [cos(tau), sin(tau), 0],
    [-sin(tau), cos(tau), 0],
    [0, 0, 1]
  ])
  const rotZ1 = matrix([
    [cos(y), sin(y), 0],
    [-sin(y), cos(y), 0],
    [0, 0, 1]
  ])
  const rotX = matrix([
    [1, 0, 0],
    [0, cos(beta), sin(beta)],
    [0, -sin(beta), cos(beta)]
  ])

  const proj = inv(multiply(multiply(rotZ0, rotX), rotZ1))._data
  const scale = imgH => (imgH * 0.5) / tan(fovA * 0.5)

  return { dist, proj, scale, t }
}

export const plot = (coord, geo, img) => {
  const { dist, proj, scale, t } = geo

  const d = { x: +coord.x - t.x, y: +coord.y - t.y, z: +coord.z - t.z }
  const pz = (d.x * proj[2][0]) + (d.y * proj[1][2]) + (d.z * proj[2][2])

  const s = scale(img.h) / abs(dist - pz)
  const x = (img.w * 0.5) + (s * ((d.x * proj[0][0]) + (d.y * proj[1][0])))
  const y = (img.h * 0.5) - (s * ((d.x * proj[0][1]) + (d.y * proj[1][1])))
  return { x, y }
}

export const plotPoints = (hole, round, shots, view, imgDim) => {
    const { tee_x, tee_y, tee_z, pin_x, pin_y, pin_z } = round
    const geo = geoProps(getPositions(hole, view))

    return {
      tee: plot({ x: tee_x, y: tee_y, z: tee_z }, geo, imgDim),
      pin: plot({ x: pin_x, y: pin_y, z: pin_z }, geo, imgDim),
      shots: shots.map(s => plot(s, geo, imgDim)),
    }
}
