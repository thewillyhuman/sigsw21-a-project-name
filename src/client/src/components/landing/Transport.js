import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHorse,faBicycle,faWalking, faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-scroll';
import background from '../../resoruces/fondo.jpg';
import senderismo from '../../resoruces/senderismo.jpg';
import bici from '../../resoruces/bici.jpg';
import horse from '../../resoruces/horse.jpg';


function Transport(props){

    const {scroll} = props;
    const [style,setStyle] = useState(styles);
    const [walkStyle,setWalkStyle] = useState(iconStyle);
    const [bicyStyle,setBicyStyle] = useState(iconStyle);
    const [horseStyle,setHorseStyle] = useState(iconStyle);

    function handleSenderismo() {
        setStyle({
            backgroundImage: `url(${senderismo})`
        })
    }

    function handleBici() {
        setStyle({
            backgroundImage: `url(${bici})`
        })
    }

    function handleCaballo() {
        setStyle({
            backgroundImage: `url(${horse})`
        })
    }

    function handleTransportClick(callback){
         setWalkStyle(iconStyle);
         setBicyStyle(iconStyle);
         setHorseStyle(iconStyle);
         callback({color:'#d7b94b'});
     }

    return(
        <div className="landing">
            <h1>Planifica tu viaje</h1>
            <div className="opactity-bg"/>
            <div className="landing-transport">
                <ul>
                    <Link  to="way" spy={true} smooth={true} offset={50} duration={100} >
                        <li onClick={()=>handleTransportClick(setWalkStyle)} onMouseEnter={handleSenderismo}><FontAwesomeIcon icon={faWalking} size="lg" style={walkStyle} /></li>
                    </Link>
                    <Link  to="way" spy={true} smooth={true} offset={50} duration={100} >
                        <li onClick={()=>handleTransportClick(setBicyStyle)} onMouseEnter={handleBici}><FontAwesomeIcon icon={faBicycle} size="lg" style={bicyStyle} /></li>
                    </Link>
                    <Link  to="way" spy={true} smooth={true} offset={50} duration={100} >
                        <li onClick={()=>handleTransportClick(setHorseStyle)} onMouseEnter={handleCaballo}> <FontAwesomeIcon icon={faHorse} size="lg" style={horseStyle}/></li>
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

export default Transport;