import defaultThumbnail from '../default-thumbnail.svg'
import {IoMdPin} from 'react-icons/io'

const SearchResult = (props) => {
  const {result, setMpUseridUsername} = props

  const generateUseridUsername = (userId) => {
    const username = result.name.replace(' ', '-').toLowerCase()
    return `${userId}/${username}`
  }

  const handleClick = () => {
    setMpUseridUsername(generateUseridUsername(result.userId))
  }

  return (
    <div className='search-result' onClick={handleClick}>
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
