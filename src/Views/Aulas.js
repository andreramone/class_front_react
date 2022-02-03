import { Container, Row, Form, Card, Button, Col } from 'react-bootstrap';
import React, { useState, useEffect } from "react";
import ReactPlayer from 'react-player/youtube';
import { useNavigate, useParams } from 'react-router-dom';
import api from "../Services/api";
import { format} from 'date-fns'
import {logout, isAuthenticated} from '../Services/auth'


const Aulas = () => {
  const [searchText, setSearchText] = useState("");

  let {id} = useParams()
  const navigate = useNavigate();
  const [aulas, setAulas] = useState([]);
  useEffect(() => {
    api.get("aulas/modulo/" + id).then((res) => {
      const result = res.data;
      setAulas(result);
    });
  }, [id]);
  
  return (
    <Container>
      <Row className='mt-3'>
        <Col md={{ span: 10 }}>
        <Form.Group className="mb-3" controlId="searchText">
            <Form.Control
              as="textarea"
              rows={1}
              placeholder="O que você está procurando?"
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Form.Group>
         </Col>
      </Row>
      <Row xs={1} sm={1} md={2} lg={3} xl={4}className='mt-3'>
      {aulas.length > 0
          ? aulas
          .filter((textSearch) => {
            return textSearch.nome
              .toLowerCase()
              .includes(searchText.toLowerCase());
          })
          .sort((a, b) => a.nome.localeCompare(b.nome)).map((aula, index) => (
            <Col className='mb-3'>
                <Card border="primary"  style={{ width: "17rem", height: "22rem" , margin: '2px'}}>
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
                  <Card.Footer>
                    <Card.Text className='fw-bold'>{format(new Date(aula.data), 'dd/MM/yyyy hh:mm')}</Card.Text>
                  </Card.Footer>
                </Card>
              </Col>
            ))
            : null}
            </Row>
    
    </Container>
  )

}

export default Aulas;