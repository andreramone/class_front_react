import React, { useState, useEffect } from "react";
import { Container, Row, Form, Card, Button, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../Services/api";
import { logout, isAuthenticated } from "../Services/auth";

const Modulos = () => {
  const navigate = useNavigate();
  const [modulos, setModulos] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    api.get("modulos").then((res) => {
      const result = res.data;
      setModulos(result);
    });
  }, []);

  return (
    <Container>
      <Row className="mt-3">
        <Col md={{ span: 12 }}>
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

      <Row
        xs={3}
        className="d-flex align-items-center justify-content-md-center auth-bg px-2 p-lg-5 mx-auto"
      >
        {modulos.length > 0
          ? modulos
              .filter((textSearch) => {
                return textSearch.nome
                  .toLowerCase()
                  .includes(searchText.toLowerCase());
              })
              .sort((a, b) => a.nome.localeCompare(b.nome))
              .map((modulo, index) => (
                <Col key={index} className="mb-3">
                  <Card border="primary" style={{ width: "18rem", height: "18rem" }}>
                    <Card.Body>
                      <Card.Title>{modulo.nome}</Card.Title>
                      <Card.Text>{modulo.descricao}</Card.Text>
                      <Card.Text> {modulo.aulas} Aula(s)</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                    <Button
                        variant="primary"
                        onClick={() => navigate("/aulas/" + modulo.id)}
                      >
                        Aulas
                      </Button>
                    </Card.Footer>
                  </Card>
                </Col>
              ))
          : null}
      </Row>
    </Container>
  );
};

export default Modulos;
