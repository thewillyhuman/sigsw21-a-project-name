import { useContext,useState } from "react";
import axios from 'axios';
import {Row,Col,Form} from 'react-bootstrap';
import { scroller } from 'react-scroll';
import {LandingContext} from '../LandingPage';


function Planificate(){

    let sampleKm = 33;
    const context = useContext(LandingContext);
    const [days,setDays] = useState(10);
    const [km,setKm] = useState(sampleKm/10);

    const submit = function(planning){
        context.setPlanning({
            days:days,
            km:km
        })

        let bodyFormData = new FormData();
        bodyFormData.set('transportMethod', context.transport);
        bodyFormData.set('road_name', context.way);
        bodyFormData.set('numberOfDays', context.days);

        axios({
            method: 'get',
            url: 'http://santiagoapp.wcr.es:8080/routes',
            data: bodyFormData,
            config: { headers: {'Content-Type': 'application/json' }}
        })
        .then(function(response){
            console.log(response)
            scroller.scrollTo('route-visualizer', {
                duration: 500,
                delay: 0,
                smooth: 'easeInOutQuart'
            })
        })
        .catch(function (response) {
            console.log('server error');
            console.log(response);
        });

        window.removeEventListener("resize", ()=>context.scrollToActive('route-visualizer'));
        window.addEventListener("resize",()=>context.scrollToActive('route-visualizer'));
    }


    const handleDays = function(e){
        let days = e.target.value;
        setDays(days);
        setKm(Math.round(sampleKm/days * 100) / 100)
    }

    const handleKm = function(e){
        let km = e.target.value;
        setKm(km);
        setDays(Math.round(sampleKm/km));
    }


    return(
        <div className="landing-config-time">
            <h1>Planifica tu viaje</h1>
            <Row>
                <Col>
                    <Form.Label>Días</Form.Label>
                    <Form.Control size="lg" type="number" min="1" value={days} onChange={handleDays}/>
                </Col>
                <Col>
                    <Form.Label>Km/Día</Form.Label>
                    <Form.Control size="lg" type="number"  min="0.5" value={km} onChange={handleKm}/>
                </Col>
            </Row>
            <Row>
                <a className="planificatBtn" onClick={submit}>Planificar</a>
            </Row>
        </div>
    )
}

export default Planificate;