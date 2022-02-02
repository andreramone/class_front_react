import { Row, Col, Card, Form, NavLink, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import api from '../Services/api';
import {login} from '../Services/auth'

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [show, setShow] = useState(false);

  const toggleShow = () => setShow(!show);

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post("/tokens", { email, senha }).then((res) => {
      console.log(res);
      if (res.status === 200) {
        const result = res.data;
        login(result.token);
        navigate("/dashboard");
      }
    })
    .catch((err) => {
        setShow(true);
    }) ;
  };

  return (
    <div className='auth-wrapper auth-cover'>
      <Row className='auth-inner m-0'>
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5 mx-auto' lg='4' sm='12'>
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
            <Card.Title tag='h2' className='fw-bold mb-1'>
              Bem Vindo! 👋
            </Card.Title>
            <Card.Text className='mb-2'>Por favor entre com sua conta!</Card.Text>
            <Form className='auth-login-form mt-2' onSubmit={e => e.preventDefault()}>
              <div className='mb-1'>
                <Form.Label className='form-label' htmlFor='login-email'  >
                  Email
                </Form.Label>
                <Form.Control type='email' id='login-email' placeholder='john@example.com' autoFocus onChange={(e) => setEmail(e.target.value)}/>
              </div>
              <div className='mb-1'>
                <Form.Label className='form-label' htmlFor='login-password'>
                  Password
                </Form.Label>
                <Form.Control type='password' className='input-group-merge' id='login-password' onChange={(e) => setSenha(e.target.value)}/>
              </div>
              <Button color='primary' onClick={(e) => handleSubmit(e)}>
                Entrar
              </Button>
            </Form>
            <p className='text-center mt-2'>
              <span className='me-25'>Novo na plataforma?</span>
              <NavLink onClick={() => navigate('/cadastro')}>
                <span>Criar nova conta</span>
              </NavLink>
            </p>
          </Col>
        </Col>
      </Row>
    </div>
  )

}

export default Login;