import { Container, Row, FormControl, Card, Button, Col } from 'react-bootstrap';


const Modulos = () => {
  return (
    <Container>
      <Row className='mt-3'>
        <FormControl type='text' id='search' placeholder='O que você está procurando?'></FormControl>
      </Row>
      <Row xs={3} className='d-flex align-items-center justify-content-md-center auth-bg px-2 p-lg-5 mx-auto'>
        <Col className='mb-3'>
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Módulo 1</Card.Subtitle>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
              </Card.Text>
              <Button variant='primary'>Aulas</Button>
            </Card.Body>
          </Card>
        </Col>

        <Col className='mb-3'>
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Módulo 2</Card.Subtitle>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
              </Card.Text>
              <Button variant='primary'>Aulas</Button>
            </Card.Body>
          </Card>
        </Col>


        <Col className='mb-3'>
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Módulo 3</Card.Subtitle>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
              </Card.Text>
              <Button variant='primary'>Aulas</Button>
            </Card.Body>
          </Card>
        </Col>

        <Col className='mb-3'>
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Módulo 3</Card.Subtitle>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
              </Card.Text>
              <Button variant='primary'>Aulas</Button>
            </Card.Body>
          </Card>
        </Col>

        <Col className='mb-3'>
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Módulo 3</Card.Subtitle>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
              </Card.Text>
              <Button variant='primary'>Aulas</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )

}

export default Modulos;