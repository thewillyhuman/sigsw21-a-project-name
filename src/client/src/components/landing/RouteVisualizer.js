import { useEffect,useState,useContext} from "react";
import {Row,Col,Container} from 'react-bootstrap';
import Map from '../map/Map';
import '../../css/planificate.css'
import {LandingContext} from '../LandingPage';

function RouteVisualizer(){


    const context = useContext(LandingContext);
    const [days,setDays] = useState(null);

    useEffect(()=>{
        console.log(context.route)
        setDays(context.route?.route?.route_stages)
    },context.route)
    
    return(
        <Container fluid className="planificate-body">
            <Row>
                <Col md={3}>
                    <div className="days-panel">
                        <div className="place">
                        {
                            context.route?.route?.route_stages.map(day =>{
                                return(
                                    <>
                                        <div className="place-name">
                                            <ul>
                                                <li>Ocebreiro</li>
                                                <li>Liñares</li>
                                                <li>Hospital</li>
                                                <li>Padornelo</li>
                                                <li>Fondría</li>
                                            </ul>
                                        </div>
                                        <div className="place-day">
                                            <ul>
                                                <li>Dia 1</li>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                            </ul>
                                        </div>
                                    </>
                                )
                            })
                        }
                        </div>
                    </div>
                </Col>
                <Col md>
                    <div className="day-container">
                        <Row>
                            <Col>
                                <div className="map-panel">
                                    <Map route="camino_frances" route_style="cs.frances" />
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row> 
        </Container>
    )
}

export default RouteVisualizer;

/*


              <Row>
                            <Col>
                                <div className="day-panel">
                                    <div className="day-panel-sub">
                                    <h2>Día 1 - Obreiro</h2> 
                                        
                                    </div>
                                    
                                </div>
                            </Col>
                        </Row>

<div className="place-dot">
                                <div className="dot-line">
                                    <div className="dot">
                                    </div>
                                    
                                </div>
                            </div>*/

/*
 <Container  className="planificate-body">
            <Row>
                <Col md>
                    <div className="days-panel"><p>Days Panel</p></div>
                </Col>
                <Col>
                    <Container   className="planificate-body-col2">
                        <Row>
                            <div className="info-day-panel"><p>Info Day Panel</p></div>
                        </Row> 
                        <Row>
                            <div className="map-panel"><p>Map</p></div>
                        </Row> 
                    </Container>
                </Col>
            </Row> 
        </Container>*/