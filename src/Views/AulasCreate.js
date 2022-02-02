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
import { getToken } from "../Services/auth";
import ReactPlayer from 'react-player/youtube';
import ModalAulas from '../Components/ModalAulas'

const AulasCreate = () => {
  const navigate = useNavigate();
  const [aulasCreate, setAulasCreate] = useState([]);
  // const [data, setdata] = useState([]);
  const [aulaSelecionada, setAulaSelecionada] = useState({});
  const [show, setShow] = useState(false);
  const [inputs, setInputs] = useState({
    email: "",
    senha: "",
  });

  const config = { headers: { Authorization: `Bearer ${getToken()}` } };

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    api.get("aulas").then((res) => {
      const result = res.data;
      setAulasCreate(result);
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

  const handleEdit = (id, nome, id_modulo, data, url, aulas) => {
    api.put("/aulas", { nome, url, id_modulo, data }, config).then((res) => {
      const result = res.data;
      const aulasCreate = aulas.find((m) => m.id === id);
      setShow(false);
    });
  };

  function handleDelete(id) {
    debugger;
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
            <Button
              variant="secondary"
              size="md"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
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
              Criar Aulas
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
                      <Card.Text>Módulo {aula.id_modulo}</Card.Text>
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
                          setAulaSelecionada(aulasCreate);
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
