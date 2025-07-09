import React, { useState } from 'react';
import { isValidURL } from '../utils/validation';

const UrlShortenerForm = () => {
  const [urls, setUrls] = useState([{ longUrl: '', validity: '', shortcode: '' }]);
  const [results, setResults] = useState([]);

  const handleChange = (index, field, value) => {
    const newUrls = [...urls];
    newUrls[index][field] = value;
    setUrls(newUrls);
  };

  const addURLField = () => {
    if (urls.length < 5) {
      setUrls([...urls, { longUrl: '', validity: '', shortcode: '' }]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newResults = [];

    for (let urlData of urls) {
      const { longUrl, validity, shortcode } = urlData;

      if (!isValidURL(longUrl)) {
        alert(`Invalid URL: ${longUrl}`);
        return;
      }

      if (validity && isNaN(validity)) {
        alert(`Validity must be a number: ${validity}`);
        return;
      }

      const payload = {
        longUrl,
        validity: validity ? parseInt(validity) : 30,
        shortcode,
      };

      // Replace this with your logging middleware & real API call
      const fakeResponse = {
        original: payload.longUrl,
        short: `https://sho.rt/${payload.shortcode || Math.random().toString(36).substring(7)}`,
        expiry: new Date(Date.now() + payload.validity * 60000).toLocaleString()
      };

      newResults.push(fakeResponse);
    }

    setResults(newResults);
  };

  return (
    <div>
      <h2>Shorten URLs</h2>
      <form onSubmit={handleSubmit}>
        {urls.map((url, index) => (
          <div key={index} style={{ marginBottom: '15px' }}>
            <input
              type="text"
              placeholder="Long URL"
              value={url.longUrl}
              onChange={(e) => handleChange(index, 'longUrl', e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Validity (minutes)"
              value={url.validity}
              onChange={(e) => handleChange(index, 'validity', e.target.value)}
            />
            <input
              type="text"
              placeholder="Custom Shortcode"
              value={url.shortcode}
              onChange={(e) => handleChange(index, 'shortcode', e.target.value)}
            />
          </div>
        ))}
        {urls.length < 5 && <button type="button" onClick={addURLField}>Add Another</button>}
        <br />
        <button type="submit">Shorten</button>
      </form>

      {results.length > 0 && (
        <div>
          <h3>Results:</h3>
          <ul>
            {results.map((res, idx) => (
              <li key={idx}>
                <p>Original: {res.original}</p>
                <p>Short: <a href={res.short} target="_blank" rel="noreferrer">{res.short}</a></p>
                <p>Expires At: {res.expiry}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UrlShortenerForm;
