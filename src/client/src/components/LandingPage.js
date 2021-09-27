import React , { useEffect,useState} from "react";
import Transport from './landing/Transport';
import Way from './landing/Way';
import RouteVisualizer from './landing/RouteVisualizer';
import Planificate from './landing/Planificate';
import { Element, scrollSpy, scroller } from 'react-scroll'
import '../css/landing.css';

export const LandingContext = React.createContext();

/**
 * This React Component Hook represents the Landing page of the application (which is also the main one)
 * It´s composed by four components:
 * 
 *  - Transport:      ->    Represents the component where the users can pick a transport method.
 *  - Way:            ->    Represents the component where the users can pick a way. 
 *  - Planificate     ->    Represents the component where the users can choose a number of days.
 *  - RouteVisualizer ->    Represents the component where the users can see the planning of their trip.
 * 
 * @returns React Hook
 */
function LandingPage(){

    const [transport,setTransport] = useState('');
    const [way,setWay] = useState('');
    const [planning,setPlanning] = useState({});
    const [route,setRoute] = useState(null);
   
    /**
     * Scrolls to an specific element
     * @param {String} element
     */
    function scrollTo(to) {
        scroller.scrollTo(to, {
          duration: 100,
          delay: 0,
          smooth: 'easeInOutQuart'
        })
      }

      useEffect(()=>{
        scrollSpy.update();
    },[])

    // This handles the refresh (F5) of the page.
        // Scrolls to the beginning of the page in case the user refresh the page
    window.onload = function(){
      window.scroll(0, -1000);   
    }
    
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
          <div className="cont">
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
        </div>
        </LandingContext.Provider>
    );
}

export default LandingPage;