import React, { useState, useEffect } from "react";
import { Container, Row, Form, Card, Button, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../Services/api";
import ModalModulos from "../Components/ModalModulos";
import { getToken } from "../Services/auth";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";

const ModulosDashboard = () => {
  const navigate = useNavigate();
  const [modulos, setModulos] = useState([]);
  const [moduloSelecionado, setModuloSelecionado] = useState({});
  const [aulaSelecionada, setAulaSelecionada] = useState({});
  const [modulosArr, setModulosArr] = useState();
  const [show, setShow] = useState(false);
  const [searchText, setSearchText] = useState("");


  const config = { headers: { Authorization: `Bearer ${getToken()}` } };

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  useEffect(() => {
    api.get("modulos").then((res) => {
      const result = res.data;
      let sortedResult = result.sort((a, b) => a.nome.localeCompare(b.nome));
      setModulos(sortedResult);
    });
  }, [modulosArr]);

  const handleCreate = (nome, descricao) => {
    api.post("/modulos", { nome, descricao }, config).then((res) => {
      const result = res.data;

      setModulosArr(...modulos, result);
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
        aulaSelecionada={aulaSelecionada}
      />
      <Container>
        <Row className="mt-3">
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
          <Col>
            <Button
              variant="outline-success"
              onClick={() => {
                handleShow();
              }}
            >
              Novo
            </Button>
          </Col>
        </Row>

        <Row
          xs={3}
          className="d-flex align-items-left justify-content-md-center auth-bg px-2 p-lg-5 mx-auto"
        >
          {modulos.length > 0
            ? modulos.filter((textSearch) => {
              return textSearch.nome
                .toLowerCase()
                .includes(searchText.toLowerCase());
            })
            .sort((a, b) => a.nome.localeCompare(b.nome))
            
            .map((modulo, index) => (
                <Col key={index} className="mb-3">
                  <Card
                    border="primary"
                    style={{ width: "18rem", height: "18rem" }}
                  >
                    <Card.Body>
                      <Card.Title>{modulo.nome}</Card.Title>
                      <Card.Text>{modulo.descricao}</Card.Text>
                      <Card.Text> {modulo.aulas} Aula(s)</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      <Row className="mb-0">
                        <Col md={{ span: 2 }}>
                          <Button
                            variant="primary"
                            onClick={() => navigate("/aulas/" + modulo.id)}
                          >
                            Aulas
                          </Button>
                        </Col>

                        <Col
                          md={{ span: 2, offset: 5 }}
                          style={{ float: "right" }}
                        >
                          <Button
                            variant="outline-secondary"
                            onClick={() => {
                              handleShow();
                              setModuloSelecionado(modulo);
                            }}
                          >
                            <FaRegEdit />
                          </Button>
                        </Col>

                        <Col>
                          <Button
                            variant="outline-danger"
                            onClick={() => handleDelete(modulo.id)}
                          >
                            <FaTrashAlt />
                          </Button>
                        </Col>
                      </Row>
                    </Card.Footer>
                  </Card>
                </Col>
              ))
            : null}
        </Row>
      </Container>
    </>
  );
};

export default ModulosDashboard;
