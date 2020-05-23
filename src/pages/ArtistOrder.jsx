import React, {useEffect, useState} from 'react';
import AccountSelector from "../components/AccountSelector";
import LastfmAPI from "../api/lastfm.js";
import LoadingBar from "../components/LoadingBar";
import MusicorumAPI from "../api/musicorum";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/esm/Col";

const ArtistOrder = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [percent, setPercent] = useState(0)
  const [loadingText, setLoadingText] = useState('')
  const [filter, setFilter] = useState('PLAYCOUNT')
  const [userName, setUser] = useState(null)

  const onSelect = async ({method, data}) => {
    try {
      const cache = JSON.parse(localStorage.getItem('cache-ao'))
      if (cache) return setData(cache)
    } catch (e) {
    }

    setLoading(true);
    setData(null)

    if (method === 'lastfm') {
      const {user} = data;
      setUser(user);
      setPercent(0);
      setLoadingText(`Loading artists from ${user}...`);
      const {error, message, artists} = await LastfmAPI.getLibraryArtists(user, 100, 1);
      console.log(error, artists);
      if (error) {
        setLoading(false);
        return setError(message);
      } else {
        if (!artists.artist.length) {
          setLoading(false);
          return setData({
            artists: []
          })
        }
        const totalPages = Number(artists['@attr'].totalPages);
        const percentFragment = 100 / totalPages
        console.log(percentFragment)
        const artistList = [...artists.artist]

        for (let i = 2; i < totalPages; i++) {
          console.log(percentFragment * (i - 1))
          setPercent(~~(percentFragment * i))
          setLoadingText(`Loading artists page ${i} of ${totalPages}...`);
          console.log('page ' + i)
          let result = await LastfmAPI.getLibraryArtists(user, 100, i);
          artistList.push(...result.artists.artist)
        }

        console.log(artistList)
        const value = artistList.map(a => ({
          name: a.name,
          playcount: Number(a.playcount),
          url: a.url
        }))
        localStorage.setItem('cache-ao', JSON.stringify(value))
        setData(value)
        setLoading(false)
        handleChangeFilter(filter)()

        // setPercent(50);
        // setLoadingText('Loading popularity...');
        // const artists = await MusicorumAPI.getMainstream(list);
        // setPercent(100)
        // setLoading(false)
        // const pops = artists.map(d => d.popularity)
        // const popAvg = (pops.reduce((a, b) => a + b, 0)) / pops.length
        // const value = {
        //   popAvg,
        //   artists
        // }
        // setData(value)
        // setLoading(false);
      }
    }
  };

  const getPageLink = (url) => {
    const artistLinkComponent = url.split('/')[4]
    return `https://www.last.fm/user/${userName}/library/music/${artistLinkComponent}`
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
                <p>Total of <strong>{data.length}</strong> arists</p>
                <div className="filterChooser">
                <span
                  className={`item ${filter === 'NAME' ? ' selected' : ''}`}
                  onClick={handleChangeFilter('NAME')}
                >ORDER BY NAME</span>
                  <span
                    className={`item ${filter === 'PLAYCOUNT' ? ' selected' : ''}`}
                    onClick={handleChangeFilter('PLAYCOUNT')}
                  >ORDER BY PLAYCOUNT</span>
                  <p>Please note that changing the order may slow your device</p>
                </div>
                <div className="item">
                  <div>
                    <a className="text name">Artist</a>
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
                        >{i + 1}. {a.name}</a>
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
            : '0 artists found for this account'
            : ''
        }
      </div>
    </Col>
  </>
};

export default ArtistOrder;
