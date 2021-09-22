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