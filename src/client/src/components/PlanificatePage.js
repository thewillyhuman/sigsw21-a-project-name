import {Row,Col,Container} from 'react-bootstrap';
import '../css/planificate.css'

function PlanificatePage(){
    return(
        <div className="planificate-bg">
        <Container className="planificate-body">
            <Row>
                <Col md={3}>
                    <div className="days-panel">
                        <div className="place">
                            <div className="place-name">
                                <ul>
                                    <li>Ocebreiro</li>
                                    <li>Liñares</li>
                                    <li>Hospital</li>
                                    <li>Padornelo</li>
                                    <li>Fondría</li>
                                </ul>
                            </div>

                            <div className="place-day">
                                <ul>
                                    <li>Dia 1</li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                </ul>
                            </div>
                            <div className="place-name">
                                <ul>
                                    <li>Biduedo</li>
                                    <li>Triacastela</li>
                                    <li>San Xil</li>
                                    <li>Aguiada</li>
                                    <li>Sarria</li>
                                    <li>Barbadelo</li>
                                </ul>
                            </div>

                            <div className="place-day">
                                <ul>
                                    <li>Dia 2</li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col md>
                    <div className="day-container">
                        <Row>
                            <Col>
                                <div className="day-panel">
                                    <div className="day-panel-sub">
                                       {/* <h2>Día 1 - Obreiro</h2> */}
                                        
                                    </div>
                                    
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className="map-panel">
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

<div className="place-dot">
                                <div className="dot-line">
                                    <div className="dot">
                                    </div>
                                    
                                </div>
                            </div>*/

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