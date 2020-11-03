import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import DoughnutChart from './DoughnutChart'
import toNum from '../toNum'

export default function SearchNav({data}){
    console.log(data)
    return(
        <h1>lolo</h1>
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
  
  