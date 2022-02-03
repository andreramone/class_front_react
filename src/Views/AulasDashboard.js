import React, { useState, useEffect } from "react";
import { Container, Row, Form, Card, Button, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../Services/api";
import { getToken, isAuthenticated, logout } from "../Services/auth";
import ReactPlayer from "react-player/youtube";
import ModalAulas from "../Components/ModalAulas";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";

const AulasDashboard = () => {
  const config = { headers: { Authorization: `Bearer ${getToken()}` } };
  const navigate = useNavigate();

  const [aulasDashboard, setAulasDashboard] = useState([]);
  const [aulaSelecionada, setAulaSelecionada] = useState({});
  const [show, setShow] = useState(false);
  const [arrModulos, setArrModulos] = useState([]);
  const [aulasArr, setAulasArr] = useState();
  const [searchText, setSearchText] = useState("");

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setAulaSelecionada({});
  };

  useEffect(() => {
    api.get("aulas").then((res) => {
      const result = res.data;
      let sortedResult = result.sort((a, b) => a.nome.localeCompare(b.nome));
      setAulasDashboard(sortedResult);
    });

    api.get("modulos").then((res) => {
      const result = res.data;
      setArrModulos(result);
    });
  }, [aulasArr]);

  const handleCreate = (nome, id_modulo, data, url) => {
    api.post("/aulas", { nome, id_modulo, data, url }, config).then((res) => {
      const result = res.data;
      setAulasArr(...aulasDashboard, result);
      setShow(false);
    });
  };

  const handleEdit = (id, nome, id_modulo, data, url, aula) => {
    api
      .put("/aulas", { id, nome, url, id_modulo, data }, config)
      .then((res) => {
        const result = res.data;
        let aulaIndex = aulasDashboard.findIndex((m) => m.id === id);
        let arrAulas = [...aulasDashboard];
        arrAulas[aulaIndex] = result;
        setAulasDashboard(arrAulas);
        setShow(false);
        setAulaSelecionada({});
      });
  };

  function handleDelete(id) {
    if (window.confirm("Você quer realmente apagar")) {
      api.delete("/aulas/" + id, config).then((res) => {
        if (res.status === 200) {
          const filteredAulas = aulasDashboard.filter((aula) => {
            return aula.id !== id;
          });
          setAulasDashboard(filteredAulas);
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
          xs={4}
          className="d-flex auth-bg"
        >
          {aulasDashboard.length > 0
            ? aulasDashboard
                .filter((textSearch) => {
                  return textSearch.nome
                    .toLowerCase()
                    .includes(searchText.toLowerCase());
                })
                .sort((a, b) => a.nome.localeCompare(b.nome))
                .map((aula, index) => (
                  <Col key={index} className="mb-3" >
                    <Card

                      border="primary"
                      style={{ width: "17rem", height: "22rem" , margin: '2px'}}
                    >
                      <Card.Body>
                        <Card.Title>{aula.nome}</Card.Title>
                        <Card.Text>
                          {
                            arrModulos.find(
                              (modulo) => modulo.id === aula.id_modulo
                            )?.nome
                          }
                        </Card.Text>
                        <ReactPlayer
                          width="100%"
                          height="auto"
                          url={aula.url}
                        />
                      </Card.Body>
                      <Card.Footer>
                        <Row>
                          <Col
                            md={{ span: 2, offset: 6 }}
                            style={{ float: "right" }}
                          >
                            <Button
                              variant="outline-secondary"
                              onClick={() => {
                                handleShow();
                                setAulaSelecionada(aula);
                              }}
                            >
                              <FaRegEdit />
                            </Button>
                          </Col>

                          <Col>
                            <Button
                              variant="outline-danger"
                              onClick={() => handleDelete(aula.id)}
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

export default AulasDashboard;
