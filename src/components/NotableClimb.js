const NotableClimb = (props) => {
  const {climb, title} = props

  return (
    <div className='notable-climb'>
      <a href={climb.URL} target='_blank' rel='noreferrer'>
        <h2>{title}</h2>
        <h3>{climb.Route}</h3>
        {climb.Rating}
      </a>
    </div>
  )
}

export default NotableClimb
