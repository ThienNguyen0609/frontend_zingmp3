import './PasswordForm.scss'

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { changeUserPassword, verifyOTP } from '../../../servives/userService';
import { showTypeToastify } from '../../../servives/toastifyService';
import { useNavigate } from 'react-router-dom';

const PasswordForm = ({usernameOrEmail}) => {
    const navigate = useNavigate()
    const [password, setPassword] = useState("")
    const [retypePassword, setRetypePassword] = useState("")

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        if(password === retypePassword) {
            const response = await changeUserPassword(password, usernameOrEmail)
            if(response.errorCode) {
                showTypeToastify(response.message, "success")
                navigate('/login')
            }
            else {
                showTypeToastify(response.message, "success")
            }
        }
    }
    return (
        <div className="form-for-P">
            <Form onSubmit={(e)=>handleSubmitForm(e)}>
                <Form.Group className='d-flex flex-column'>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control 
                            type="text" placeholder="Password" 
                            name="username" value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control 
                            type="text" placeholder="Retype password" 
                            name="username" value={retypePassword}
                            onChange={(e)=>setRetypePassword(e.target.value)}
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

export default PasswordForm