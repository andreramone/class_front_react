import { BrowserRouter as Router, Route, Routes as Routing, Navigate } from 'react-router-dom';
import Login from '../Views/Login';
import Modulos from '../Views/Modulos';
import Aulas from '../Views/Aulas';
import Cadastro from '../Views/Cadastro'
import Dashboard from '../Views/Dashboard'

import { isAuthenticated } from "../Services/auth";
import AulasCreate from '../Views/AulasCreate';

function PrivateRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/" />;
}

const Routes = () => {
  return (
    <Router>
      <Routing>
        <Route path='/' element={<Modulos />} />
        <Route exact path='/aulas' element={<AulasCreate />} />
        <Route path='/aulas/:id' element={<Aulas />} />
        
        <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path='/login' element={<Login />} />
        <Route path='/cadastro' element={<Cadastro />} />
      </Routing>
    </Router>

  );
};

export default Routes;