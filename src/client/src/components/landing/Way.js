import { useContext } from "react";
import {Row,Col,Card,Form,Button} from 'react-bootstrap';
import { Link } from 'react-scroll';
import cFrances from '../../resoruces/camino_frances.jpg';
import cPrimitivo from '../../resoruces/camino_primitivo.jpg';
import cInvierno from '../../resoruces/camino_invierno.jpg';
import {LandingContext} from '../LandingPage';

function Way(){

    const context = useContext(LandingContext);

    const handleClick = function(way){
        context.setTransport(way);
        window.removeEventListener("resize", ()=>context.scrollToActive('planificate'));
        window.addEventListener("resize",()=>context.scrollToActive('planificate'));
    }

    return(
    <div className="landing-config-way">
            <h1>Escoge un camino</h1>
            <Link  to="planificate" spy={true} smooth={true} offset={50} duration={500} >
            <Row>
            <Col>
                <Card onClick={()=>handleClick('francés')} style={{ width: '18rem', height:'25rem'}}>
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
            <Card onClick={()=>handleClick('primitivo')}style={{ width: '18rem',height:'25rem' }}>
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
            <Card onClick={()=>handleClick('invierno')}style={{ width: '18rem', height:'25rem' }}>
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
            </Link>
        </div>
    )
}

export default Way;