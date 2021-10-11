import { useState } from 'react';
import ReactMapGL from 'react-map-gl';

const MAPBOX_TOKEN =
  'pk.eyJ1IjoiZGF2aXNnaXRvbmdhIiwiYSI6ImNrdW10cng2NTBuNnoyb3BmYWxwM3pua2gifQ.3C8VIDRfN1Xz3HIXX6DTbw';

export default function Map() {
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '500px',
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 13
  });

  return (
    <ReactMapGL
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxApiAccessToken={MAPBOX_TOKEN}
      {...viewport}
      onViewportChange={(viewport) => setViewport(viewport)}
    />
  );
}
