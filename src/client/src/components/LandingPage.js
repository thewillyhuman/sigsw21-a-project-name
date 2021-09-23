import { useHistory } from "react-router-dom";
import {Row,Col,Card,Form,Button} from 'react-bootstrap';
import { useEffect,useState } from "react";
import background from '../resoruces/fondo.jpg';
import senderismo from '../resoruces/senderismo.jpg';
import bici from '../resoruces/bici.jpg';
import horse from '../resoruces/horse.jpg';
import cFrances from '../resoruces/camino_frances.jpg';
import cPrimitivo from '../resoruces/camino_primitivo.jpg';
import cInvierno from '../resoruces/camino_invierno.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHorse,faBicycle,faWalking, faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import { Link,  Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'


function LandingPage(){

    const history = useHistory();
    const [style,setStyle] = useState(styles);
    const [walkStyle,setWalkStyle] = useState(iconStyle);
    const [bicyStyle,setBicyStyle] = useState(iconStyle);
    const [horseStyle,setHorseStyle] = useState(iconStyle);
    const [isLoading, setLoading] = useState(false);

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
        scroll.scrollMore(1000,{ 
            duration: 100,
            delay: 0,
            smooth: 'easeInOutQuart'
        });
      }


    const handlePlanify= () => setLoading(true);

      useEffect(() => {
        if (isLoading) {
          setTimeout(()=>{
            setLoading(false);
          },2000)
        }
      }, [isLoading]);

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
            <Card onClick={scrollTo} style={{ width: '18rem', height:'25rem'}}>
                <Card.Img variant="top" src={cFrances} />
                <Card.Body>
                    <Card.Title>Camino Francés</Card.Title>
                    <Card.Text>
                    El Camino Francés es el itinerario jacobeo con mayor tradición histórica y el más reconocido internacionalmente.
                    </Card.Text>
                </Card.Body>
            </Card>
            </Col>
            <Col>
            <Card onClick={scrollTo} style={{ width: '18rem',height:'25rem' }}>
                <Card.Img variant="top" src={cPrimitivo} />
                <Card.Body>
                    <Card.Title>Camino Primitivo</Card.Title>
                    <Card.Text>
                    El Camino Primitivo de peregrinación a Compostela fue el utilizado por los primeros devotos, llegados del naciente reino asturiano. Se trata, por lo tanto, del primer itinerario jacobeo
                    </Card.Text>
                </Card.Body>
            </Card>
            </Col>
            <Col>
            <Card onClick={scrollTo} style={{ width: '18rem', height:'25rem' }}>
                <Card.Img variant="top" src={cInvierno} />
                <Card.Body>
                    <Card.Title>Camino de Invierno</Card.Title>
                    <Card.Text>
                    El Camino de Invierno es la entrada natural a Galicia desde la meseta, un acceso ya usado por los romanos. Pudo ser una alternativa en época invernal a la dura subida a las cumbres nevadas de O Cebreiro.
                    </Card.Text>
                </Card.Body>
            </Card>
            </Col>
            </Row>
        </div>
        <div className="landing-config-time">
            <h1>Planifica tu viaje</h1>
            <Row>
                <Col>
                    <Form.Label>Días</Form.Label>
                    <Form.Control size="lg" type="input" placeholder="24" />
                </Col>
                <Col>
                    <Form.Label>Km/Día</Form.Label>
                    <Form.Control size="lg" type="input" placeholder="50" />
                </Col>
            </Row>
            <Row>
                <a href="#">Planificar</a>
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