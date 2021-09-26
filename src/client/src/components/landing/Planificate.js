import { useContext,useEffect,useState } from "react";
import axios from 'axios';
import {Row,Col,Form,Spinner} from 'react-bootstrap';
import { Link } from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft} from '@fortawesome/free-regular-svg-icons'
import {LandingContext} from '../LandingPage';


function Planificate(){
    
    let sampleKm = 33;
    const context = useContext(LandingContext);
    const [days,setDays] = useState(10);
    const [km,setKm] = useState(sampleKm/10);
    const [validated, setValidated] = useState(false);
    const [spinnerDisplay,setSpinnerDisplay] = useState('none')
    const [btnDisplay,setBtnDisplay] = useState('inline-block')

    const handleSubmit = (event) => {
      const form = event.currentTarget;
      event.preventDefault();
      event.stopPropagation();

      setValidated(true);
      window.removeEventListener("resize", ()=>context.scrollTo('route-visualizer'));
      window.addEventListener("resize",()=>context.scrollTo('route-visualizer'));

      if (form.checkValidity() === true){
        setBtnDisplay('none');
        setSpinnerDisplay('inline');
        getRoute();
      }
      
    };

    const getRoute = function(){
        context.setPlanning({
            days:days,
            km:km
        })
    
          var data = JSON.stringify({
            "road_name": "camino_frances",
            "transportMethod": "pie",
            "numberOfDays": days
          });
          
          var xhr = new XMLHttpRequest();
          xhr.withCredentials = true;
          
          xhr.addEventListener("readystatechange", function() {
            if(this.readyState === 4) {
              console.log(JSON.parse(this.responseText));
              context.setRoute(JSON.parse(this.responseText));
             setBtnDisplay('inline-block');
             setSpinnerDisplay('none');
             context.scrollTo('route-visualizer');
             document.getElementsByClassName('accordion-button')[0]?.focus();
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
      <>
      <div className="goBack">
            <Link  to="way" spy={true} smooth={true} offset={50} duration={500} >
                <FontAwesomeIcon icon={faArrowAltCircleLeft} size="3x"  style={iconStyle}/>
            </Link>
        </div>
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
              <div className="btn-spinner-cont">
                <div className="spinner-container" style={{display:spinnerDisplay}}>
                  <Spinner animation="border" variant="light"/>
                </div>
                <button className="planificatBtn"  style={{display:btnDisplay}}>Planificar </button>
              </div>
            </Row>
            </Form>
    </>
    )
}

export default Planificate;

var iconStyle={
  color:'white'
}