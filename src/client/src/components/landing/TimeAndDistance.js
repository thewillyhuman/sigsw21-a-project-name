import {Row,Col,Form} from 'react-bootstrap';

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
                <a href='#'>{/*={handlePlanify}*/}Planificar</a>
            </Row>
        </div>
    )
}

export default TimeAndDistance;