import { useContext,useState} from "react";
import {Row,Col,Card,Toast,ToastContainer,CloseButton } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft} from '@fortawesome/free-regular-svg-icons'
import { Link } from 'react-scroll';
import cFrances from '../../assets/camino_frances.jpg';
import cAndaluz from '../../assets/camino_andaluz.jpg';
import cNorte from '../../assets/camino_norte.jpg';
import {LandingContext} from '../LandingPage';

function Way(){

    const context = useContext(LandingContext);
    const [showToast, setShowToast] = useState(true);

    const toggleShowToast= () =>{
     console.log('cerrar')
        setShowToast(!showToast);
    }

    const handleClick = function(way){
        context.setWay(way);
        window.removeEventListener("resize", ()=>context.scrollTo('planificate'));
        window.addEventListener("resize",()=>context.scrollTo('planificate'));
    }

    return(
        <>
         <div className="goBack">
            <Link  to="transport" spy={true} smooth={true} offset={50} duration={500} >
                <FontAwesomeIcon icon={faArrowAltCircleLeft} size="3x"  style={iconStyle}/>
            </Link>
            <ToastContainer  className="p-3 toast-cont">
                <Toast show={showToast}>
                <Toast.Header closeButton={false}>
                    <strong className="me-auto">Información</strong>
                    <CloseButton onClick={toggleShowToast}/>
                </Toast.Header>
                <Toast.Body>Recomendamos seleccionar el camino frances para disfrutar de todas las funcionalidades que ofrece la aplicación</Toast.Body>
                </Toast>
            </ToastContainer>   
        </div>
      
    <div className="landing-config-way">
       
            <h1>Escoge un camino</h1>
            <Row>
            <Col>
                <Link  to="planificate" spy={true} smooth={true} offset={50} duration={500} >
                    <Card onClick={()=>handleClick('camino_frances')} style={{ width: '18rem', height:'25rem'}}>
                        <Card.Img variant="top" src={cFrances} />
                        <Card.Body>
                            <Card.Title>Camino Francés</Card.Title>
                            <Card.Text>
                            El Camino Francés es el itinerario jacobeo con mayor tradición histórica y el más reconocido internacionalmente.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Link>
            </Col>
            <Col>
                <Link  to="planificate" spy={true} smooth={true} offset={50} duration={500} >
                    <Card onClick={()=>handleClick('camino_andaluz')}style={{ width: '18rem',height:'25rem' }}>
                        <Card.Img variant="top" src={cAndaluz} />
                        <Card.Body>
                            <Card.Title>Camino Andaluz</Card.Title>
                            <Card.Text>
                            La orografía dominante entre Granada y Córdoba es de suaves colinas, con alguna excepción, y la característica paisajística más recurrente son las inmensas extensiones de olivares.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Link>
            </Col>
            <Col>
                <Link  to="planificate" spy={true} smooth={true} offset={50} duration={500} >
                    <Card onClick={()=>handleClick('camino_norte')}style={{ width: '18rem', height:'25rem' }}>
                        <Card.Img variant="top" src={cNorte} />
                        <Card.Body>
                            <Card.Title>Camino del Norte</Card.Title>
                            <Card.Text>
                            El Camino del Norte recorre transcurre por zonas turísticas, y combina tramos altamente urbanizados con otros de gran belleza natural.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Link>
            </Col>
            </Row>
        </div>

        </>
    )
}

export default Way;

var iconStyle={
    color:'white'
}