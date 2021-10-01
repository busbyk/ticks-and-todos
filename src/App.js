import './App.css'
import SearchBar from './components/SearchBar'
import SearchResult from './components/SearchResult'
import ClimberCard from './components/ClimberCard'

import {generateNotableClimbs} from './NotableClimbs'

import {useEffect, useState, useCallback} from 'react'
import NotableClimb from './components/NotableClimb'
import {pingApi, getTicks, getMpUserInfo} from './API'

function App() {
  const [searchResults, setSearchResults] = useState()
  const [mpUseridUsername, setMpUseridUsername] = useState()
  const [climber, setClimber] = useState()
  const [notableClimbs, setNotableClimbs] = useState()
  const [loading, setLoading] = useState()
  const [searching, setSearching] = useState()
  const [error, setError] = useState()

  const isValidUseridUsername = useCallback((useridUsername) => {
    const useridUsernameRegex = /([0-9]+\/.+)/g
    return useridUsernameRegex.test(useridUsername)
  }, [])

  const handleMpUseridUsernameChange = useCallback(
    (useridUsername) => {
      if (isValidUseridUsername(useridUsername)) {
        setMpUseridUsername(useridUsername)
      } else {
        console.error('invalid mountain project userid/username combo')
        setError(
          "This user's user id and username does not match the expected format so we cannot retrieve their ticks."
        )
      }
    },
    [isValidUseridUsername]
  )

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
    const url = new URL(window.location)
    const useridUsernameSearchParam = url.searchParams.get('useridUsername')
    if (useridUsernameSearchParam) {
      handleMpUseridUsernameChange(useridUsernameSearchParam)
    }
  }, [handleMpUseridUsernameChange])

  useEffect(() => {
    const runEffect = async () => {
      const url = new URL(window.location)
      url.searchParams.set('useridUsername', mpUseridUsername)
      window.history.pushState({}, '', url)

      setClimber(null)
      setLoading(true)
      const ticks = await getTicks(mpUseridUsername)
      const climberInfo = await getMpUserInfo(mpUseridUsername)
      setClimber({
        ...climberInfo,
        ticks,
      })
      setLoading(false)
    }

    if (mpUseridUsername) {
      runEffect()
    }
  }, [mpUseridUsername, isValidUseridUsername])

  useEffect(() => {
    if (climber) {
      setSearchResults(null)
      setNotableClimbs(generateNotableClimbs(climber.ticks))
    }
  }, [climber])

  return (
    <section>
      <div
        className={`container ${climber || loading ? 'user-is-selected' : ''}`}
      >
        <div id='search-input'>
          {searching ? (
            <p>Searching...</p>
          ) : climber ? null : (
            <p>Search for a Mountain Project user to analyze their ticks</p>
          )}
          <SearchBar
            setSearchResults={setSearchResults}
            setSearching={setSearching}
            isValidUseridUsername={isValidUseridUsername}
            handleMpUseridUsernameChange={handleMpUseridUsernameChange}
          />
        </div>
        {searchResults && !loading && (
          <div id='search-results'>
            <div>
              {searchResults.length === 0 && <p>No users found</p>}
              {searchResults.map((result, idx) => (
                <SearchResult
                  result={result}
                  setMpUseridUsername={setMpUseridUsername}
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
                  <div key={idx}>
                    <NotableClimb
                      title={notableClimb.displayName}
                      climb={notableClimb.climb}
                    />
                  </div>
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
