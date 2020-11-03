
import Jumbotron from 'react-bootstrap/Jumbotron'
import {Row, Col, Card, Button} from 'react-bootstrap'

export default function Banner({ country, cases, criticals, deaths, recoveries,active }) {
   return (
       <Jumbotron className="px- py-3">
        <h1>{country}</h1>
       <Row>
            <Col lg={4} xs={12} className="p-1">
                <Card className="p-2 text-center">
                    <Card.Text>Total Cases: {cases}</Card.Text>
                </Card>
            </Col>
            <Col lg={4} xs={12} className="p-1">
                <Card className="p-2 text-center">
                    <Card.Text>Total Deaths: {deaths}</Card.Text>
                </Card>
            </Col>
            <Col lg={4} xs={12} className="p-1">
                <Card className="p-2 text-center">
                    <Card.Text>Recoveries: {recoveries}</Card.Text>
                </Card>
            </Col>
            <Col lg={6} xs={12} className="p-1">
                <Card className="p-2 text-center">
                    <Card.Text>Critical cases: {criticals}</Card.Text>
                </Card>
            </Col>
            <Col lg={6} xs={12} className="p-1">
                <Card className="p-2 text-center">
                    <Card.Text>Active cases: {active}</Card.Text>
                </Card>
            </Col>
       </Row>
           <Button variant="primary" href="/covid/countries">View Countries</Button>
       </Jumbotron>
   )
}