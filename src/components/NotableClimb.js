const NotableClimb = (props) => {
  const { climb, title } = props

  return (
    <div>
      <a href={climb.URL} target='_blank' rel='noreferrer'>
        <h2>{title}</h2>
        <p>{climb.Route}</p>
      </a>
    </div>
  )
}

export default NotableClimb
