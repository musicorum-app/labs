import React, {useState} from 'react';
import AccountSelector from "../components/AccountSelector.jsx";
import LastfmAPI from "../api/lastfm.js";

const Mainstream = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const onSelect = async ({method, data}) => {
    setLoading(true);
    if (method === 'lastfm') {
      const {user} = data;
      const {error, message, topartists} = await LastfmAPI.getTopArtists(user);
      console.log(error, topartists)
      if (error) {
        setLoading(false);
        return setError(message);
      } else {
        setData(topartists)
      }
      setLoading(false);
    }
  };

  return <>
    <AccountSelector spotify={true} onSelect={onSelect}
                     loading={loading} setLoading={setLoading}
                     error={error} setError={setError}
    />

    <div className="scaffold-section">
      {data ?
        data.artist.map(({name}) => <p>{name}</p>)
        : ''}
    </div>
  </>
};

export default Mainstream;
