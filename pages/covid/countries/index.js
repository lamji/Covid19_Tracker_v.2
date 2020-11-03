import { Doughnut } from 'react-chartjs-2'
import { ListGroup, Row, Col } from 'react-bootstrap'
import Link from 'next/link'

export default function top({data}){
    const countriesStats = data.countries_stat
    const countriesList = countriesStats.map(country => {
        return(
          <Col lg={3} sm={4} className="my-2">
               <ListGroup.Item className="text-center p-3" key={country.country_name}>
            <Link href={`/covid/countries/${country.country_name.replace( /\s/g, '')}`}>
              <a >{country.country_name}</a>
            </Link>
           </ListGroup.Item>
          </Col>
         
        )
    })
        return(
            <React.Fragment>
            <Row >
            {countriesList}
            </Row>
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
  