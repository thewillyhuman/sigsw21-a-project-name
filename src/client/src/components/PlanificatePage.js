import {Row,Col,Container} from 'react-bootstrap';

function PlanificatePage(){
    return(
        <div className="planificate-bg">
        <Container className="planificate-body">
            <Row>
                <Col md={4}>
                    <div className="days-panel"><p>Days Panel</p></div>
                </Col>
                <Col md>
                    <div className="day-container">
                        <Row>
                            <Col>
                                <div className="day-panel">
                                    <p>Día 1</p>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className="map-panel">
                                    <p>Esto es un mapa</p>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row> 
        </Container>
        </div>
    )
}

export default PlanificatePage;

/*
 <Container  className="planificate-body">
            <Row>
                <Col md>
                    <div className="days-panel"><p>Days Panel</p></div>
                </Col>
                <Col>
                    <Container   className="planificate-body-col2">
                        <Row>
                            <div className="info-day-panel"><p>Info Day Panel</p></div>
                        </Row> 
                        <Row>
                            <div className="map-panel"><p>Map</p></div>
                        </Row> 
                    </Container>
                </Col>
            </Row> 
        </Container>*/