import { useState } from "react"
import { Button, Container, Form } from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { Bank } from "../BankDetails/BankDetails";

interface Client {
    corporate_name: string,
    phone: string,
    address: string,
    register_date: Date,
    declared_billing: number
}

const ClientPage = () => {
    const [readOnly, setReadOnly] = useState(true);
    const history = useNavigate();

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

    const banks: Bank[] = [
        { id: 1, bank_name: "ABC", account: "123", branch: "456" },
        { id: 2, bank_name: "ABC", account: "123", branch: "456" },
        { id: 3, bank_name: "ABC", account: "123", branch: "456" },
        { id: 4, bank_name: "ABC", account: "123", branch: "456" }
    ]

    const [client, setClient] = useState<Client>({
        corporate_name: "João do ABC",
        address: "Rua dos 12, Mangabeiras",
        phone: "31987453030",
        register_date: new Date(),
        declared_billing: 15000.00
    })

    return (
        <Container className="ClientPage">
            <div className="bhub-card mb-4">
                <Form>
                    <fieldset disabled={readOnly}>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="corporate-name">Corporate Name</Form.Label>
                            <Form.Control id="corporate-name" placeholder="Corporate Name"
                            value={client.corporate_name}
                            onChange={e => setClient({...client, corporate_name: e.target.value})} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="phone">Phone</Form.Label>
                            <Form.Control id="phone" placeholder="Phone"
                            value={client.phone}
                            onChange={e => setClient({...client, phone: e.target.value})} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="address">Address</Form.Label>
                            <Form.Control id="address" placeholder="Address"
                            value={client.address}
                            onChange={e => setClient({...client, address: e.target.value})} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="register-date">Register Date</Form.Label>
                            <Form.Control type="date" id="register-date" placeholder="Register Date"
                                value={client.register_date.toISOString().substring(0,10)}
                                onChange={e => setClient({...client, register_date: new Date(e.target.value)})} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="declared-billing">Declared Billing</Form.Label>
                            <Form.Control id="declared-billing" placeholder="Declared Billing"
                            value={client.declared_billing}
                            onChange={e => setClient({...client, declared_billing: parseFloat(e.target.value)})} />
                        </Form.Group>
                    </fieldset>
                    <div className="d-flex justify-content-end">
                        {readOnly ?
                            <Button
                                className="btn btn-warning me-2"
                                onClick={() => setReadOnly(false)}
                            >Edit</Button>
                            :
                            <Button
                                className="btn btn-success me-2"
                                onClick={() => setReadOnly(true)}
                            >Save</Button>
                        }
                        <Button type="submit" className="btn btn-danger">Delete</Button>
                    </div>
                </Form>
            </div>
            <div className="d-flex justify-content-between mb-2">
                <h3>Bank Details</h3>
                <Button
                    className="btn btn-primary"
                    onClick={_ => history("new_bank")}
                >+ New Bank</Button>
            </div>
            {bankDetails(banks)}
        </Container>
    )
}

export default ClientPage