import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap'
// import NavBar from '../components/NavBar'
import 'mapbox-gl/dist/mapbox-gl.css'
import '../styles.css'
import Footer from '../components/Footer'


function MyApp({ Component, pageProps }) {
  return(
    <React.Fragment>
    {/* <NavBar /> */}
    <Container>
    <Component {...pageProps} />
    </Container>
    <Footer />
   </React.Fragment>
  ) 
}

export default MyApp
