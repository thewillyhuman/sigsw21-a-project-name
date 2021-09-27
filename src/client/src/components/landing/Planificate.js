import { useContext,useEffect,useState } from "react";
import {Row,Col,Form,Spinner} from 'react-bootstrap';
import { Link } from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft} from '@fortawesome/free-regular-svg-icons';
import {LandingContext} from '../LandingPage';

/**
 * Represents the component where the users can choose a number of days.
 * @returns React Hook
 */
function Planificate(){
    
    const context = useContext(LandingContext);
    const [days,setDays] = useState(10);
    const [validated, setValidated] = useState(false);
    const [spinnerDisplay,setSpinnerDisplay] = useState('none')
    const [btnDisplay,setBtnDisplay] = useState('inline-block')

    /**
     * Handles everything for the user expirence on submit:
     *    - Field validation
     *    - Loading Spinner
     *    - Stops the propagation for not refreshing the page
     * 
     * In case the validation is ok, it calls getRoute function to comunicate with the server.
     * 
     * @param {Event} submit
     */
    const handleSubmit = (event) => {
      const form = event.currentTarget;
      event.preventDefault();
      event.stopPropagation();

      setValidated(true);
  
      if (form.checkValidity() === true){
        setBtnDisplay('none');
        setSpinnerDisplay('inline');
        getRoute();
      }
      
    };

    /**
     * Calls the server for getting an specific route for the planning sent.
     * Performs a POST request to the server passing as arguments: (All the arguments are obtained from the LandingContext)
     *     
     *       - road_name         -> Name of the way. It always start with camino_
     *      - transport_method  
     *      - number_of_days
     * 
     * Once the server has responded it scrolls to the next stage.
     * Also sets an event listener for the resize event in order to guide the user 
     * to the corresponding component.
     */
    const getRoute = function(){
        context.setPlanning({
            days:days
        })
    
          var data = JSON.stringify({
            "road_name": context.way,
            "transport_method": context.transport,
            "number_of_days": days
          });
          
          var xhr = new XMLHttpRequest();
          xhr.withCredentials = true;
          
          xhr.addEventListener("readystatechange", function() {
            if(this.readyState === 4) {
              context.setRoute(JSON.parse(this.responseText));
              setBtnDisplay('inline-block');
              setSpinnerDisplay('none');
              context.scrollTo('route-visualizer');
              console.log(document.getElementsByClassName('accordion-button'))
              document.getElementsByClassName('accordion-button')[0]?.focus();
              window.removeEventListener("resize", ()=>context.scrollTo('route-visualizer'));
              window.addEventListener("resize",()=>context.scrollTo('route-visualizer'));
            }
          });
          
          xhr.open("POST", "http://santiagoapp.wcr.es:8080/routes");
          xhr.setRequestHeader("Content-Type", "application/json");
          
          xhr.send(data);
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
                    <Form.Control size="lg" type="number" min="1" value={days} onChange={(e)=>setDays(e.target.value)} required/>
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