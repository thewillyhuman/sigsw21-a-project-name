import { useEffect,useContext,useRef} from "react";
import {Accordion,useAccordionButton} from 'react-bootstrap';
import {LandingContext} from '../LandingPage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock,faRunning, faSlidersH} from '@fortawesome/free-solid-svg-icons';
import Map from '../map/Map';
import '../../css/visualizer.css';

/**
 * Represents the component where the users can see the planning of their trip.
 * @returns React Hook
 */
function RouteVisualizer(){

    const context = useContext(LandingContext);
    const mapRef = useRef();

    /**
     * Restart the planning proccess from the beginning in case the user acepts the alert.
     */
    const handleBack = function(){
        let confirm = window.confirm('¿Quieres volver a planificar tu viaje?');
        if(confirm){
            context.scrollTo('transport');
            window.removeEventListener("resize", ()=>context.scrollTo('transport'));
            window.addEventListener("resize",()=>context.scrollTo('transport'));
        }
    }

    /**
     * React Hook compoent that represents a custom Header for the Bootrstrap Acordion.
     * 
     * @param {ReactComponentElement} children 
     * @param {Object} enventKey
     * @param {Object} route_stage
     * @returns 
     */
    function CustomToggle({ children, eventKey, route_stage}) {
        
        /**
         * Calls the map to load an specific route
         */
        const decoratedOnClick = useAccordionButton(eventKey, () =>
            mapRef?.current?.loadRoute(route_stage)
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

    /**
     * Calls the map once there is a route to load the first stage of the route.
     */
    useEffect(()=>{
    if(context?.route?.route?.route_stages?.length>0)
        if(context?.route?.route?.route_stages[0])
             mapRef?.current?.loadRoute(context.route?.route?.route_stages[0]);
    },context?.route)

    return(
        <div  className="visualizer-body">
            <Accordion flush defaultActiveKey={1} className="route-acordion" >
                <div className="planning-title">
                    <h2>Planificación</h2>
                    <FontAwesomeIcon icon={faSlidersH} size="2x"  style={iconStyle} onClick={handleBack}/>
                </div>
                {
                    context.route?.route?.route_stages?.map((day,index)=>{
                        return(
                            <Accordion.Item  className="route-acordion-item" eventKey={index+1} key={index+1}>
                                <CustomToggle route_stage={day} eventKey={index+1}>Día {index+1} 
                                    <FontAwesomeIcon icon={faRunning} /> {Math.round(day?.distance/1000)}Km  
                                    <FontAwesomeIcon icon={faClock} />  {day?.duration}h
                                </CustomToggle>
                                <Accordion.Body className="route-acordion-body">
                                    <div className="days-panel">
                                        <div className="place">
                                            <div className="place-name">
                                                <ul>
                                                    {day?.route_locations?.map((place,i)=>{
                                                        return (<li key={i}>{place?.split(',')[0]}</li>)
                                                    })}
                                                </ul>
                                            </div>
                                            <div className="dot-line">
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
                <Map    ref={mapRef} 
                        way="caminos_andaluces,caminos_galicia,caminos_centro,camino_frances,caminos_norte" 
                        way_style="cs.andaluces,cs.galicia,cs.centro,cs.frances,cs.norte" 
                />
            </div>
    </div>
      
    )
}

export default RouteVisualizer;

var iconStyle={
    color:'#16151A'
}