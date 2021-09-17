import {useState} from 'react'
import {getMpUserSearchResults} from '../API'

import {FaSearch} from 'react-icons/fa'

const SearchBar = (props) => {
  const {
    setSearchResults,
    setSearching,
    isValidUseridUsername,
    handleMpUseridUsernameChange,
  } = props
  const [input, setInput] = useState()

  function handleChange(e) {
    setInput(e.target.value)
  }

  async function handleSearch() {
    if (isValidUseridUsername(input)) {
      handleMpUseridUsernameChange(input)
    } else {
      setSearching(true)
      const searchResults = await getMpUserSearchResults(input)
      setSearchResults(searchResults)
      setSearching(false)
    }
  }

  return (
    <div>
      <input
        type='text'
        onKeyUp={(e) => {
          if (e.code === 'Enter') {
            handleSearch()
          }
        }}
        onChange={handleChange}
      />
      <button onClick={handleSearch}>
        <FaSearch />
      </button>
    </div>
  )
}

export default SearchBar
