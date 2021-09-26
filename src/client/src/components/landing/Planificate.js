import { useContext,useState } from "react";
import axios from 'axios';
import {Row,Col,Form,Button} from 'react-bootstrap';
import { scroller } from 'react-scroll';
import {LandingContext} from '../LandingPage';
import { useHistory } from "react-router-dom";


function Planificate(){
    
    let history = useHistory();
    let sampleKm = 33;
    const context = useContext(LandingContext);
    const [days,setDays] = useState(10);
    const [km,setKm] = useState(sampleKm/10);
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
      const form = event.currentTarget;
      event.preventDefault();
      event.stopPropagation();

      setValidated(true);
      window.removeEventListener("resize", ()=>context.scrollTo('route-visualizer'));
      window.addEventListener("resize",()=>context.scrollTo('route-visualizer'));

      if (form.checkValidity() === true)
        getRoute();
    };

    const getRoute = function(){
        context.setPlanning({
            days:days,
            km:km
        })
    
          var data = JSON.stringify({
            "road_name": "a",
            "transportMethod": "pie",
            "numberOfDays": days
          });
          
          var xhr = new XMLHttpRequest();
          xhr.withCredentials = true;
          
          xhr.addEventListener("readystatechange", function() {
            if(this.readyState === 4) {
              console.log(JSON.parse(this.responseText));
              context.setRoute(JSON.parse(this.responseText));
              context.scrollTo('route-visualizer');
              
              //history.push("/route/"+JSON.stringify(JSON.parse(this.responseText)));
              //window.location.reload(); 
            }
          });
          
          xhr.open("POST", "http://santiagoapp.wcr.es:8080/routes");
          xhr.setRequestHeader("Content-Type", "application/json");
          
          xhr.send(data);
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
       <Form className="landing-config-time" noValidate validated={validated} onSubmit={handleSubmit}>
            <h1>Planifica tu viaje</h1>
      
            <Row>
                <Col>
                    <Form.Label>Días</Form.Label>
                    <Form.Control size="lg" type="number" min="1" value={days} onChange={handleDays} required/>
                </Col>
                <Col>
                    <Form.Label>Km/Día</Form.Label>
                    <Form.Control size="lg" type="number"  min="0.5" value={km} onChange={handleKm} required/>
                </Col>
            </Row>
            <Row>
                <button className="planificatBtn">Planificar </button>
            </Row>
            </Form>
    )
}

export default Planificate;