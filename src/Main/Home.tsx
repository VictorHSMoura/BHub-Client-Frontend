import './Home.css';

import axios from 'axios';
import { Link } from 'react-router-dom';
import { Client } from '../Clients/ClientPage';

import { Container, Row } from 'react-bootstrap';
import Card from '../Clients/Card';
import { useEffect, useState } from 'react';
import { DB_URL } from '../constants';

function Home() {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    async function fetchClients() {
      let fetchedClients: Client[] = []
      const response = await axios.get(`${DB_URL}/clients`);
      response.data.forEach((client: Client) => {
        fetchedClients.push(client);
      })
      setClients(fetchedClients);
    }

    fetchClients();
  }, [])

  function displayClients(): JSX.Element[] {
    return clients.map((client) => (
      <Row key={client.id} className='justify-content-center mb-4'>
        <Card index={client.id || 1} clientName={client.corporate_name} />
      </Row>
    ))
  }

  return (
    <Container className='Home p-4'>
      <Row>
        <div className='d-flex justify-content-end p-0 mb-4'>
          <Link to="/new_client">
            <button type='button' className='btn btn-success float-right'>+ Novo Cliente</button>
          </Link>
        </div>
      </Row>
      {displayClients()}
    </Container>

  );
}

export default Home;
