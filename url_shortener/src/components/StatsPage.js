import React from 'react';

const StatsPage = () => {
  // Dummy data; replace with real API data later
  const urls = [
    {
      short: 'https://sho.rt/abc123',
      createdAt: '2025-07-09 09:00 AM',
      expiresAt: '2025-07-09 09:30 AM',
      clicks: 5,
      logs: [
        { time: '09:05', source: 'Chrome', location: 'Bangalore' },
        { time: '09:10', source: 'Firefox', location: 'Hyderabad' }
      ]
    }
  ];

  return (
    <div>
      <h2>Statistics</h2>
      {urls.map((url, idx) => (
        <div key={idx} style={{ marginBottom: '20px' }}>
          <p>Short URL: <a href={url.short}>{url.short}</a></p>
          <p>Created At: {url.createdAt}</p>
          <p>Expires At: {url.expiresAt}</p>
          <p>Click Count: {url.clicks}</p>
          <h4>Click Logs:</h4>
          <ul>
            {url.logs.map((log, i) => (
              <li key={i}>{log.time} - {log.source} - {log.location}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default StatsPage;
