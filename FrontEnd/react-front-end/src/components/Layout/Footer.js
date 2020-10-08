import React, { Component } from 'react'
import { Navbar,Container, Col,ListGroup } from "react-bootstrap";
import "./Footer.css";

class Footer extends Component {

    render()
    {
        return(
            <div className = "fixed-bottom" style={{ margin: "0em 0em 0em", padding: "0em 0em" }}>
                <Navbar bg = "dark" variant ="light" className = "navbar-light text-center">
                    
                    <Container>
                        {/* <NavbarBrand > Footer</NavbarBrand>   */}
                        <Col className ="text-center" sm>
                            aaaaa
                        </Col>

                        <ListGroup variant = "flush">
                            <ListGroup.Item>Cras justo odio</ListGroup.Item>
                            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>    
               
                        </ListGroup>

  
                    </Container>
                    <div/>
                </Navbar>
            </div>
        )
    }

}

export default Footer;