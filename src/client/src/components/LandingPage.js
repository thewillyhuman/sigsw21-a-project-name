import { useHistory } from "react-router-dom";
import Transport from './landing/Transport';
import Way from './landing/Way';
import PlanificatePage from './PlanificatePage';
import TimeAndDistance from './landing/TimeAndDistance';
import { Element, Events, scrollSpy, scroller } from 'react-scroll'
import '../css/landing.css';
import React , { useEffect,useState,createContext, useContext} from "react";

export const LandingContext = React.createContext();

function LandingPage(){

    const history = useHistory();
   
    const handlePlanify= () => history.push('/planificate');


    function scrollToActive(to) {
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
          scrollToActive:scrollToActive
        }}>
        <Element name="transport" className="element">
            <Transport />
        </Element>
        <Element name="way" className="element">
            <Way />
        </Element>
        <Element name="time-distance" className="element">
            <TimeAndDistance  />
        </Element>
        <Element name="planificate" className="element">
            <PlanificatePage />
        </Element>
        

        </LandingContext.Provider>
    );
}

export default LandingPage;


/*
<FontAwesomeIcon icon={faArrowLeft} size="3x" id="backArrow"/>   */