import Transport from './landing/Transport';
import Way from './landing/Way';
import RouteVisualizer from './landing/RouteVisualizer';
import Planificate from './landing/Planificate';
import { Element, Events, scrollSpy, scroller } from 'react-scroll'
import '../css/landing.css';
import React , { useEffect,useState} from "react";

export const LandingContext = React.createContext();

function LandingPage(){

    const [transport,setTransport] = useState('');
    const [way,setWay] = useState('');
    const [planning,setPlanning] = useState({});
    const [route,setRoute] = useState(null);
   
    function scrollTo(to) {
        scroller.scrollTo(to, {
          duration: 100,
          delay: 0,
          smooth: 'easeInOutQuart'
        })
      }
    

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
    <LandingContext.Provider
        value={
          {
          transport:transport,
          way:way,
          planning:planning,
          route:route,
          setTransport:setTransport,
          setWay:setWay,
          setPlanning:setPlanning,
          scrollTo:scrollTo,
          setRoute:setRoute
        }}>
        <Element name="transport" className="element">
            <Transport />
        </Element>
        <Element name="way" className="element">
            <Way />
        </Element>
        <Element name="planificate" className="element">
            <Planificate  />
        </Element>
        <Element name="route-visualizer" className="element">
            <RouteVisualizer />
        </Element>
        

        </LandingContext.Provider>
    );
}

export default LandingPage;


/*
<FontAwesomeIcon icon={faArrowLeft} size="3x" id="backArrow"/>   */