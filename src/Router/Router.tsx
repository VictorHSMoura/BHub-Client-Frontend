import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom"
import BankDetails from "../BankDetails/BankDetails"
import ClientPage from "../Clients/ClientPage"
import Home from "../Main/Home"

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/clients" />} />
                <Route path="/clients" element={<Home />} />
                <Route path="/client/:client_id" element={<ClientPage />} />
                <Route path="/client/:client_id/new_bank" element={<BankDetails readOnly={false} />} />
                <Route path="/bank/:bank_id" element={<BankDetails readOnly={false}/>} />
                <Route path="/bank/:bank_id" element={<BankDetails readOnly={false}/>} />
                <Route path="/bank/:bank_id/delete" element={<BankDetails readOnly={true}/>} />
                <Route path="*" element={<Navigate to="/clients" />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router