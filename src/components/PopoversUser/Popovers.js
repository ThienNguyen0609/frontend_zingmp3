import './Popovers.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

const Container = ({children, className}) => {
    return (
        <div className={`popovers-container ${className ? className : ""}`}>
            {children}
        </div>
    )
}

const Header = ({user}) => {
    return (
        <div className='popovers-header'>
            <div className='user-icon'>
                <FontAwesomeIcon icon={faUser} />
            </div>
            <div className='user-content'>
            {user && 
                <>
                <h4 className='user-username'>{user.username}</h4>
                <p className='user-caterogy'>{user.category.type}</p>
                </>
            }
            </div>
        </div>
    )
}

const Body = ({children, className}) => {
    return (
        <div className={`popovers-body ${className ? className : ""}`}>
            {children}
        </div>
    )
}

export default {
    Container: Container,
    Header: Header,
    Body: Body
}