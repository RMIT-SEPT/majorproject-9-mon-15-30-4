import React, { Component } from 'react'

import "bootstrap/dist/css/bootstrap.min.css"

import { Container, Image, Row, Card, Button , Jumbotron} from "react-bootstrap";
import RegisterButton from './Register/RegisterButton'
import "./Home.css"





class Home extends Component {
    render() {
        return (
                <Container className = "noPadding" fluid>
                  
                    <Image src = "./images/image-front-header.jfif" className = "PImageFrontHeader" fluid />

                      
                      <Row className = "firstRow">
                        <Card 
                            bg = "light"
                            border = "dark"
                            className = "CardInfoOntopImage" style={{width: '18rem'}}>
                            <Card.Body>
                                <Card.Title> 
                                    GET STARTED WITH GYMBROS 
                                </Card.Title>

                                <Card.Text>
                                    Summer is coming whicih can only mean one thing! It's time to dust off old Mes and Moy, and join Gymbros. 
                                    Plus with the freedom of a no lock in contract, you'll destroy your results in no time! Sign up in club or online today.
                                </Card.Text>

                                <Button 
                                variant = "outline-dark"
                                >
                                    {<RegisterButton/>}
                                </Button>
                            </Card.Body>
                        </Card>
           

                    </Row>
                    <Row>
           
                    </Row>
                    
                </Container>
  



            
        )
    }
}
export default Home;