import React, { Component } from 'react'

import "bootstrap/dist/css/bootstrap.min.css"
import "../../node_modules/bootstrap/dist/css/bootstrap.css"

import { Image, Row, Card, Button, Container } from "react-bootstrap";
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
                                    Summer is coming which can only mean one thing! It's time to dust off old Mes and Moy, and join Gymbros. 
                                    Plus with the freedom of a no lock in contract, you'll destroy your results in no time! Sign up in club or online today.
                                </Card.Text>

                                <Button variant = "outline-dark">
                                    {<RegisterButton/>}
                                </Button>
                            </Card.Body>
                        </Card>




                        </Row>
                    


                  
                    
                </Container>
  



            
        )
    }
}
export default Home;


// import { Container } from "semantic-ui-react";


// const Home = () => (
//   <Container text className ="MainContainer">
//     <h1>This is our homepage</h1>
//     <p>
//       Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius magni
//       laborum fugit beatae quaerat alias ipsa accusamus, ipsam nostrum quam
//       dignissimos nesciunt, cum sequi consequuntur accusantium reprehenderit
//       temporibus cumque. Aspernatur.
//     </p>

    
//   </Container>
// );

// export default Home;
