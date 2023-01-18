import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap"
import { useNavigate } from "react-router";

const GoBackButton = () => {
    const navigate = useNavigate();
    return (
        <div className="d-flex justify-content-start mb-3">
            <Button className="btn btn-light"
                onClick={() => navigate(-1)}>
                <FontAwesomeIcon icon={faArrowLeft} className="me-2"/>
                Go Back
            </Button>
        </div>
    )

}

export default GoBackButton;