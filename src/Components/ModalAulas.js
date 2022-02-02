import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import api from "../Services/api";

const ModalAulas = (props) => {
  const [aulas, setAulas] = useState([]);
  const [data, setdata] = useState([]);
  const [dataRealizacao, setDatarealizacao] = useState([]);

  const [show, setShow] = useState(false);
  const [nome, setNome] = useState([]);
  const [aulaSelecionada, setAulaSelecionada] = useState({});


  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  useEffect(() => {
    setNome(props.aulaSelecionada.nome);
    
  }, [props]);

  function openModalDelete(id) {
    if (window.confirm("Você quer realmente apagar????")) {
      api.delete("/aulas/" + id).then((res) => {
        debugger;
        if (res.status === 200) {
          const filtereddata = data.filter((aulas) => {
            return aulas.id !== id;
          });
          setdata(filtereddata);
          setShow(false)
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
                  value={nome}
                  name="nome"
                  onChange={(e) => setNome(e.target.value)}
                  required
                />
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
                  type="date"
                  value={data}
                  name="data"
                  onChange={(e) => setDatarealizacao(e.target.value)}
                  required
                />
              </div>
            </div>


            <div className="row mb-3">
              <div className="col-md-2 ">
                <label className="form-label" htmlFor="descricao">
                  Url da aula:
                </label>
              </div>
              <div className="col-md-10">
                <input
                  className="form-control"
                  type="text"
                  value={aulas.url}
                  name="descricao"
                  onChange={(e) => setAulas(e.target.value)}
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

        {props.aulaSelecionada ? (
          <Button
            variant="primary"
            onClick={() => props.handleEdit(props.aulaSelecionada.id, nome)}
          >
            Salvar
          </Button>
        ) : (
          <Button
            variant="primary"
            onClick={() => props.handleCreate(nome)}
          >
            Criar
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAulas;
