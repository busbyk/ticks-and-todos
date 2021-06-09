import { useState } from 'react'
import { getTicks, getMpUserSearchResults } from '../API'

import { FaSearch } from 'react-icons/fa'

const useridUsernameRegex = /([0-9]+\/.+)/g

const SearchBar = (props) => {
  const { setClimber, setSearchResults } = props
  const [input, setInput] = useState()

  function handleChange(e) {
    setInput(e.target.value)
  }

  async function handleSearch() {
    const isValidUseridUsername = useridUsernameRegex.test(input)

    if (isValidUseridUsername) {
      const ticks = await getTicks(input)
      setClimber({
        ticks: ticks,
      })
    } else {
      const searchResults = await getMpUserSearchResults(input)
      setSearchResults(searchResults)
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
