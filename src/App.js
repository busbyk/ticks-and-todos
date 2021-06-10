import './App.css'
import SearchBar from './components/SearchBar'
import SearchResult from './components/SearchResult'
import ClimberCard from './components/ClimberCard'

import { generateSuperlatives } from './Superlatives'

import { useEffect, useState } from 'react'
import SuperlativeClimb from './components/SuperlativeClimb'

function App() {
  const [searchResults, setSearchResults] = useState()
  const [climber, setClimber] = useState()
  const [superlatives, setSuperlatives] = useState()
  const [loading, setLoading] = useState()

  useEffect(() => {
    if (climber) {
      setSuperlatives(generateSuperlatives(climber.ticks))
    }
  }, [climber])

  return (
    <section>
      <div
        className={`container ${climber || loading ? 'user-is-selected' : ''}`}
      >
        <div id='search-input'>
          <p>Search for a Mountain Project user to analyze their ticks</p>
          <SearchBar
            setClimber={setClimber}
            setSearchResults={setSearchResults}
          />
        </div>
        {searchResults && !loading && (
          <div id='search-results'>
            <div>
              {searchResults.length === 0 && <p>No users found</p>}
              {searchResults.map((result, idx) => (
                <SearchResult
                  result={result}
                  setClimber={(climber) => {
                    setSearchResults(null)
                    setClimber(climber)
                  }}
                  setLoading={setLoading}
                  key={idx}
                />
              ))}
            </div>
          </div>
        )}
        {loading && (
          <div id='loading-container'>
            <p>Loading...</p>
          </div>
        )}
        {climber && (
          <div id='content-container'>
            <ClimberCard climber={climber} />
            {superlatives && (
              <div className='superlative-container'>
                {superlatives.map((superlative, idx) => (
                  <SuperlativeClimb
                    title={superlative.displayName}
                    climb={superlative.climb}
                    key={idx}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

export default App
