import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
mapboxgl.accessToken = 'pk.eyJ1IjoibGFtamlsYW1wYWdvIiwiYSI6ImNrZnpjbjRvaDBiOGUydG9iZzFpMXVubnoifQ.OB02jXjeregqO3TB-t7uhA'
import { Line } from 'react-chartjs-2'
import toNum from '../../toNum'
import { Row, Col, Jumbotron, Card } from 'react-bootstrap'

export default function top({data}){
    const mapContainerRef = useRef(null)
    const countriesStats = data.countries_stat
    const countriesCases = countriesStats.map(countryStat => {
        return{
            name: countryStat.country_name,
            cases: toNum(countryStat.cases),
            active:countryStat.cases
        }
    })

    countriesCases.sort((a,b) => {
        if(a.cases < b.cases){
            return 1
        }else if(a.cases > b.cases){
            return -1
        }else{
            return 0 
        }
    })
    
    useEffect(() => {
      const map = new mapboxgl.Map({
          container: mapContainerRef.current,
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [44.63, 28.77],
          zoom: 0
        })
        map.addControl(new mapboxgl.NavigationControl(), 'bottom-right')
       
        for(let i = 0; i < 10; i++){
          fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${countriesCases[i].name}.json?access_token=${mapboxgl.accessToken}`)
          .then(res => res.json())
          .then(data => {
             new mapboxgl.Marker()
              .setLngLat([data.features[0].center[0], data.features[0].center[1]])
              .addTo(map)
          })
        }

        return() => map.remove()
  }, [])

    return(
        <React.Fragment>
        <Jumbotron className="mt-3 Jumbotron">
        <h1 className="text-center light py-3"></h1>
        </Jumbotron>
            
            <Row className="my-5 mx-0">
              <Col lg={6} sm={12}>
              <Line data={{
                datasets: [{
                data: [countriesCases[0].cases, countriesCases[1].cases, countriesCases[2].cases, countriesCases[3].cases, countriesCases[4].cases, countriesCases[5].cases, countriesCases[6].cases, countriesCases[7].cases, countriesCases[8].cases, countriesCases[9].cases],
                label: 'Top 10 Countries',
                backgroundColor: ["#ff0000", "#f8c471", "#7fe5f0", "#aeb6bf", "#00ff00", "#ff80ed", "#f08080", "#7d3c98", "#407294", "#065535"]
                }],
                labels: [countriesCases[0].name, countriesCases[1].name, countriesCases[2].name, countriesCases[3].name, countriesCases[4].name, countriesCases[5].name, countriesCases[6].name, countriesCases[7].name, countriesCases[8].name, countriesCases[9].name]
            }} redraw={ false }/>
              </Col>
              <Col lg={6} sm={12}>
              <div>
                <h5 className=" text-center p-2">Total Cases</h5>
                <Row className="m-0">
                  <Col className="p-1">
                    <Card className="text-center p-2 one text-white">
                      <h6 className="mb-0">{countriesCases[0].name}</h6>
                      <p className="mb-0">{countriesCases[0].active}</p>
                    </Card>
                  </Col>
                  <Col className="p-1">
                    <Card className="text-center p-2 two text-dark">
                      <h6 className="mb-0">{countriesCases[1].name}</h6>
                      <p className="mb-0">{countriesCases[1].active}</p>
                    </Card>
                  </Col>
                  <Col className="p-1">
                    <Card className="text-center p-2 three text-dark">
                      <h6 className="mb-0">{countriesCases[2].name}</h6>
                      <p className="mb-0">{countriesCases[2].active}</p>
                    </Card>
                  </Col>
                </Row>

                <Row className="m-0">
                  <Col className="p-1">
                    <Card className="text-center p-2 four text-dark">
                      <h6 className="mb-0">{countriesCases[3].name}</h6>
                      <p className="mb-0">{countriesCases[3].active}</p>
                    </Card>
                  </Col>
                  <Col className="p-1">
                    <Card className="text-center p-2 five text-dark">
                      <h6 className="mb-0">{countriesCases[4].name}</h6>
                      <p className="mb-0">{countriesCases[4].active}</p>
                    </Card>
                  </Col>
                  <Col className="p-1">
                    <Card className="text-center p-2 six text-white">
                      <h6 className="mb-0">{countriesCases[5].name}</h6>
                      <p className="mb-0">{countriesCases[5].active}</p>
                    </Card>
                  </Col>
                </Row>

                <Row className="m-0">
                  <Col className="p-1">
                    <Card className="text-center p-2 seven text-white">
                      <h6 className="mb-0">{countriesCases[6].name}</h6>
                      <p className="mb-0">{countriesCases[6].active}</p>
                    </Card>
                  </Col>
                  <Col className="p-1">
                    <Card className="text-center p-2 eight text-white">
                      <h6 className="mb-0">{countriesCases[7].name}</h6>
                      <p className="mb-0">{countriesCases[7].active}</p>
                    </Card>
                  </Col>
                  <Col className="p-1">
                    <Card className="text-center p-2 nine text-white">
                      <h6 className="mb-0">{countriesCases[8].name}</h6>
                      <p className="mb-0">{countriesCases[6].active}</p>
                    </Card>
                  </Col>
                  <Col className="p-1">
                    <Card className="text-center p-2 ten text-white">
                      <h6 className="mb-0">{countriesCases[9].name}</h6>
                      <p className="mb-0">{countriesCases[9].active}</p>
                    </Card>
                  </Col>
                </Row>
              </div>
              </Col>
            </Row>
            <Card className="mb-3 p-4">
              <div className="mapContainer" ref={mapContainerRef}></div>
            </Card>
        </React.Fragment>
    )
  }

// ito ginagawa pag nagtawag ng data sa ibang api
export async function getStaticProps(){
    const res = await fetch('https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php', {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
        "x-rapidapi-key": "a4d1a76a25mshe13d3648a521ee0p165f27jsn7622774b722c"
      }
    })
      const data = await res.json()
      return{
        props: {
          data
        }
      }
  }
  