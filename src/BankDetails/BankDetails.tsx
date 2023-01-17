// import './BankDetails.css'

import { useState } from "react"
import { Button, Container, Form } from "react-bootstrap"
import { useNavigate, useParams } from "react-router";

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
    const { bank_id } = useParams();
    const navigate = useNavigate();

    const [bank, setBank] = useState<Bank>({
        id: parseInt(bank_id || ""),
        bank_name: "ABC",
        account: "123",
        branch: "456"
    })

    return (
        <Container className="BankDetails">
            <h4>Are you sure you want to delete this bank account?</h4>
            <div className="bhub-card mb-4">
                <Form>
                    <fieldset disabled={readOnly}>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="bank-name">Bank Name</Form.Label>
                            <Form.Control id="bank-name" placeholder="Bank Name"
                                value={bank.bank_name} readOnly={readOnly}
                                onChange={e => setBank({...bank, bank_name: e.target.value})}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="branch">Branch</Form.Label>
                            <Form.Control id="branch" placeholder="Branch"
                                value={bank.branch} readOnly={readOnly}
                                onChange={e => setBank({...bank, branch: e.target.value})}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="account">Account</Form.Label>
                            <Form.Control id="account" placeholder="Account"
                                value={bank.account} readOnly={readOnly}
                                onChange={e => setBank({...bank, account: e.target.value})}/>
                        </Form.Group>
                    </fieldset>
                    <div className="d-flex justify-content-end">
                        {readOnly ?
                            <Button
                                className="btn btn-danger me-2"
                            >Delete</Button>
                            :
                            <Button
                                className="btn btn-primary me-2"
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