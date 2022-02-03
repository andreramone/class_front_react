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
import { getToken, isAuthenticated, logout } from "../Services/auth";
import ReactPlayer from 'react-player/youtube';
import ModalAulas from '../Components/ModalAulas'

const AulasCreate = () => {
  const config = { headers: { Authorization: `Bearer ${getToken()}` } };
  const navigate = useNavigate();

  const [aulasCreate, setAulasCreate] = useState([]);
  const [aulaSelecionada, setAulaSelecionada] = useState({});
  const [show, setShow] = useState(false);
  const [arrModulos, setArrModulos] = useState([]);

  const handleClose = () => {setShow(false); setAulaSelecionada({})};
  const handleShow = () => setShow(true);

  useEffect(() => {
    api.get("aulas").then((res) => {
      const result = res.data;
      setAulasCreate(result);
    });

    api.get("modulos").then((res) => {
      const result = res.data;
      setArrModulos(result);
    });
  }, []);

  const handleCreate = (nome, id_modulo, data, url) => {
    api.post("/aulas", { nome, id_modulo, data, url }, config).then((res) => {
      const result = res.data;
      const aulasCreateArr = aulasCreate;
      aulasCreateArr.push(result);
      setAulasCreate(aulasCreateArr);
      setShow(false);
    });
  };

  const handleEdit = (id, nome, id_modulo, data, url, aula) => {
    api.put("/aulas", { id, nome, url, id_modulo, data }, config).then((res) => {
      const result = res.data;
      let aulaIndex = aulasCreate.findIndex((m) => m.id === id);
      let arrAulas = [...aulasCreate]
      arrAulas[aulaIndex] = result
      setAulasCreate(arrAulas)
      setShow(false);
      setAulaSelecionada({})
    });
  };

  function handleDelete(id) {
    if (window.confirm("Você quer realmente apagar")) {
      api.delete("/aulas/" + id, config).then((res) => {
        if (res.status === 200) {
          const filteredAulas = aulasCreate.filter((aula) => {
            return aula.id !== id;
          });
          setAulasCreate(filteredAulas);
        }
      });
    }
  }

  return (
    <>
      <ModalAulas
        show={show}
        handleClose={() => handleClose()}
        handleCreate={handleCreate}
        handleEdit={handleEdit}
        aulaSelecionada={aulaSelecionada}
        arrModulos={arrModulos}
      />
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

        <Row className="mt-3">
          <Col>
            <Button
              variant="primary"
              onClick={() => {
                handleShow();
              }}
            >
              Criar Aula
            </Button>
          </Col>
        </Row>

        <Row
          xs={3}
          className="d-flex align-items-left justify-content-md-center auth-bg px-2 p-lg-5 mx-auto"
        >
          {aulasCreate.length > 0
            ? aulasCreate.map((aula, index) => (
                <Col key={index} className="mb-3">
                  <Card border="primary" style={{ width: "18rem" }}>
                    <Card.Body>
                      <Card.Title>{aula.nome}</Card.Title>
                      <Card.Text>{arrModulos.find(modulo => modulo.id === aula.id_modulo)?.nome}</Card.Text>
                      <ReactPlayer 
                        width='100%' 
                        height='100%' 
                        url={aula.url} />
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(aula.id)}
                      >
                        Apagar
                      </Button>

                      <Button
                        variant="secondary"
                        onClick={() => {
                          handleShow();
                          setAulaSelecionada(aula);
                        }}
                      >
                        Editar
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            : null}
        </Row>
      </Container>
    </>
  );
};

export default AulasCreate;
