import './UsernameOrEmailForm.scss'

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { checkAndSendEmailService } from '../../../servives/userService';
import { showTypeToastify } from '../../../servives/toastifyService';

const UsernameOrEmailForm = (props) => {
    const [value, setValue] = useState("")

    const handleSubmitForm = async (e) => {
        e.preventDefault()
        const response = await checkAndSendEmailService(value)
        if(response.response.errorCode) {
            props.setUsernameOrEmail(value)
            props.form1(false)
            props.form2(true)
            props.setOTP(response.OTP)
        }
        else {
            showTypeToastify(response.message, "warning")
        }
    }

    return (
        <div className="form-for-UoE">
            <Form onSubmit={(e)=>handleSubmitForm(e)}>
                <Form.Group className='d-flex flex-column'>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control 
                            type="text" placeholder="Username or email" 
                            name="username" value={value}
                            onChange={(e)=>setValue(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form.Group>
            </Form>
        </div>
    )
}

export default UsernameOrEmailForm