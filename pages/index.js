import toNum from '../toNum'
import numberWithCommas from '../toString'
import  { Jumbotron, Form, Button, Row, Col, Card }from 'react-bootstrap'
import mapboxgl from 'mapbox-gl'
mapboxgl.accessToken = 'pk.eyJ1IjoibGFtamlsYW1wYWdvIiwiYSI6ImNrZnpjbjRvaDBiOGUydG9iZzFpMXVubnoifQ.OB02jXjeregqO3TB-t7uhA'
import { useState, useRef, useEffect } from 'react'
import DoughnutChart from '../components/DoughnutChart'
import { Line } from 'react-chartjs-2'

export default function Home({data}){
  const countriesStats = data.countries_stat
	const [targetCountry, setTargetCountry] = useState('Philippines')
	const [name, setName] = useState('')
	const [cases, setCases] = useState(0)
	const [criticals, setCriticals] = useState(0)
	const [deaths, setDeaths] = useState(0)
  const [recoveries, setRecoveries] = useState(0)
  const [active, setActive] = useState(0)
  const mapContainerRef = useRef()

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

  const [latitude, setLatitude] = useState(12.8797)
  const [longtitude, setLongtitude] = useState(121.7740)

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/dark-v10',
      center: [longtitude,latitude],
      zoom: 3
    })
    map.addControl(new mapboxgl.NavigationControl(), 'bottom-right')
    const marker = new mapboxgl.Marker()
    .setLngLat([longtitude, latitude])
    .addTo(map)

    return() => map.remove()
  }, [latitude, longtitude])

    let total = 0
    countriesStats.forEach(country => {
      total += toNum(country.cases)
    })
     const globalTotal = {
      cases: numberWithCommas(total),
    }

    function search(e){
        e.preventDefault()
        const skorea = "South Korea"
        if(targetCountry === skorea.toLocaleLowerCase()){
          const sample = targetCountry.replace(targetCountry, "S. Korea")
          const match = countriesStats.find(country => country.country_name === sample)
          if(match){
            setName(match.country_name)
            setCases(toNum(match.cases))
            setCriticals(toNum(match.serious_critical))
            setDeaths(toNum(match.deaths))
            setRecoveries(toNum(match.total_recovered))
            setActive(toNum(match.active_cases))
            setTargetCountry("")
            console.log(match)
          }
          fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${targetCountry}.json?access_token=${mapboxgl.accessToken}`)
          .then(res => res.json())
          .then(data => {
            setLongtitude(data.features[0].center[0])
            setLatitude(data.features[0].center[1])
          })
        }else{
          const match = countriesStats.find(country => country.country_name.toLowerCase() === targetCountry.toLowerCase())
        if(match){
          setName(match.country_name)
          setCases(toNum(match.cases))
          setCriticals(toNum(match.serious_critical))
          setDeaths(toNum(match.deaths))
          setRecoveries(toNum(match.total_recovered))
          setActive(toNum(match.active_cases))
          setTargetCountry("")
          console.log(match)

          fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${targetCountry}.json?access_token=${mapboxgl.accessToken}`)
          .then(res => res.json())
          .then(data => {
            setLongtitude(data.features[0].center[0])
            setLatitude(data.features[0].center[1])
          })

        }else{
          alert("Sorry not found. Check the keyword!")
        }
        }
    }
    return(
        <React.Fragment>
      {/* Search Data */}
        <Card className="search-Holder">
          <h6><b>COVID-19 TRACKER</b></h6>
          <Form onSubmit={e => search(e)}>
            <Form.Group controlId="country">
                <Form.Control type="text" placeholder="search for country" value={targetCountry} onChange={e => setTargetCountry(e.target.value)} required/>
            </Form.Group>
            <Button className="search-Button py-1" type="submit">Search</Button>
          </Form>
          <p className="mb-0 py-2">Country Name: {name}</p>
          <Row className="m-0">
            <Col md={8} xs={12} className="text-10">
              <DoughnutChart updated={data.statistic_taken_at} cases={cases} criticals={criticals} deaths={deaths} recoveries={recoveries} active={active}/>
            </Col>
            <Col md={4} xs={12} className="p-0">

            <Row className="m-0 pt-2">
              <Col md={6} xs={6} className="text-left">
               <p className="mb-0 p-0">Cases</p> 
              </Col>
              <Col md={6} xs={6} className="text-left p-0 pr-2">
              <p className=" p-0 mb-0">{numberWithCommas(cases)}</p>
              </Col>
            </Row>
            <Row className="m-0 pt-2">
              <Col md={6} xs={6} className="text-left">
               <p className="mb-0 p-0">Recoveries</p> 
              </Col>
              <Col md={6} xs={6} className="text-left p-0 pr-2">
              <p className=" p-0 mb-0">{numberWithCommas(recoveries)}</p>
              </Col>
            </Row>
            <Row className="m-0 pt-2">
              <Col md={6} xs={6} className="text-left">
               <p className="mb-0 p-0">Active</p> 
              </Col>
              <Col md={6} xs={6} className="text-left p-0 pr-2">
              <p className=" p-0 mb-0">{numberWithCommas(active)}</p>
              </Col>
            </Row>
            <Row className="m-0 pt-2">
              <Col md={6} xs={6} className="text-left">
               <p className="mb-0 p-0">Deaths</p> 
              </Col>
              <Col md={6} xs={6} className="text-left p-0 pr-2">
              <p className=" p-0 mb-0">{numberWithCommas(deaths)}</p>
              </Col>
            </Row>
            <Row className="m-0 pt-2">
              <Col md={6} xs={6} className="text-left">
               <p className="mb-0 p-0">Criticals</p> 
              </Col>
              <Col md={6} xs={6} className="text-left p-0 pr-2">
              <p className=" p-0 mb-0">{numberWithCommas(criticals)}</p>
              </Col>
            </Row>
            <Row className="m-0 pt-2">
              <Col md={6} xs={6} className="text-left">
               <p className="mb-0 p-0">Criticals</p> 
              </Col>
              <Col md={6} xs={6} className="text-left p-0 pr-2">
              <p className=" p-0 mb-0">{numberWithCommas(criticals)}</p>
              </Col>
            </Row>

            </Col>
          </Row>
          
        </Card>
            <div className="mapContainer mt-5" ref={mapContainerRef} />
            {/* Right Data */}
            <Card style={{ width: '20rem' }}>
            <p className="mb-0">World wide: </p>
            <h4 className=" p-0 mb-0">{globalTotal.cases}</h4>
            <hr />
            <div className="text-white">
            <Line data={{
                datasets: [{
                data: [countriesCases[0].cases, countriesCases[1].cases, countriesCases[2].cases, countriesCases[3].cases, countriesCases[4].cases, countriesCases[5].cases, countriesCases[6].cases, countriesCases[7].cases, countriesCases[8].cases, countriesCases[9].cases],
                label: 'Top 10 Countries',
                backgroundColor: ["#ff0000", "#f8c471", "#7fe5f0", "#aeb6bf", "#00ff00", "#ff80ed", "#f08080", "#7d3c98", "#407294", "#065535"]
                }],
                labels: [countriesCases[0].name, countriesCases[1].name, countriesCases[2].name, countriesCases[3].name, countriesCases[4].name, countriesCases[5].name, countriesCases[6].name, countriesCases[7].name, countriesCases[8].name, countriesCases[9].name]
            }} redraw={ false }/>
            </div>
            <p className="pt-3 text-center">Top 10 Country</p>
            <div className="top10-Holder">
              <Row className="m-0 pt-3 ">
                <Col md={6} xs={6} className="text-left">
                  1. {countriesCases[0].name}
                </Col>
                <Col md={6} xs={6} className="text-left p-0 pr-2">
                 Total Cases {countriesCases[0].active}
                </Col>
              </Row>
              <Row className="m-0 pt-2">
                <Col md={6} xs={6} className="text-left">
                  2. {countriesCases[1].name}
                </Col>
                <Col md={6} xs={6} className="text-left p-0 pr-2">
                 Total Cases {countriesCases[1].active}
                </Col>
              </Row>
              <Row className="m-0 pt-2">
                <Col md={6} xs={6} className="text-left">
                  3. {countriesCases[2].name}
                </Col>
                <Col md={6} xs={6} className="text-left p-0 pr-2">
                 Total Cases {countriesCases[2].active}
                </Col>
              </Row>
              <Row className="m-0 pt-2">
                <Col md={6} xs={6} className="text-left">
                  4. {countriesCases[3].name}
                </Col>
                <Col md={6} xs={6} className="text-left p-0 pr-2">
                 Total Cases {countriesCases[3].active}
                </Col>
              </Row>
              <Row className="m-0 pt-2">
                <Col md={6} xs={6} className="text-left">
                  5. {countriesCases[4].name}
                </Col>
                <Col md={6} xs={6} className="text-left p-0 pr-2">
                 Total Cases {countriesCases[4].active}
                </Col>
              </Row>
              <Row className="m-0 pt-2">
                <Col md={6} xs={6} className="text-left">
                  6. {countriesCases[5].name}
                </Col>
                <Col md={6} xs={6} className="text-left p-0 pr-2">
                 Total Cases {countriesCases[5].active}
                </Col>
              </Row>
              <Row className="m-0 pt-2">
                <Col md={6} xs={6} className="text-left">
                  7. {countriesCases[6].name}
                </Col>
                <Col md={6} xs={6} className="text-left p-0 pr-2">
                 Total Cases {countriesCases[6].active}
                </Col>
              </Row>
              <Row className="m-0 pt-2">
                <Col md={6} xs={6} className="text-left">
                  8. {countriesCases[7].name}
                </Col>
                <Col md={6} xs={6} className="text-left p-0 pr-2">
                 Total Cases {countriesCases[7].active}
                </Col>
              </Row>
              <Row className="m-0 pt-2">
                <Col md={6} xs={6} className="text-left">
                  9. {countriesCases[8].name}
                </Col>
                <Col md={6} xs={6} className="text-left p-0 pr-2">
                 Total Cases {countriesCases[8].active}
                </Col>
              </Row><Row className="m-0 pt-2">
                <Col md={6} xs={6} className="text-left">
                  10. {countriesCases[9].name}
                </Col>
                <Col md={6} xs={6} className="text-left p-0 pr-2">
                 Total Cases {countriesCases[9].active}
                </Col>
              </Row>
            </div>
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

