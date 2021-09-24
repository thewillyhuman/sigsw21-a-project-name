import { useContext,useState } from "react";
import axios from 'axios';
import {Row,Col,Form,Button} from 'react-bootstrap';
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
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify({
          "road_name": "a",
          "transportMethod": "pie",
          "numberOfDays": 5
        });
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
        fetch("http://santiagoapp.wcr.es:8080/routes", requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));

          var data = JSON.stringify({
            "road_name": "a",
            "transportMethod": "pie",
            "numberOfDays": 5
          });
          
          var xhr = new XMLHttpRequest();
          xhr.withCredentials = true;
          
          xhr.addEventListener("readystatechange", function() {
            if(this.readyState === 4) {
             // console.log(this.responseText);
            }
          });
          
          xhr.open("POST", "http://santiagoapp.wcr.es:8080/routes");
          xhr.setRequestHeader("Content-Type", "application/json");
          
          xhr.send(data);

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
       <>
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
                <button onClick={submit}className="planificatBtn">Planificar </button>
            </Row>
            </>
    )
}

export default Planificate;