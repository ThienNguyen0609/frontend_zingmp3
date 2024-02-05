import './PopoversUser.scss'

import Popovers from './Popovers';

const PopoversUser = (props) => {
    return (
        <>
        {props.show && (
        <Popovers.Container>
            <Popovers.Header user={props.user} />
            <Popovers.Body>
                {props.children}
            </Popovers.Body>
        </Popovers.Container>
        )}
        </>
    )
}

export default PopoversUser