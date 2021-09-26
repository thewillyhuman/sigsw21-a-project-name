import { useEffect,useState,useContext} from "react";
import {Row,Col,Container,Accordion,useAccordionButton} from 'react-bootstrap';
import Map from '../map/Map';
import '../../css/planificate.css'
import {LandingContext} from '../LandingPage';
import {scroller } from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock,faRunning } from '@fortawesome/free-solid-svg-icons'

function RouteVisualizer(){

    const context = useContext(LandingContext);

    function CustomToggle({ children, eventKey}) {
        const decoratedOnClick = useAccordionButton(eventKey, () =>
          console.log('Hola Alejandro, espero que sepas lo que haces!'),
        );
      
        return (
          <button
            type="button"
            className="accordion-button collapsed"
            style={{ width: '100%' }}
            onClick={decoratedOnClick}
          >
            {children}
          </button>
        );

      }

    return(
        <div  className="planificate-body">
        
                    <Accordion flush defaultActiveKey={0} className="route-acordion" >
                                {
                                    context.route?.route?.route_stages?.map((day,index)=>{
                                        return(
                                    <Accordion.Item  onClick={console.log('onblcikk')}  className="route-acordion-item" eventKey={index} key={index}>
                                        <CustomToggle eventKey={index}>Día {index+1} <FontAwesomeIcon icon={faRunning} /> {Math.round(day?.distance/1000)}Km  <FontAwesomeIcon icon={faClock} />  {day?.duration}h</CustomToggle>
                                        <Accordion.Body className="route-acordion-body">
                                            <div className="days-panel">
                                                <div className="place">
                                                    <div className="place-name">
                                                        <ul>
                                                            {day?.route_locations?.map((place,i)=>{
                                                                return (<li key={i}>{place?.split(',')[0]?.substring(6)}</li>)
                                                            })}
                                                        </ul>
                                                    </div>
                                                    <div className="place-day">
                                                        <ul>
                                                        {day?.route_locations?.map((place,i)=>{
                                                                return (<li key={i}></li>)
                                                            })}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </Accordion.Body>
                                  </Accordion.Item>
                        
                                        )
                                    })
                                    
                                }
                                    
                                    
                                   

                    </Accordion>
             
                    <div className="map-panel">
                        <Map route="camino_frances" route_style="cs.frances" />
                    </div>
            </div>
    )
}

export default RouteVisualizer;

/**
 *  <Accordion.Item   className="route-acordion-item-hidden" >
                                        <Accordion.Header></Accordion.Header>
                                    </Accordion.Item>
                                    <Accordion.Item   className="route-acordion-item-hidden" >
                                        <Accordion.Header></Accordion.Header>
                                    </Accordion.Item><Accordion.Item   className="route-acordion-item-hidden" >
                                        <Accordion.Header></Accordion.Header>
                                    </Accordion.Item><Accordion.Item   className="route-acordion-item-hidden" >
                                        <Accordion.Header></Accordion.Header>
                                    </Accordion.Item><Accordion.Item   className="route-acordion-item-hidden" >
                                        <Accordion.Header></Accordion.Header>
                                    </Accordion.Item><Accordion.Item   className="route-acordion-item-hidden" >
                                        <Accordion.Header></Accordion.Header>
                                    </Accordion.Item><Accordion.Item   className="route-acordion-item-hidden" >
                                        <Accordion.Header></Accordion.Header>
                                    </Accordion.Item><Accordion.Item   className="route-acordion-item-hidden" >
                                        <Accordion.Header></Accordion.Header>
                                    </Accordion.Item><Accordion.Item   className="route-acordion-item-hidden" >
                                        <Accordion.Header></Accordion.Header>
                                    </Accordion.Item>
                                    <Accordion.Item   className="route-acordion-item-hidden" >
                                        <Accordion.Header></Accordion.Header>
                                    </Accordion.Item>
                                    <Accordion.Item   className="route-acordion-item-hidden" >
                                        <Accordion.Header></Accordion.Header>
                                    </Accordion.Item><Accordion.Item   className="route-acordion-item-hidden" >
                                        <Accordion.Header></Accordion.Header>
                                    </Accordion.Item><Accordion.Item   className="route-acordion-item-hidden" >
                                        <Accordion.Header></Accordion.Header>
                                    </Accordion.Item><Accordion.Item   className="route-acordion-item-hidden" >
                                        <Accordion.Header></Accordion.Header>
                                    </Accordion.Item><Accordion.Item   className="route-acordion-item-hidden" >
                                        <Accordion.Header></Accordion.Header>
                                    </Accordion.Item><Accordion.Item   className="route-acordion-item-hidden" >
                                        <Accordion.Header></Accordion.Header>
                                    </Accordion.Item><Accordion.Item   className="route-acordion-item-hidden" >
                                        <Accordion.Header></Accordion.Header>
                                    </Accordion.Item><Accordion.Item   className="route-acordion-item-hidden" >
                                        <Accordion.Header></Accordion.Header>
                                    </Accordion.Item>
 */


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