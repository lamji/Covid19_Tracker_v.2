import { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
mapboxgl.accessToken = 'pk.eyJ1IjoibGFtamlsYW1wYWdvIiwiYSI6ImNrZnpjbjRvaDBiOGUydG9iZzFpMXVubnoifQ.OB02jXjeregqO3TB-t7uhA'

export default function GlobalMap({country}){
    const mapContainerRef = useRef(null)
    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)


    useEffect(() => {
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${country}.json?access_token=${mapboxgl.accessToken}`)
          .then(res => res.json())
          .then(data => {
            setLongitude(data.features[0].center[0])
            setLatitude(data.features[0].center[1])
          })

        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [longitude, latitude],
            zoom: 2
          })
          map.addControl(new mapboxgl.NavigationControl(), 'bottom-right')
          const marker = new mapboxgl.Marker()
          .setLngLat([longitude, latitude])
          .addTo(map)
      
          return() => map.remove()
    }, [latitude, longitude])
    
    return <div className="mapContainer" ref={mapContainerRef}></div>
}