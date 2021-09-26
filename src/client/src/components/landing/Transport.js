import { useState,useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHorse,faBicycle,faWalking, faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-scroll';
import background from '../../resoruces/fondo.jpg';
import senderismo from '../../resoruces/senderismo.jpg';
import bici from '../../resoruces/bici.jpg';
import horse from '../../resoruces/horse.jpg';
import {LandingContext} from '../LandingPage';

function Transport(props){

    const {scroll} = props;
    const context = useContext(LandingContext);
    const [style,setStyle] = useState(styles);
    const [walkStyle,setWalkStyle] = useState(iconStyle);
    const [bicyStyle,setBicyStyle] = useState(iconStyle);
    const [horseStyle,setHorseStyle] = useState(iconStyle);

    function handleWalk() {
        setStyle({
            backgroundImage: `url(${senderismo})`
        })
    }

    function handleBicycle() {
        setStyle({
            backgroundImage: `url(${bici})`
        })
    }

    function handleHorse() {
        setStyle({
            backgroundImage: `url(${horse})`
        })
    }

    function handleTransportClick(callback,transport){
        removeStyles();
        callback(pressedIcon);
        context.setTransport(transport);
        window.removeEventListener("resize", ()=>context.scrollTo('way'));
        window.addEventListener("resize",()=>context.scrollTo('way'));
     }

     function removeStyles(){
        setWalkStyle(iconStyle);
        setBicyStyle(iconStyle);
        setHorseStyle(iconStyle);
     }

    return(
        <div className="transport">
            <h1>Planifica tu viaje</h1>
            <div className="opactity-bg"/>
            <div className="landing-transport">
                <ul>
                    <Link  to="way" spy={true} smooth={true} offset={50} duration={500} >
                        <li onClick={()=>handleTransportClick(setWalkStyle,'walk')} onMouseEnter={handleWalk}><FontAwesomeIcon icon={faWalking} size="lg" style={walkStyle} /></li>
                        <li onClick={()=>handleTransportClick(setBicyStyle,'bicycle')} onMouseEnter={handleBicycle}><FontAwesomeIcon icon={faBicycle} size="lg" style={bicyStyle} /></li>
                        <li onClick={()=>handleTransportClick(setHorseStyle,'horse')} onMouseEnter={handleHorse}> <FontAwesomeIcon icon={faHorse} size="lg" style={horseStyle}/></li>
                    </Link>
                    <li id="bg" className="bg"style={style} ></li>                    
                </ul>
            </div>
        </div>
    )
}

var styles = {
    backgroundImage: `url(${background})`
}

var iconStyle={
    color:'white'
}

var pressedIcon = {
    color:'#d7b94b'
}

export default Transport;