import { Navbar, Nav } from 'react-bootstrap'
import Link from 'next/link'

export default function NavBar(){
    return (
        <>
     	<Navbar className="head py-3 " expand="lg">
		  <Link href="/">
	      	<a className="navbar-brand text-white ">Covid-19 Tracker</a>
	      </Link>
		  <Navbar.Toggle aria-controls="basic-navbar-nav" />
		  <Navbar.Collapse id="basic-navbar-nav">
		    <Nav className="ml-auto">
			  <Link href="/covid/top">
		      	<a className="nav-link text-white" role="button">Top Countries</a>
		      </Link>
			  <Link href="/covid/countries">
		      	<a className="nav-link text-white" role="button">Infected Countries</a>
		      </Link>
		    </Nav>
		  </Navbar.Collapse>
		</Navbar>
      </>
    )

}