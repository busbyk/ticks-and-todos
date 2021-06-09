import { getTicks } from '../API'
import defaultThumbnail from '../default-thumbnail.svg'
import { IoMdPin } from 'react-icons/io'

const SearchResult = (props) => {
  const { result, setClimber } = props

  function generateUseridUsername(userId) {
    const username = result.name.replace(' ', '-').toLowerCase()
    return `${userId}/${username}`
  }

  async function getUserTicks() {
    const ticks = await getTicks(generateUseridUsername(result.userId))
    setClimber({
      ...result,
      ticks: ticks,
    })
  }

  return (
    <div className='search-result' onClick={getUserTicks}>
      <img
        src={
          result.imgUrl !== '/img/user/missing2.svg'
            ? result.imgUrl
            : defaultThumbnail
        }
        alt='user thumbnail'
        onError={(e) => (e.target.src = defaultThumbnail)}
      />
      <div className='search-result-name-container'>
        <div className='search-result-name'>{result.name}</div>
        <div>
          {result.location && (
            <span>
              <IoMdPin />{' '}
            </span>
          )}
          {result.location}
        </div>
      </div>
    </div>
  )
}

export default SearchResult
