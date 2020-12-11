import React, {useState} from 'react';
import AccountSelector from "../components/AccountSelector";
import LastfmAPI from "../api/lastfm.js";
import LoadingBar from "../components/LoadingBar";
import Col from "react-bootstrap/esm/Col";
import {Form} from "react-bootstrap";

const TrackOrder = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [percent, setPercent] = useState(0)
  const [loadingText, setLoadingText] = useState('')
  const [filter, setFilter] = useState('PLAYCOUNT')
  const [userName, setUser] = useState(null)
  const [showArtist, setShowArtist] = useState(false)

  const onSelect = async ({method, data}) => {
    // try {
    //   const cache = JSON.parse(localStorage.getItem('cache-ao'))
    //   if (cache) return setData(cache)
    // } catch (e) {
    // }

    setLoading(true);
    setData(null)

    if (method === 'lastfm') {
      const {user} = data;
      setUser(user);
      setPercent(0);
      setLoadingText(`Loading tracks from ${user}...`);
      const {error, message, toptracks: tracks} = await LastfmAPI.getTopTracks(user, 400, 1);
      console.log(error, tracks);
      if (error) {
        setLoading(false);
        return setError(message);
      } else {
        if (!tracks.track.length) {
          setLoading(false);
          return setData({
            tracks: []
          })
        }
        const totalPages = Number(tracks['@attr'].totalPages);
        const percentFragment = 100 / totalPages
        console.log(percentFragment)
        const trackList = [...tracks.track.map(a => ({
          name: a.name,
          artist: a.artist ? a.artist.name : 'Unknown',
          playcount: Number(a.playcount),
          url: a.url
        }))]

        for (let i = 2; i < totalPages + 1; i++) {
          console.log(percentFragment * (i - 1))
          setPercent(~~(percentFragment * i))
          setLoadingText(`Loading tracks page ${i} of ${totalPages}...`);
          let result = await LastfmAPI.getTopTracks(user, 400, i);
          if (result.error) {
            return alert('Something wrong: ' + result.message)
          }
          trackList.push(...result.toptracks.track.map(a => ({
            name: a.name,
            artist: a.artist ? a.artist.name : 'Unknown',
            playcount: Number(a.playcount),
            url: a.url
          })))
        }

        setData(trackList)
        setLoading(false)
        handleChangeFilter(filter)()
      }
    }
  };

  const getPageLink = (url) => {
    const [,,,artistLinkComponent,,trackLinkComponent] = url.split('/')
    return `https://www.last.fm/user/${userName}/library/music/${artistLinkComponent}/_/${trackLinkComponent}`
  }

  const handleSwitch = ev => {
    setShowArtist(ev.target.checked)
  }

  const handleChangeFilter = select => () => {
    if (select === filter) return;
    if (select === 'PLAYCOUNT') {
      setData(data.sort((a, b) => b.playcount - a.playcount));
    } else {
      setData(data.sort((a, b) => a.name.localeCompare(b.name)));
    }
    setFilter(select);
  };

  return <>
    <AccountSelector spotify={true} onSelect={onSelect}
                     loading={loading} setLoading={setLoading}
                     error={error} setError={setError}
    />

    <Col>
      <div className="scaffold-section">
        {loading ?
          <LoadingBar percent={percent} text={loadingText}/>
          : ''
        }
        {
          data
            ? data.length
            ? (
              <div className="mainstream artist-order">
                <p>Total of <strong>{data.length}</strong> tracks</p>
                <div className="filterChooser">
                <span
                  className={`item ${filter === 'NAME' ? ' selected' : ''}`}
                  onClick={handleChangeFilter('NAME')}
                >ORDER BY NAME</span>
                  <span
                    className={`item ${filter === 'PLAYCOUNT' ? ' selected' : ''}`}
                    onClick={handleChangeFilter('PLAYCOUNT')}
                  >ORDER BY PLAYCOUNT</span>
                  <br />
                  <br />
                  <Form.Check type="checkbox" label="Show artist name (note that alphabetical order is based on track name)" onChange={handleSwitch} />
                  <br />
                  <p>Please note that changing the order may slow your device</p>
                </div>
                <div className="item">
                  <div>
                    <span className="text name">Track</span>
                  </div>
                  <span className="text popularity">Play count</span>
                </div>
                {
                  data.map((a, i) => (
                    <div className="item" key={i}>
                      <div>
                        <a
                          className="text name"
                          target="_blank"
                          rel="noopener noreferrer"
                          href={a.url}
                        >{i + 1}. {showArtist ? `${a.artist} - ` : ''}{a.name}</a>
                      </div>
                      <a
                        className="text popularity reset-link"
                        target="_blank"
                        rel="noopener noreferrer"
                        href={getPageLink(a.url)}
                      >{a.playcount}</a>
                    </div>
                  ))
                }
              </div>)
            : '0 tracks found for this account'
            : ''
        }
      </div>
    </Col>
  </>
};

export default TrackOrder;
