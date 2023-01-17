import './Home.css';
import { Container, Row } from 'react-bootstrap';
import Card from '../Clients/Card';

function Home() {
  function set10Clients(): JSX.Element[] {
    let returnDivs: JSX.Element[] = [];
    for (let index = 1; index <= 10; index++) {
      returnDivs.push(
        <Row key={index} className='justify-content-center mb-4'>
          <Card index={index} clientName={"Client Name"} />
        </Row>
      );
    }
    return returnDivs;
  }

  return (
    <Container className='Home p-4'>
      <Row>
        <div className='d-flex justify-content-end p-0 mb-4'>
          <button type='button' className='btn btn-success float-right'>+ Novo Cliente</button>
        </div>
      </Row>
      {set10Clients()}
    </Container>

  );
}

export default Home;
