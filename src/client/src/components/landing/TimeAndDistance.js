import {Row,Col,Form} from 'react-bootstrap';
import { Link } from 'react-scroll';

function TimeAndDistance(){

    return(
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
                {/*<a onClick={scroll}>Planificar</a>*/}
                <Link  to="planificate" spy={true} smooth={true} offset={50} duration={100} >
                    <a className="planificatBtn" href="#">Planificar</a>
                </Link>
            </Row>
        </div>
    )
}

export default TimeAndDistance;