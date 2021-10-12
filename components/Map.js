import { useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import Image from 'next/image';

const MAPBOX_TOKEN =
  'pk.eyJ1IjoiZGF2aXNnaXRvbmdhIiwiYSI6ImNrdW10cng2NTBuNnoyb3BmYWxwM3pua2gifQ.3C8VIDRfN1Xz3HIXX6DTbw';

export default function Map({ lat, long }) {
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '350px',
    latitude: lat,
    longitude: long,
    zoom: 13
  });

  return (
    <ReactMapGL
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxApiAccessToken={MAPBOX_TOKEN}
      {...viewport}
      onViewportChange={(viewport) => setViewport(viewport)}
    >
      <Marker latitude={lat} longitude={long} offsetLeft={-20} offsetTop={-10}>
        <span role="img" aria-label="push-pin">
          <Image src="/map-pin.svg" alt="map pin" width={40} height={40} />
        </span>
      </Marker>
    </ReactMapGL>
  );
}
