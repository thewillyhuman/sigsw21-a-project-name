import { useHistory } from "react-router-dom";
import Transport from './landing/Transport';
import Way from './landing/Way';
import TimeAndDistance from './landing/TimeAndDistance';

import {animateScroll as scroll } from 'react-scroll'
import '../css/landing.css';

function LandingPage(){

    const history = useHistory();
   
    const scrollTo = function() {
        scroll.scrollMore(1000,{ 
            duration: 100,
            delay: 0,
            smooth: 'easeInOutQuart'
        });
      }


    const handlePlanify= () => history.push('/planificate');


    return (
    <>
        <Transport scroll={scrollTo}/>
        <Way scroll={scrollTo}/>
        <TimeAndDistance/>
    </>
    );
}

export default LandingPage;


/*
<FontAwesomeIcon icon={faArrowLeft} size="3x" id="backArrow"/>   */