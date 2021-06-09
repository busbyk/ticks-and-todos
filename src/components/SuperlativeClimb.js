const SuperlativeClimb = (props) => {
  const { climb, title } = props

  return (
    <div>
      <h2>{title}</h2>
      <h3>{climb.Route}</h3>
    </div>
  )
}

export default SuperlativeClimb
