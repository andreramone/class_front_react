import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import api from "../Services/api";

const ModalAulas = (props) => {
  const [data, setdata] = useState([]);
  const [show, setShow] = useState(false);
  const [aulaSelecionada, setAulaSelecionada] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setAulaSelecionada({
      nome: props.aulaSelecionada.nome,
      data: props.aulaSelecionada.data,
      id_modulo: props.aulaSelecionada.id_modulo,
      url: props.aulaSelecionada.url,
    });
  }, [props]);

  function openModalDelete(id) {
    if (window.confirm("Deseja realmente apagar?")) {
      api.delete("/aulas/" + id).then((res) => {
        debugger;
        if (res.status === 200) {
          const filtereddata = data.filter((aulas) => {
            return aulas.id !== id;
          });
          setdata(filtereddata);
          setShow(false);
        }
      });
    }
  }

  return (
    <Modal
      size="md"
      show={props.show}
      onHide={props.handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Crie sua nova Aula</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <fieldset>
            <div className="row mb-3">
              <div className="col-md-2 ">
                <label className="form-label" htmlFor="nome">
                  Nome:
                </label>
              </div>
              <div className="col-md-10">
                <input
                  className="form-control"
                  type="text"
                  value={aulaSelecionada.nome}
                  name="nome"
                  onChange={(e) =>
                    setAulaSelecionada((aula) => ({
                      ...aula,
                      nome: e.target.value,
                    }))
                  }
                  required
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-2 ">
                <label className="form-label" htmlFor="modulo">
                  Módulo:
                </label>
              </div>
              <div className="col-md-10">
                <Form.Select
                  required
                  value={aulaSelecionada.id_modulo}
                  onChange={(e) =>
                    setAulaSelecionada((aula) => ({
                      ...aula,
                      id_modulo: e.target.value,
                    }))
                  }
                  aria-label="Default select example"
                >
                  {props.arrModulos.map((modulo, index) => {
                    return (
                      <option key={index} value={modulo.id}>
                        {modulo.nome}
                      </option>
                    );
                  })}
                </Form.Select>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-2 ">
                <label className="form-label" htmlFor="nome">
                  Data da realização:
                </label>
              </div>
              <div className="col-md-10">
                <input
                  className="form-control"
                  type="text"
                  value={aulaSelecionada.data}
                  name="data"
                  onChange={(e) =>
                    setAulaSelecionada((aula) => ({
                      ...aula,
                      data: e.target.value,
                    }))
                  }
                  required
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-2 ">
                <label className="form-label" htmlFor="aulasUrl">
                  Link da Aula:
                </label>
              </div>
              <div className="col-md-10">
                <input
                  className="form-control"
                  type="text"
                  value={aulaSelecionada.url}
                  name="aulasUrl"
                  onChange={(e) =>
                    setAulaSelecionada((aula) => ({
                      ...aula,
                      url: e.target.value,
                    }))
                  }
                  required
                />
              </div>
            </div>
          </fieldset>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Fechar
        </Button>

        {Object.keys(props.aulaSelecionada).length !== 0 ? (
          <Button
            variant="primary"
            onClick={() =>
              props.handleEdit(
                props.aulaSelecionada.id,
                aulaSelecionada.nome,
                aulaSelecionada.id_modulo,
                aulaSelecionada.data,
                aulaSelecionada.url
              )
            }
          >
            Salvar
          </Button>
        ) : (
          <Button
            variant="primary"
            onClick={() =>
              props.handleCreate(
                aulaSelecionada.nome,
                aulaSelecionada.id_modulo,
                aulaSelecionada.data,
                aulaSelecionada.url
              )
            }
          >
            Criar
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAulas;
