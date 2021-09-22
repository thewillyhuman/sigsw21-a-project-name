import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import PlanificatePage from './PlanificatePage'
import {Dropdown,Form,Button} from 'react-bootstrap';
function LandingPage(){
    return (
        <Router>
            <div className="landingBody">
                <h1>Planifica tu Viaje</h1>
                <Form>
                    <Form.Group className="mb-3">
                        <div className="dropdowns">
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    Medio de transporte
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1">A pie</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Bicicleta</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Caballo</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    Camino a realizar
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1">A pie</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Bicicleta</Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Caballo</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>        
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <div className="day-km-config">
                            <Form.Label>Nº Días</Form.Label>
                            <Form.Control type="input" placeholder="24" />
                            <Form.Label>KM</Form.Label>
                            <Form.Control type="input" placeholder="150Km" />
                        </div>   
                    </Form.Group>

                    <Button className="btnPlanificar" variant="primary" type="submit">
                        Planificar
                    </Button>
                </Form>
               
            </div>
                {/* A <Switch> looks through its children <Route>s and
                    renders the first one that matches the current URL. */}
                <Switch>
                    <Route path="/planificate">
                        <PlanificatePage />
                    </Route>
                </Switch>
           
      </Router>
    );
}

export default LandingPage;