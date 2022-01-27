import { BrowserRouter as Router, Route, Routes as Routing, Navigate } from 'react-router-dom';
import Login from '../Views/Login';
import Modulos from '../Views/Modulos';
import Aulas from '../Views/Aulas';

import { isAuthenticated } from "../Services/auth";

function PrivateRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/" />;
}

const Routes = () => {
  return (
    <Router>
      <Routing>
        <Route path='/' element={<Modulos />} />
        <Route path='/Aulas' element={<Aulas />} />
        <Route path='/Login' element={<Login />} />
      </Routing>
    </Router>

  );
};

export default Routes;