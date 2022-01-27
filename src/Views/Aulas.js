import { Container, Row, FormControl, Card, Button, Col } from 'react-bootstrap';
import ReactPlayer from 'react-player/youtube';

const Aulas = () => {
  return (
    <Container>
      <Row className='mt-3'>
        <Col>
          <FormControl type='text' id='search' placeholder='O que você está procurando?'></FormControl>
        </Col>
      </Row>
      <Row xs={3} className='mt-3'>
      <Col className='mb-3'>
          <Card border="primary" style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>Modulo 1</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                <ReactPlayer 
                  width='100%' 
                  height='100%' 
                  url="https://www.youtube.com/watch?v=sBhsXsISeRE&ab_channel=Rocketseat" />
              </Card.Subtitle>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
              </Card.Text>
            </Card.Body>
            <Card.Body>
              <Card.Text className='fw-bold'>Data: 28/01/2022 20:30</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col className='mb-3'>
          <Card border="primary" style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>Modulo 1</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                <ReactPlayer 
                  width='100%' 
                  height='100%' 
                  url="https://www.youtube.com/watch?v=sBhsXsISeRE&ab_channel=Rocketseat" />
              </Card.Subtitle>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
              </Card.Text>
            </Card.Body>
            <Card.Body>
              <Card.Text className='fw-bold'>Data: 28/01/2022 20:30</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col className='mb-3'>
          <Card border="primary" style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>Modulo 1</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                <ReactPlayer 
                  width='100%' 
                  height='100%' 
                  url="https://www.youtube.com/watch?v=sBhsXsISeRE&ab_channel=Rocketseat" />
              </Card.Subtitle>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
              </Card.Text>
            </Card.Body>
            <Card.Body>
              <Card.Text className='fw-bold'>Data: 28/01/2022 20:30</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col className='mb-3'>
          <Card border="primary" style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>Modulo 1</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                <ReactPlayer 
                  width='100%' 
                  height='100%' 
                  url="https://www.youtube.com/watch?v=sBhsXsISeRE&ab_channel=Rocketseat" />
              </Card.Subtitle>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
              </Card.Text>
            </Card.Body>
            <Card.Body>
              <Card.Text className='fw-bold'>Data: 28/01/2022 20:30</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col className='mb-3'>
          <Card border="primary" style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>Modulo 1</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                <ReactPlayer 
                  width='100%' 
                  height='100%' 
                  url="https://www.youtube.com/watch?v=sBhsXsISeRE&ab_channel=Rocketseat" />
              </Card.Subtitle>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
              </Card.Text>
            </Card.Body>
            <Card.Body>
              <Card.Text className='fw-bold'>Data: 28/01/2022 20:30</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col className='mb-3'>
          <Card border="primary" style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>Modulo 1</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                <ReactPlayer 
                  width='100%' 
                  height='100%' 
                  url="https://www.youtube.com/watch?v=sBhsXsISeRE&ab_channel=Rocketseat" />
              </Card.Subtitle>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
              </Card.Text>
            </Card.Body>
            <Card.Body>
              <Card.Text className='fw-bold'>Data: 28/01/2022 20:30</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )

}

export default Aulas;