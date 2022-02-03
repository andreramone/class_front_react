import {
  BrowserRouter as Router,
  Route,
  Routes as Routing,
  Navigate,
} from "react-router-dom";
import { isAuthenticated } from "../Services/auth";
import Login from "../Views/Login";
import Modulos from "../Views/Modulos";
import Aulas from "../Views/Aulas";
import Cadastro from "../Views/Cadastro";
import ModulosDashboard from "../Views/ModulosDashboard";
import AulasDashboard from "../Views/AulasDashboard";

function PrivateRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/" />;
}

const Routes = () => {
  return (
    <Router>
      <Routing>
        <Route path="/" element={<Modulos />} />
        <Route
          exact
          path="/aulas/dashboard"
          element={
            <PrivateRoute>
              <AulasDashboard />
            </PrivateRoute>
          }
        />
        <Route path="/aulas/:id" element={<Aulas />} />

        <Route
          path="/modulos/dashboard"
          element={
            <PrivateRoute>
              <ModulosDashboard />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
      </Routing>
    </Router>
  );
};

export default Routes;
