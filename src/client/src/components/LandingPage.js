import { useHistory } from "react-router-dom";
import Transport from './landing/Transport';
import Way from './landing/Way';
import PlanificatePage from './PlanificatePage';
import TimeAndDistance from './landing/TimeAndDistance';
import { Element, Events, scrollSpy } from 'react-scroll'
import '../css/landing.css';
import { useEffect } from "react";

function LandingPage(){

    const history = useHistory();
   
    const handlePlanify= () => history.push('/planificate');

    useEffect(()=>{
        Events.scrollEvent.register('begin', function(to, element) {
            console.log('begin', arguments);
          });
      
          Events.scrollEvent.register('end', function(to, element) {
            console.log('end', arguments);
          });
        scrollSpy.update();
    },[])

    return (
    <>
        <Transport/>
        <Element name="way" className="element">
            <Way/>
        </Element>
        <Element name="time-distance" className="element">
            <TimeAndDistance />
        </Element>
        <PlanificatePage/>

    </>
    );
}

export default LandingPage;


/*
<FontAwesomeIcon icon={faArrowLeft} size="3x" id="backArrow"/>   */