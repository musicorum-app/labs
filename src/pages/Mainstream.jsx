import React, {useEffect, useState} from 'react';
import AccountSelector from "../components/AccountSelector";
import LastfmAPI from "../api/lastfm.js";
import LoadingBar from "../components/LoadingBar";
import MusicorumAPI from "../api/musicorum";

const Mainstream = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [percent, setPercent] = useState(0)
  const [loadingText, setLoadingText] = useState('')

  useEffect(() => {
    try {
      const cache = JSON.parse(localStorage.getItem('cache'))
      if (cache) return setData(cache)
    } catch (e) {
    }
  }, [])

  const onSelect = async ({method, data}) => {
    try {
      const cache = JSON.parse(localStorage.getItem('cache'))
      if (cache) return setData(cache)
    } catch (e) {
    }

    setLoading(true);
    setData(null)

    if (method === 'lastfm') {
      setPercent(0)
      setLoadingText('Loading artists from last.fm...')
      const {user} = data;
      const {error, message, topartists} = await LastfmAPI.getTopArtists(user, '1month', 20);
      console.log(error, topartists)
      if (error) {
        setLoading(false);
        return setError(message);
      } else {
        const list = topartists.artist.map(({name}) => name)
        if (!topartists.artist.length) {
          setLoading(false)
          return setData({
            artists: []
          })
        }
        setPercent(50)
        setLoadingText('Loading popularity...')
        const artists = await MusicorumAPI.getMainstream(list)
        setPercent(100)
        setLoading(false)
        const pops = artists.map(d => d.popularity)
        const popAvg = (pops.reduce((a, b) => a + b, 0)) / pops.length
        const value = {
          popAvg,
          artists
        }
        setData(value)
        localStorage.setItem('cache', JSON.stringify(value))
        // setLoading(false);
      }
    }
  };


  return <>
    <AccountSelector spotify={true} onSelect={onSelect}
                     loading={loading} setLoading={setLoading}
                     error={error} setError={setError}
    />

    <div className="scaffold-section">
      {loading ?
        <LoadingBar percent={percent} text={loadingText}/>
        : ''
      }
      {
        data
          ? data.artists.length
          ? (
            <div className="mainstream">
              <span className="avg">
                <p className="percent">
                  <span>{data.popAvg}%</span>
                  <span className="text">mainstream</span>
                </p>
              </span>
              {
                data.artists.map(a => (
                  <div className="item" key={a.id}>
                    <div className="image" style={{backgroundImage: `url("${a.images[2].url}")`}}/>
                    <div>
                      <a className="text name" href={a.uri}>{a.name}</a>
                      <span className="text popularity">{a.popularity}%</span>
                    </div>
                  </div>
                ))
              }
            </div>)
          : '0 artists found for this account'
          : ''
      }
    </div>
  </>
};

export default Mainstream;
