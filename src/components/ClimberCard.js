const ClimberCard = (props) => {
  const { climber } = props

  return (
    <div className='climber-card'>
      <div className='thumbnail-container'>
        <img src={climber.imgUrl} alt='user thumbnail' />
      </div>
      <div className='emphasized-name'>
        <a
          href={`https://mountainproject.com/u/${climber.userId}`}
          target='_blank'
          rel='noreferrer'
        >
          {climber.name}
        </a>
      </div>
      <div>Number of ticks: {climber.ticks.length}</div>
    </div>
  )
}

export default ClimberCard
