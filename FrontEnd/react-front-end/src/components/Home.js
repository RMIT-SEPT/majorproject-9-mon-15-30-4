import React, { Component } from 'react'

import "bootstrap/dist/css/bootstrap.min.css"
import "../../node_modules/bootstrap/dist/css/bootstrap.css"
import {  Map, GoogleApiWrapper} from "google-maps-react";

import { Image,  Card, Button, Jumbotron, Col } from "react-bootstrap";
import RegisterButton from './Register/RegisterButton'
import "./Home.css"



const mapStyles =
{
    width: '100%',
    height: '100%'
}



class Home extends Component {

    state = {
        showInfoWind:true,
        activeMarker:{},
        selectedPlace: {}
    };

    onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };


    render() {
        return (
            <div className = "main">

                    <header className="masthead">
                        <div className="container">
                            <div className="intro-text">
                                <div className="intro-lead-in">BULK UP DES&TROY</div>
                                <div className="intro-heading text-uppercase">TRAIN YOUR WAY</div>
                            </div>
                        </div>
                    </header>

                    <section className="PageSectionServices" id="services">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12 text-center HeadersTitleContainer">
            
                                <h1 className="section-heading text-uppercase ">EQUIPMENT & FACILITIES</h1>
                                
                                <h3 className="section-subheading SubTitleHeaderH3">COME IN AND SEE OUR WIDE RANGE OF SERVICES</h3>
                                </div>
                            </div>

                        <Jumbotron>
                        <div className="row text-center">
                            
                            <div className="col-md-4">
                            <span className="fa-stack fa-4x">
                                <Image src ="./images/icon-coaching.png"/>
                            </span>
                            <h4 className="service-heading">TRAINING AND COACHING SERVICES</h4>
                            <p className="text-muted">Our Personal Trainers and Exercise Physiologists won’t hold back on giving you every piece of information that can make your body look, feel and perform better both in and out of the gym.</p>
                            </div>

                            <div className="col-md-4">
                            <span className="fa-stack fa-4x">
                                <Image src ="./images/icon-freeweights.png"/>
                            </span>
                            <h4 className="service-heading">STRENGTH/FREE WEIGHTS</h4>
                            <p className="text-muted">Build the ultimate lifestyle and body you want, with out wide range of free weight sections. Want to be the biggest squatter? Or just get back in shape? GymBros has all the things you need!</p>
                            </div>

                            <div className="col-md-4">
                            <span className="fa-stack fa-4x">
                                <Image src ="./images/icon-cardio.png"/>
                            </span>
                            <h4 className="service-heading">FITNESS CHALLENGES</h4>
                            <p className="text-muted">Reach your health and fitness goals with one of our awesome challenges! From national 8 week transformation challenges, to in gym team and individual battles designed to test strength and cardio ability, you'll be sure to see and feel the benefits when you take on a GymBros challenge!</p>
                            </div>      

                        </div>
                        </Jumbotron>
                        </div>
                        
                    </section>
                    
                    <section className="PageSectionAbout" id="about">
                        <div className="container">
                        <div className="row">
                            <div className="col-lg-12 text-center">
                                <h1 className="section-heading text-uppercase">About</h1>
                            </div>
                        </div>
                       
                        <div className = "contents">
                            <Col>
                            <Card 
                                    bg = "light"
                                    border = "dark"
                                    className = "CardInfoOntopImage" style={{width: '25rem'}}>
                                    <Card.Body>
                                        <Card.Title> 
                                            Interested? 
                                        </Card.Title>
                                        <ul></ul>

                                        <Card.Subtitle>ADDRESS</Card.Subtitle>
                                        <ul>
                                            <li> RMIT ROAD 3000</li>
                                        </ul>
                                        <Card.Subtitle>TELEPHONE</Card.Subtitle>
                                        <ul>
                                            <li> 047700783</li>
                                        </ul>
                                        <Card.Subtitle>EMAIL</Card.Subtitle>
                                        <ul>
                                            <li>CustomerService@GymBros.com.au</li>
                                        </ul>
                                        <Card.Subtitle>STAFFED HOURS</Card.Subtitle>
                                        <ul>
                                            <li>MONDAY: 10:30am - 7:00pm</li>
                                            <li>TUESDAY: 10:30am - 7:00pm</li>
                                            <li>WEDNESDAY: 10:30am - 7:00pm</li>
                                            <li>THURSDAY: 10:30am - 7:00pm</li>
                                            <li>FRIDAY: 10:30am - 7:00pm</li>
                                            <li>SATURDAY: 10:30am - 7:00pm</li>
                                        </ul>

            
                                    </Card.Body>
                                </Card>

                            </Col>
                            <Col >
                                <div className="ContainerMap">                            
                                    <Map
                                        google = {this.props.google}
                                        zoom = {14}
                                        style = {mapStyles}
                                        initialCenter = {
                                            {
                                            lat: -37.481679,
                                            lng: 144.572879,
                                            text:"124 La Trobe St, Melbourne VIC"
                                            }
                                        }
                                    />
                                
                            </div>

                            </Col>
                            </div>

                        </div>
                    </section>

                    

                    <section className="page-section" id="contact">
                        <div className="container">
                        <div className="row">
                            <div className="col-lg-12 text-center">
                            <h2 className="section-heading text-uppercase">Interested? Let's get in touch!</h2>
                            <h2 className="section-subheading">Explore new ways to challenge yourself with the right balance of training and motivation</h2>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-12 text-center">
                            <ul></ul>

                                <Button variant = "light">
                                        {<RegisterButton/>}
                                </Button>


                            </div>
                        </div>
                        </div>
                    </section>
                                        


                    <footer className="footer">
                        <div className="container">
                        <div className="row align-items-center text-center">
                            <div className="col-md-4">
                            <span className="copyright">Copyright &copy; 2020 GymBros</span>
                            </div>
                            <div className="col-md-4">
                                FOLLOW US ON SOCIAL
                            <ul className="list-inline social-buttons">
                                
                                <li className="list-inline-item AA">

                                </li>

                                <li className="list-inline-item AB">

                                </li>

                            </ul>
                            </div>
                            <div className="col-md-4">
                            <ul className="list-inline quicklinks">
                                <li className="list-inline-item">
                                <a href="#something">Privacy Policy</a>
                                </li>
                                <li className="list-inline-item">
                                <a href="#something">Terms of Use</a>
                                </li>
                            </ul>
                            </div>
                        </div>
                        </div>
                    </footer>
                </div>
  
            
        )
    }
}


export default GoogleApiWrapper({
    
})(Home);


