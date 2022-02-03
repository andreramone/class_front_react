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
import ModalModulos from "../Components/ModalModulos";
import ModalAulas from "../Components/ModalAulas";
import { getToken, isAuthenticated, logout } from "../Services/auth";
import { id } from "date-fns/locale";

const Dashboard = () => {
  const navigate = useNavigate();
  const [modulos, setModulos] = useState([]);
  // const [data, setdata] = useState([]);
  const [moduloSelecionado, setModuloSelecionado] = useState({});
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
    api.get("modulos").then((res) => {
      const result = res.data;
      setModulos(result);
    });
  }, []);

  const handleCreate = (nome, descricao) => {
    api.post("/modulos", { nome, descricao }, config).then((res) => {
      const result = res.data;
      const modulosArr = modulos;
      modulosArr.push(result);
      setModulos(modulosArr);
      setShow(false);
    });
  };

  const handleEdit = (id, nome, descricao) => {
    api.put("/modulos", { id, nome, descricao }, config).then((res) => {
      const result = res.data;
      const modulo = modulos.find((m) => m.id === id);
      modulo.nome = result.nome;
      modulo.descricao = result.descricao;

      setShow(false);
    });
  };

  function handleDelete(id) {
    if (window.confirm("Você quer realmente apagar?")) {
      api.delete("/modulos/" + id, config).then((res) => {
        if (res.status === 200) {
          const filteredModulos = modulos.filter((modulo) => {
            return modulo.id !== id;
          });
          setModulos(filteredModulos);
        }
      });
    }
  }

  return (
    <>
      <ModalModulos
        show={show}
        handleClose={() => handleClose()}
        handleCreate={handleCreate}
        handleEdit={handleEdit}
        moduloSelecionado={moduloSelecionado}
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
              Criar Módulo
            </Button>
          </Col>
        </Row>

        <Row
          xs={3}
          className="d-flex align-items-left justify-content-md-center auth-bg px-2 p-lg-5 mx-auto"
        >
          {modulos.length > 0
            ? modulos.map((modulo, index) => (
                <Col key={index} className="mb-3">
                  <Card border="primary" style={{ width: "18rem" }}>
                    <Card.Body>
                      <Card.Title>{modulo.nome}</Card.Title>
                      <Card.Text>{modulo.descricao}</Card.Text>
                      <Card.Text> {modulo.aulas} Aula(s)</Card.Text>
                      <Button
                        variant="primary"
                        onClick={() => navigate("/aulas/" + modulo.id)}
                      >
                        Aulas
                      </Button>

                      <Button
                        variant="danger"
                        onClick={() => handleDelete(modulo.id)}
                      >
                        Apagar Módulo
                      </Button>

                      <Button
                        variant="secondary"
                        onClick={() => {
                          handleShow();
                          setModuloSelecionado(modulo);
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

export default Dashboard;
