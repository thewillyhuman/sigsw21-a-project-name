import { useState,useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHorse,faBicycle,faWalking} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-scroll';
import {LandingContext} from '../LandingPage';
import background from '../../assets/fondo.jpg';
import walk from '../../assets/senderismo.jpg';
import bike from '../../assets/bici.jpg';
import horse from '../../assets/horse.jpg';

/**
 * Represents the component where the users can pick a transport method.
 * @returns React Hook
 */
function Transport(){

    const context = useContext(LandingContext);
    const [style,setStyle] = useState(styles);
    const [walkStyle,setWalkStyle] = useState(iconStyle);
    const [bikeStyle,setBikeStyle] = useState(iconStyle);
    const [horseStyle,setHorseStyle] = useState(iconStyle);

    /**
     * Sets the background of the page.
     */
    function setBackground(background) {
        setStyle({backgroundImage: `url(${background})`})
    }
   
    /**
     * Sets the transport context and aply some styles to the clicked btn. 
     * Also sets an event listener for the resize event in order to guide the user 
     * to the corresponding component.
     * 
     * @param {Function} callback 
     * @param {String} transport 
     */
    function handleTransportClick(callback,transport){
        removeStyles();
        callback(pressedIcon);
        context.setTransport(transport);
        window.removeEventListener("resize", ()=>context.scrollTo('way'));
        window.addEventListener("resize",()=>context.scrollTo('way'));
     }

     /**
      * Remove all the btn styles
      */
     function removeStyles(){
        setWalkStyle(iconStyle);
        setBikeStyle(iconStyle);
        setHorseStyle(iconStyle);
     }

    return(
        <div className="transport">
            <h1>Planifica tu viaje</h1>
            <div className="opactity-bg"/>
            <div className="landing-transport">
                <ul>
                    <Link  to="way" spy={true} smooth={true} offset={50} duration={500} >
                        <li onClick={()=>handleTransportClick(setWalkStyle,'walking')} onMouseEnter={()=>setBackground(walk)}><FontAwesomeIcon icon={faWalking} size="lg" style={walkStyle} /></li>
                    </Link>
                    <Link  to="way" spy={true} smooth={true} offset={50} duration={500} >
                        <li onClick={()=>handleTransportClick(setBikeStyle,'bicycling')} onMouseEnter={()=>setBackground(bike)}><FontAwesomeIcon icon={faBicycle} size="lg" style={bikeStyle} /></li>
                    </Link>
                    <Link  to="way" spy={true} smooth={true} offset={50} duration={500} >
                        <li onClick={()=>handleTransportClick(setHorseStyle,'horsing')} onMouseEnter={()=>setBackground(horse)}> <FontAwesomeIcon icon={faHorse} size="lg" style={horseStyle}/></li>
                    </Link>
                    <li id="bg" className="bg"style={style} ></li>                    
                </ul>
            </div>
        </div>
    )
}

export default Transport;

var styles = {
    backgroundImage: `url(${background})`
}

var iconStyle={
    color:'white'
}

var pressedIcon = {
    color:'#d7b94b'
}