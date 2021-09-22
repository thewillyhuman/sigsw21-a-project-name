import { useHistory } from "react-router-dom";
import {Row,Col,Form,Button} from 'react-bootstrap';

function LandingPage(){

    const history = useHistory();

    function handleSubmit() {
        console.log('click')
        history.push("/planificate");
    }
    

    return (
            <div className="landing-body">
                <h1>Planifica tu Viaje</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                            <Form.Select aria-label="Default select example">
                                <option>Medio de transporte</option>
                                <option value="1">A pie</option>
                                <option value="2">Bicileta</option>
                                <option value="3">Caballo</option>
                            </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                            <Form.Select aria-label="Default select example">
                                <option>Camino a realizar</option>
                                <option value="1">Camino Pirineo</option>
                                <option value="2">Camino Francés</option>
                                <option value="3">Camino Catalán</option>
                            </Form.Select>
                      
                    </Form.Group>
                    <Form.Group className="mb-3">
                       <Row>
                            <Col>
                                <Form.Label>Nº Días</Form.Label>
                                <Form.Control type="input" placeholder="24" />
                            </Col>
                            <Col>
                                <Form.Label>KM</Form.Label>
                                <Form.Control type="input" placeholder="150Km" />
                            </Col>
                        </Row> 
                    </Form.Group>

                    <Button className="btnPlanificar" variant="primary" type="submit">
                        Planificar
                    </Button>
                </Form>
            </div>
    );
}

export default LandingPage;