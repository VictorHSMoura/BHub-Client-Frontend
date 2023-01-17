import './App.css';
import { Container, Row } from 'react-bootstrap';
import Card from './Clients/Card/Card';

function App() {
  function set10Clients(): JSX.Element[] {
    let returnDivs: JSX.Element[] = [];
    for (let index = 1; index <= 10; index++) {
      returnDivs.push(
        <Row className='justify-content-center mb-4'>
          <Card index={index} clientName={"Client Name"} />
        </Row>
      );
    }
    return returnDivs;
  }

  return (<>
    <div className='title d-flex justify-content-center align-items-center p-2'>
      <img src="https://s39331.pcdn.co/wp-content/themes/bhub/assets/images/logos/logo-bhub.svg" alt="BHub" title="BHub"
           width="120" height="33" data-src="https://s39331.pcdn.co/wp-content/themes/bhub/assets/images/logos/logo-bhub.svg" decoding="async" className="lazyloaded"/>
      <h2 className='m-0 ms-2 align-self-center'>Clients</h2>
    </div>
    <Container className='Main p-4'>
      <Row>
        <div className='d-flex justify-content-end p-0 mb-4'>
          <button type='button' className='btn btn-success float-right'>+ Novo Cliente</button>
        </div>
      </Row>
      {set10Clients()}
    </Container>
    </>
  );
}

export default App;
