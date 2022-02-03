import { Container, Row, FormControl, Card, Button, Col } from 'react-bootstrap';
import React, { useState, useEffect } from "react";
import ReactPlayer from 'react-player/youtube';
import { useNavigate, useParams } from 'react-router-dom';
import api from "../Services/api";
import { format} from 'date-fns'
import {logout, isAuthenticated} from '../Services/auth'


const Aulas = () => {
  let {id} = useParams()
  const navigate = useNavigate();
  const [aulas, setAulas] = useState([]);
  useEffect(() => {
    api.get("aulas/modulo/" + id).then((res) => {
      const result = res.data;
      setAulas(result);
    });
  }, []);
  return (
    <Container>
      <Row className='mt-3'>
        <Col md={{ span: 10 }}>
          <FormControl type='text' id='search' placeholder='O que você está procurando?'></FormControl>
         </Col>
          <Col xs={{ span: 2 }}>
          {isAuthenticated ? (
              <Button variant="secondary" size="md" onClick={() => {logout();  navigate("/")}  }>
                Logout
              </Button>
            ) : (
              <Button
                variant="secondary"
                size="md"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            )}
        </Col>
      </Row>
      {aulas.length > 0
          ? aulas.map((aula, index) => (
            <Row key={index} xs={1} sm={1} md={2} lg={3} xl={4}className='mt-3'>
            <Col className='mb-3'>
                <Card border="primary" style={{ width: '18rem' }}>
                  <Card.Body>
                    <Card.Title>{aula.nome}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      <ReactPlayer 
                        width='100%' 
                        height='100%' 
                        url={aula.url} />
                    </Card.Subtitle>
                    <Card.Text>{aula.modulo}</Card.Text>
                  </Card.Body>
                  <Card.Body>
                    <Card.Text className='fw-bold'>{format(new Date(aula.data), 'dd/MM/yyyy hh:mm')}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            ))
          : null}
    
    </Container>
  )

}

export default Aulas;