import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";


const ModalModulos = (props) => {
  const [nome, setNome] = useState([]);
  const [descricao, setDescricao] = useState([]);

  useEffect(() => {
    setNome(props.moduloSelecionado.nome);
    setDescricao(props.moduloSelecionado.descricao);
  }, [props]);

  return (
    <Modal
      size="md"
      show={props.show}
      onHide={props.handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Crie seu novo módulo</Modal.Title>
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
                  value={nome}
                  name="nome"
                  onChange={(e) => setNome(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-2 ">
                <label className="form-label" htmlFor="descricao">
                  Descrição:
                </label>
              </div>
              <div className="col-md-10">
                <input
                  className="form-control"
                  type="text"
                  value={descricao}
                  name="descricao"
                  onChange={(e) => setDescricao(e.target.value)}
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

        {Object.keys(props.moduloSelecionado).length !== 0 ? (
          <Button
            variant="primary"
            onClick={() => props.handleEdit(props.moduloSelecionado.id, nome, descricao)}
          >
            Salvar
          </Button>
        ) : (
          <Button
            variant="primary"
            onClick={() => props.handleCreate(nome, descricao)}
          >
            Criar
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default ModalModulos;
