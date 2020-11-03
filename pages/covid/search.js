import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import DoughnutChart from '../../components/DoughnutChart'
import toNum from '../../toNum'

export default function Home({data}){
  const countriesStats = data.countries_stat
	const [targetCountry, setTargetCountry] = useState('')
	const [name, setName] = useState('')
	const [cases, setCases] = useState(0)
	const [criticals, setCriticals] = useState(0)
	const [deaths, setDeaths] = useState(0)
  const [recoveries, setRecoveries] = useState(0)

    function search(e){
        e.preventDefault()
        const match = countriesStats.find(country => country.country_name.toLowerCase() === targetCountry.toLowerCase() )
        console.log(match)
        setName(match.country_name)
        setCases(toNum(match.cases))
        setCriticals(toNum(match.serious_critical))
        setDeaths(toNum(match.deaths))
        setRecoveries(toNum(match.total_recovered))
    }
    
    return(
        <React.Fragment>
        <Form onSubmit={e => search(e)}>
            <Form.Group controlId="country">
                <Form.Label>Country</Form.Label>
                <Form.Control type="text" placeholder="search for country" value={targetCountry} onChange={e => setTargetCountry(e.target.value)}/>
                <Form.Text className="text-muted">
                    Get Covid-19 stats of search country.
                </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit">Submit</Button>
        </Form>

        <h1>Country: {name} </h1>
        <DoughnutChart cases={cases} criticals={criticals} deaths={deaths} recoveries={recoveries}/>
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
  
  