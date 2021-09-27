import React , { useEffect,useState} from "react";
import Transport from './landing/Transport';
import Way from './landing/Way';
import RouteVisualizer from './landing/RouteVisualizer';
import Planificate from './landing/Planificate';
import { Element, scrollSpy, scroller } from 'react-scroll'
import '../css/landing.css';

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