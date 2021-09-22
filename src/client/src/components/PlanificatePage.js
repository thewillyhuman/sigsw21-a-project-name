import {Row,Col,Form,Button} from 'react-bootstrap';

function PlanificatePage(){
    return(
        <div className="planificate-body">
            <Row>
                <Col>
                    <div className="days-panel"><p>Days Panel</p></div>
                </Col>
                <Col>
                    <Row>
                        <div className="info-day-panel"><p>Info Day Panel</p></div>
                    </Row> 
                    <Row>
                        <div className="map-panel"><p>Map</p></div>
                    </Row> 
                </Col>
            </Row> 
        </div>
    )
}

export default PlanificatePage;