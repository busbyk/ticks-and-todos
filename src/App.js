import './App.css'
import SearchBar from './components/SearchBar'
import SearchResult from './components/SearchResult'
import ClimberCard from './components/ClimberCard'

import {generateNotableClimbs} from './NotableClimbs'

import {useEffect, useState} from 'react'
import NotableClimb from './components/NotableClimb'
import {pingApi} from './API'

function App() {
  const [searchResults, setSearchResults] = useState()
  const [climber, setClimber] = useState()
  const [notableClimbs, setNotableClimbs] = useState()
  const [loading, setLoading] = useState()
  const [searching, setSearching] = useState()
  const [error, setError] = useState()

  useEffect(() => {
    console.log('Pinging backend to wake it up')
    pingApi().catch((err) => {
      setError(
        "Well, this is embarrassing. Something is wrong with our backend and searches won't work right now. We'll get this back up and running shortly."
      )
      setTimeout(() => {
        setError(null)
      }, 10000)
    })
  }, [])

  useEffect(() => {
    if (climber) {
      setNotableClimbs(generateNotableClimbs(climber.ticks))
    }
  }, [climber])

  return (
    <section>
      <div
        className={`container ${climber || loading ? 'user-is-selected' : ''}`}
      >
        <div id='search-input'>
          <p>
            {searching
              ? 'Searching...'
              : 'Search for a Mountain Project user to analyze their ticks'}
          </p>
          <SearchBar
            setClimber={setClimber}
            setSearchResults={setSearchResults}
            setLoading={setLoading}
            setSearching={setSearching}
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
        {error && (
          <div id='error-container'>
            <div>
              <p>{error}</p>
            </div>
          </div>
        )}
        {climber && (
          <div id='content-container'>
            <ClimberCard climber={climber} />
            {notableClimbs && (
              <div className='notable-climbs-container'>
                {notableClimbs.map((notableClimb, idx) => (
                  <NotableClimb
                    title={notableClimb.displayName}
                    climb={notableClimb.climb}
                    key={idx}
                  />
                ))}
              </div>
            )}
            <div>
              <p className='small'>
                This app is still under development. More notable climbs coming
                soon!
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default App
