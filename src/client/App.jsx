import React, { useEffect, useMemo, useState } from 'react';
import moment from 'moment';
import { GoogleMap, OverlayView, useLoadScript } from '@react-google-maps/api';
import './app.css';
import MapMarkerPin from './components/MapMarkerPin';

const DEFAULT_CENTER = {
  lat: -32.9269165,
  lng: 151.7607144,
};

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const App = () => {
  const [trips, setTrips] = useState([]);
  const [mapInstance, setMapInstance] = useState(null);
  const [selectedDate, setSelectedDate] = useState({});
  const [tripsOnSelectedData, settripsOnSelectedData] = useState([]);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: '',
  });

  const onMapLoad = (map) => {
    setMapInstance(map);
  };

  useEffect(() => {
    fetch('/api/getTrips')
      .then((res) => res.json())
      .then((res) => setTrips(res.trips));
  }, []);

  const onButtonClick = (selectedDate) => {
    setSelectedDate(selectedDate);
    let filteredTrips = trips.filter(
      (trip) =>
        new Date(selectedDate.createdAt).getDate() + new Date(selectedDate.createdAt).getMonth() ===
        new Date(trip.createdAt).getDate() + new Date(trip.createdAt).getMonth(),
    );
    settripsOnSelectedData(filteredTrips);
  };

  return (
    <div>
      {isLoaded && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <GoogleMap
            center={DEFAULT_CENTER}
            onLoad={onMapLoad}
            mapContainerStyle={{
              height: '100vh',
              width: '50%',
            }}
            zoom={16}
          >
            {tripsOnSelectedData.length > 0 ? (
              tripsOnSelectedData.map((trip) =>
                trip.stops.map((stop) => {
                  return (
                    <OverlayView
                      key={stop.id}
                      position={{
                        lat: stop.address.latitude,
                        lng: stop.address.longitude,
                      }}
                      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                    >
                      <MapMarkerPin type={stop.type} />
                    </OverlayView>
                  );
                }),
              )
            ) : (
              <OverlayView
                key={`example_marker_overlay`}
                position={{
                  lat: DEFAULT_CENTER.lat,
                  lng: DEFAULT_CENTER.lng,
                }}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
              >
                <MapMarkerPin type={stop.type} />
              </OverlayView>
            )}
          </GoogleMap>
          <div style={{ width: '50%' }}>
            <div>
              <h2>
                Date: {new Date(selectedDate.createdAt).getDate() + 'th ' + monthNames[new Date(selectedDate.createdAt).getMonth()]} No of
                Trips: {tripsOnSelectedData.length}
              </h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {trips.map((trip) => {
                return (
                  <button
                    onClick={() => onButtonClick(trip)}
                    style={{ width: '100px', height: '30px', margin: '10px', background: 'black', border: 'none', color: 'white' }}
                  >
                    {new Date(trip.createdAt).getDate() + 'th ' + monthNames[new Date(trip.createdAt).getMonth()]}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
