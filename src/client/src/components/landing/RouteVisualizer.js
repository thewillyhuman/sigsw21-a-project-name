import { useEffect,useState,useContext} from "react";
import {Row,Col,Container,Accordion,useAccordionButton} from 'react-bootstrap';
import Map from '../../map/Map';
import '../../css/planificate.css'
import {LandingContext} from '../LandingPage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock,faRunning, faSlidersH} from '@fortawesome/free-solid-svg-icons'
import { scroll } from 'react-scroll';

function RouteVisualizer(){

    const context = useContext(LandingContext);

    const handleBack = function(){
        let confirm = window.confirm('¿Quieres volver a planificar tu viaje?');
        if(confirm){
            context.scrollTo('transport');
        }
    }

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
        
                    <Accordion flush defaultActiveKey={1} className="route-acordion" >
                    <div className="planning-title">
                        <h2>Planificación</h2>
                        <FontAwesomeIcon icon={faSlidersH} size="2x"  style={iconStyle} onClick={handleBack}/>
                    </div>
                                {
                                    context.route?.route?.route_stages?.map((day,index)=>{
                                        return(
                                    <Accordion.Item  onClick={console.log('onblcikk')}  className="route-acordion-item" eventKey={index+1} key={index+1}>
                                        <CustomToggle eventKey={index+1}>Día {index+1} <FontAwesomeIcon icon={faRunning} /> {Math.round(day?.distance/1000)}Km  <FontAwesomeIcon icon={faClock} />  {day?.duration}h</CustomToggle>
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

var iconStyle={
    color:'#16151A'
}