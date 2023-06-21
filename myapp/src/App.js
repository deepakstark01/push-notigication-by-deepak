
import React, { useState, useEffect } from 'react';
import './App.css';

import addNotification from 'react-push-notification';
import { Notifications } from 'react-push-notification';

function App() {
  const [ facts, setFacts ] = useState([]);
  const [ listening, setListening ] = useState(false);

  const buttonClick = () => {
    addNotification({
        title: 'Warning',
        subtitle: 'This is a subtitle',
        message: 'This is a very long message',
        theme: 'darkblue',
        native: true 
    });
    console.log('notificatpn revieved')
};

  useEffect( () => {
    if (!listening) {
      const events = new EventSource('http://localhost:3001/events');

      events.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);
        console.log(parsedData)

        setFacts((facts) => facts.concat(parsedData));
        buttonClick();
      };

      setListening(true);
    }
  }, [listening, facts]);

  return (
    <>
    <Notifications />
    <table className="stats-table">
      <thead>
        <tr>
          <th>Fact</th>
          <th>Source</th>
        </tr>
      </thead>
      <tbody>
        {
          facts.map((fact, i) =>
            <tr key={i}>
              <td>{fact.info}</td>
              <td>{fact.source}</td>
            </tr>
          )
        }
      </tbody>
    </table>
    </>
  );
}

export default App;