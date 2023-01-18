// import './BankDetails.css'

import axios from "axios";
import { useEffect, useState } from "react"
import { Alert, Button, Container, Form } from "react-bootstrap"
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import { DB_URL } from "../constants";

interface BankDetailsProps {
    readOnly: boolean
}

interface Bank {
    id?: number,
    bank_name: string,
    account: string,
    branch: string
}

const BankDetails = ({ readOnly }: BankDetailsProps) => {

    // TODO: if id is not undefined. Load data from DB.
    const { client_id, bank_id } = useParams();
    const navigate = useNavigate();

    const [bank, setBank] = useState<Bank>({
        bank_name: "",
        account: "",
        branch: ""
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
        async function fetchBank() {
            try {
                const response = await axios.get(`${DB_URL}/bank_details/${bank_id}`);
                setBank(response.data);
            } catch {
                defaultFailAlert();
            }
        }
        if (bank_id) fetchBank();
    }, [])

    const deleteBank = () => {
        async function delBank() {
            try {
                const response = await axios.delete(`${DB_URL}/bank_details/${bank_id}`);
                if (response.data) {
                    defaultSuccessAlert("Your bank was successful deleted.");
                    navigate(-1);
                }
                else defaultFailAlert();
            } catch {
                defaultFailAlert();
            }
        }
        delBank();
    }

    const addBank = () => {
        async function createBank() {
            try {
                const { id, ...new_bank } = bank;
                await axios.post(`${DB_URL}/bank_details/client/${client_id}`, new_bank);
                defaultSuccessAlert("Your bank has been created")
                    .then(() => {
                        navigate(-1)
                    });
            } catch {
                defaultFailAlert();
            }
        }
        createBank();
    }

    const updateBank = () => {
        async function changeBank() {
            try {
                const { id, ...new_bank } = bank;
                await axios.put(`${DB_URL}/bank_details/${bank_id}`, new_bank);
                defaultSuccessAlert("Your bank has been updated")
                    .then(() => {
                        navigate(-1)
                    });
            } catch {
                defaultFailAlert();
            }
        }
        changeBank();
    }

    return (
        <Container className="BankDetails">
            {readOnly ?
                <h4>Are you sure you want to delete this bank account?</h4> : ""
            }
            <div className="bhub-card mb-4">
                <Form>
                    <fieldset disabled={readOnly}>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="bank-name">Bank Name</Form.Label>
                            <Form.Control id="bank-name" placeholder="Bank Name"
                                value={bank.bank_name} readOnly={readOnly}
                                onChange={e => setBank({ ...bank, bank_name: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="branch">Branch</Form.Label>
                            <Form.Control id="branch" placeholder="Branch"
                                value={bank.branch} readOnly={readOnly}
                                onChange={e => setBank({ ...bank, branch: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="account">Account</Form.Label>
                            <Form.Control id="account" placeholder="Account"
                                value={bank.account} readOnly={readOnly}
                                onChange={e => setBank({ ...bank, account: e.target.value })} />
                        </Form.Group>
                    </fieldset>
                    <div className="d-flex justify-content-end">
                        {readOnly ?
                            <Button
                                className="btn btn-danger me-2"
                                onClick={() => deleteBank()}
                            >Delete</Button>
                            :
                            <Button
                                className="btn btn-primary me-2"
                                onClick={() => bank_id ? updateBank() : addBank()}
                            >Save</Button>
                        }
                        <Button className="btn btn-secondary" onClick={() => navigate(-1)}>Return</Button>
                    </div>
                </Form>
            </div>
        </Container>
    )

}

export default BankDetails
export type {
    Bank
}