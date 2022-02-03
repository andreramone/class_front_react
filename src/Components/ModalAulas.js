import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";

const ModalAulas = (props) => {
  const [aulaSelecionada, setAulaSelecionada] = useState({});

  useEffect(() => {
    setAulaSelecionada({
      nome: props.aulaSelecionada.nome,
      data: props.aulaSelecionada.data,
      id_modulo: props.aulaSelecionada.id_modulo,
      url: props.aulaSelecionada.url,
    });
  }, [props]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!props.aulaSelecionada.id) {
      props.handleCreate(
        aulaSelecionada.nome,
        aulaSelecionada.id_modulo,
        aulaSelecionada.data,
        aulaSelecionada.url
      );
    } else {
      props.handleEdit(
        props.aulaSelecionada.id,
        aulaSelecionada.nome,
        aulaSelecionada.id_modulo,
        aulaSelecionada.data,
        aulaSelecionada.url
      );
    }
    props.handleClose()
  };

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
        <form onSubmit={handleSubmit}>
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
                  required={true}
                  value={aulaSelecionada.id_modulo}
                  onChange={(e) =>
                    setAulaSelecionada((aula) => ({
                      ...aula,
                      id_modulo: e.target.value,
                    }))
                  }
                  aria-label="Default select example"
                >
                  <option value={''}>Selecione um módulo</option>
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
                  type="datetime-local"
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
          <Button variant="secondary" onClick={props.handleClose}>
            Fechar
          </Button>
          <Button variant="primary" type="submit">
            {Object.keys(props.aulaSelecionada).length !== 0
              ? "Salvar"
              : "Criar"}
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalAulas;
