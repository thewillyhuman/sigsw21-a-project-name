import { useHistory } from "react-router-dom";
import {Row,Col,Card,Button} from 'react-bootstrap';
import { useEffect,useState } from "react";
import background from '../resoruces/fondo.jpg';
import senderismo from '../resoruces/senderismo.jpg';
import bici from '../resoruces/bici.jpg';
import horse from '../resoruces/horse.jpg';
import cFrances from '../resoruces/camino_frances.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHorse,faBicycle,faWalking, faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import { Link,  Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'


function LandingPage(){

    const history = useHistory();
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
        scrollTo()
    }

    const scrollTo = function(to) {
        console.log('ee')
        scroll.scrollMore(1000,{ 
            duration: 100,
            delay: 0,
            smooth: 'easeInOutQuart'
        });
      }


    return (
        <>
 
        <div className="landing">
            
            <h1>Planifica tu viaje</h1>
            <div className="black-container"/>
            <div className="landing-body  menu">
                <ul>
                    <li onClick={()=>handleTransportClick(setWalkStyle)} onMouseEnter={handleSenderismo}><FontAwesomeIcon icon={faWalking} size="lg" style={walkStyle} /></li>
                    <li onClick={()=>handleTransportClick(setBicyStyle)} onMouseEnter={handleBici}> <FontAwesomeIcon icon={faBicycle} size="lg" style={bicyStyle} /></li>
                    <li onClick={()=>handleTransportClick(setHorseStyle)} onMouseEnter={handleCaballo}> <FontAwesomeIcon icon={faHorse} size="lg" style={horseStyle}/></li>
                    <li id="bg" className="bg"style={style} ></li>                    
                </ul>
            </div>
        </div>
        <div className="landing-config-way">
            <h1>Escoge un camino</h1>
            <Row>
            <Col>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={cFrances} />
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>
            </Col>
            <Col>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={cFrances} />
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>
            </Col>
            <Col>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={cFrances} />
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>
            </Col>
            </Row>
        </div>
      </>
    );
}

export default LandingPage;


var styles = {
    backgroundImage: `url(${background})`
}

var iconStyle={
    color:'white'
}

/*
<FontAwesomeIcon icon={faArrowLeft} size="3x" id="backArrow"/>   */