import './Card.css'

interface CardProps {
    index: number,
    clientName: string
}

const Card = ({ index, clientName } : CardProps) => {
    return (
        <a className="Card d-flex align-items-center" href={`/clients/${index}`}>
            <div className='d-flex'>
                <div className='client-id'>{index}</div>
                <div className='client-name'>{clientName}</div>
            </div>
        </a>
    )
}

export default Card;