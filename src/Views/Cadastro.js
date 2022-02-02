import { useState } from "react";
import api from "../Services/api";
import { useNavigate } from "react-router-dom";
import { Row, Col, Card, Form, NavLink, Button, Toast, ToastContainer } from "react-bootstrap";

function FormCadastro() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({ email: "", senha: "" });
  const [show, setShow] = useState(false);

  const toggleShow = () => setShow(!show);
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    console.log(inputs);
    e.preventDefault();
    api
      .post("/usuarios", { email: inputs.email, senha: inputs.senha })
      .then((res) => {
        const result = res.data;
        if (res.status !== 200) {
          console.log(res.errors);
        } else {
          setInputs({ email: "", senha: "" });
          window.alert('usuário cadastrado')
          navigate('/login')
        }
      });
  };

  return (

   
    <div className="auth-wrapper auth-cover">
         <ToastContainer position="top-end">
        <Toast show={show} onClose={toggleShow} bg="danger" autohide>
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">Erro</strong>
              <small></small>
            </Toast.Header>
            <Toast.Body className="text-white" >Email invalido!</Toast.Body>
          </Toast>
      </ToastContainer>
      <Row className="auth-inner m-0">
        <Col
          className="d-flex align-items-center auth-bg px-2 p-lg-5 mx-auto"
          lg="4"
          sm="12"
        >
          <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
            <Card.Title tag="h2" className="fw-bold mb-1">
              Cadastre-se
            </Card.Title>

            <Form className="auth-login-form mt-2">
              <div className="mb-1">
                <Form.Label className="form-label" htmlFor="login-email">
                  Email
                </Form.Label>
                <Form.Control
                  type="email"
                  id="login-email"
                  placeholder="john@example.com"
                  autoFocus
                  name="email"
                  value={inputs.email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-1">
                <Form.Label className="form-label" htmlFor="login-password">
                  Senha
                </Form.Label>
                <Form.Control
                  type="password"
                  className="input-group-merge"
                  id="login-password"
                  placeholder="*******"
                  name="senha"
                  value={inputs.senha}
                  onChange={handleChange}
                />
              </div>
              <Button color="primary" to="/" onClick={handleSubmit}>
                Cadastro
              </Button>
            </Form>
            <p className="text-center mt-2">
              <NavLink onClick={() => navigate("/cadastro")}>
                <span>Já possui conta?</span>
              </NavLink>
            </p>
          </Col>
        </Col>
      </Row>
    </div>
  );
}

export default FormCadastro;
