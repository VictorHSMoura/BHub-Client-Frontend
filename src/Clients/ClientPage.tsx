import { useEffect, useState } from "react"
import { Alert, Button, Container, Form } from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Bank } from "../BankDetails/BankDetails";
import axios from "axios";
import { DB_URL } from "../constants";
import Swal from "sweetalert2";

interface Client {
    id?: number,
    corporate_name: string,
    phone: string,
    address: string,
    register_date: Date,
    declared_billing: number
    bank_details: Bank[]
}

interface ClientProps {
    readOnly: boolean
}

const ClientPage = ({readOnly} : ClientProps) => {
    const [isReadOnly, setisReadOnly] = useState(readOnly);
    const navigate = useNavigate();

    const { client_id } = useParams();
    const [client, setClient] = useState<Client>({
        corporate_name: "",
        phone: "",
        address: "",
        register_date: new Date(),
        declared_billing: 0,
        bank_details: []
    });
    const [showAlert, setShowAlert] = useState(false);

    const defaultFailAlert = () => Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'An error occurred! Please try again in a few minutes...',
        footer: '<a href="">Why do I have this issue?</a>'
    });

    const defaultSuccessAlert = (text: string) => Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: text,
        showConfirmButton: false,
        timer: 1500
    });

    useEffect(() => {
        async function fetchClients() {
            try {
                const response = await axios.get(`${DB_URL}/clients/${client_id}`);
                setClient({ ...response.data, register_date: new Date(response.data.register_date) });
            } catch {
                defaultFailAlert();
            }
        }
        if (client_id) fetchClients();
    }, [])

    const addClient = () => {
        async function createClient() {
            try {
                const { id, bank_details, ...new_client } = client;
                await axios.post(`${DB_URL}/clients`,
                    { ...new_client, register_date: new_client.register_date.toLocaleDateString('pt-br') });
                defaultSuccessAlert('Your client has been created')
                    .then(() => {
                        navigate(-1)
                    });
            } catch {
                defaultFailAlert();
            }
        }
        createClient();
    }

    const updateClient = () => {
        async function changeClient() {
            try {
                const { id, bank_details, ...new_client } = client;
                await axios.put(`${DB_URL}/clients/${client_id}`,
                    { ...new_client, register_date: new_client.register_date.toLocaleDateString('pt-br') });
                defaultSuccessAlert('Your client has been updated')
                    .then(() => setisReadOnly(true));
            } catch {
                defaultFailAlert();
            }
        }
        changeClient();
    }

    const deleteClient = () => {
        async function delClient() {
            try {
                const response = await axios.delete(`${DB_URL}/clients/${client_id}`);
                if (response.data)
                    navigate("/clients");
                else
                    defaultFailAlert();
            } catch {
                defaultFailAlert();
            }

        }
        delClient();
    }

    const bankDetails = (banks: Bank[]) => {
        return (
            banks.map((bank) => (
                <div key={bank.id} className="bhub-card mb-2">
                    <div className='d-flex justify-content-between'>
                        <div>
                            <h6>{bank.bank_name}</h6>
                            <div className='d-flex'>
                                <span className='me-2'>Branch: {bank.branch}</span>
                                <span>Account: {bank.account}</span>
                            </div>
                        </div>
                        <div className='d-flex align-items-center'>
                            <Link to={`/bank/${bank.id}`} >
                                <Button className="btn btn-warning me-2">
                                    <FontAwesomeIcon icon={faPencil} />
                                </Button>
                            </Link>
                            <Link to={`/bank/${bank.id}/delete`} >
                                <Button className="btn btn-danger">
                                    <FontAwesomeIcon icon={faTrashAlt} />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            ))
        )
    }

    return (
        <Container className="ClientPage">
            <div className="bhub-card mb-4">
                <Form>
                    <fieldset disabled={isReadOnly}>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="corporate-name">Corporate Name</Form.Label>
                            <Form.Control id="corporate-name" placeholder="Corporate Name"
                                value={client.corporate_name}
                                onChange={e => setClient({ ...client, corporate_name: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="phone">Phone</Form.Label>
                            <Form.Control id="phone" placeholder="Phone"
                                value={client.phone}
                                onChange={e => setClient({ ...client, phone: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="address">Address</Form.Label>
                            <Form.Control id="address" placeholder="Address"
                                value={client.address}
                                onChange={e => setClient({ ...client, address: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="register-date">Register Date</Form.Label>
                            <Form.Control type="date" id="register-date" placeholder="Register Date"
                                value={client.register_date.toISOString().substring(0, 10)}
                                onChange={e => setClient({ ...client, register_date: new Date(e.target.value) })} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="declared-billing">Declared Billing</Form.Label>
                            <Form.Control type="number" step="0.01" id="declared-billing" placeholder="Declared Billing"
                                value={client.declared_billing}
                                onChange={e => setClient({ ...client, declared_billing: Number(e.target.value) })} />
                        </Form.Group>
                    </fieldset>
                    <div className="d-flex justify-content-end">
                        {isReadOnly ?
                            <Button
                                className="btn btn-warning me-2"
                                onClick={() => setisReadOnly(false)}
                            >Edit</Button>
                            :
                            <Button
                                className="btn btn-success me-2"
                                onClick={() => client_id ? updateClient() : addClient()}
                            >Save</Button>
                        }
                        { client_id ?
                            <Button className="btn btn-danger"
                                onClick={() => deleteClient()}
                            >Delete</Button>
                            :
                            <Button className="btn btn-secondary"
                                onClick={() => navigate(-1)}
                            >Return</Button>
                        }
                    </div>
                </Form>
            </div>
            {client_id ?
                <>
                <div className="d-flex justify-content-between mb-2">
                    <h3>Bank Details</h3>
                    <Button
                        className="btn btn-primary"
                        onClick={_ => navigate("new_bank")}
                    >+ New Bank</Button>
                </div>
                {bankDetails(client.bank_details)}
                </>
                : ""
            }
        </Container>
    )

}

export default ClientPage
export type {
    Client
}