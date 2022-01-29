import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  FormControl,
  Card,
  Button,
  Col,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../Services/api";

const Modulos = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.get("modulos").then((res) => {
      const result = res.data;
      debugger;
      setCards(result);
    });
  }, []);

  return (
    <Container>
      <Row className="mt-3">
        <Col md={{ span: 10 }}>
          <FormControl
            type="text"
            id="search"
            placeholder="O que você está procurando?"
          ></FormControl>
        </Col>
        <Col xs={{ span: 2 }}>
          <Button
            variant="secondary"
            size="md"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </Col>
      </Row>

      <Row
        xs={3}
        className="d-flex align-items-center justify-content-md-center auth-bg px-2 p-lg-5 mx-auto"
      >
        {cards.length > 0
          ? cards.map((card, index) => (
              <Col key={index} className="mb-3">
                <Card border="primary" style={{ width: "18rem" }}>
                  <Card.Body>
                    <Card.Title>{card.nome}</Card.Title>
                    <Card.Text>{card.descricao}</Card.Text>
                    <Card.Text>{}</Card.Text>
                    <Button
                      variant="primary"
                      onClick={() => navigate("/aulas")}
                    >
                      Aulas
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          : null}
      </Row>
    </Container>
  );
};

export default Modulos;
