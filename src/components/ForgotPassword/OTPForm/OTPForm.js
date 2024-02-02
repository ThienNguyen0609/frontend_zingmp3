import './OTPForm.scss'

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { verifyOTP } from '../../../servives/userService';
import { showTypeToastify } from '../../../servives/toastifyService';

const OTPForm = (props) => {
    const [i1, setI1] = useState("")
    const [i2, setI2] = useState("")
    const [i3, setI3] = useState("")
    const [i4, setI4] = useState("")

    const handleSubmitForm = async (e) => {
        e.preventDefault()
        const response = await verifyOTP(i1+i2+i3+i4, props.OTPSend)
        if(response.errorCode) {
            props.form2(false)
            props.form3(true)
        }
        else {
            showTypeToastify(response.message, "warning")
        }
    }
    return (
        <div className="form-for-OTP">
            <Form onSubmit={(e)=>handleSubmitForm(e)}>
                <Form.Group className='d-flex flex-column'>
                    <Form.Text className="content-header text-center mb-2">Please enter the one time password <br /> to verify your account</Form.Text>
                    <Form.Group className='d-flex ps-5 pe-5 justify-content-around'>
                        <Form.Group className="mb-2" controlId="formBasicEmail">
                            <Form.Control 
                                autoComplete='off'
                                className='otp-input'
                                type="text"
                                name="username" value={i1}
                                onChange={(e)=>setI1(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-2" controlId="formBasicEmail">
                            <Form.Control 
                                autoComplete='off'
                                className='otp-input'
                                type="text"
                                name="username" value={i2}
                                onChange={(e)=>setI2(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-2" controlId="formBasicEmail">
                            <Form.Control 
                                autoComplete='off'
                                className='otp-input'
                                type="text"
                                name="username" value={i3}
                                onChange={(e)=>setI3(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-2" controlId="formBasicEmail">
                            <Form.Control 
                                autoComplete='off'
                                className='otp-input'
                                type="text"
                                name="username" value={i4}
                                onChange={(e)=>setI4(e.target.value)}
                            />
                        </Form.Group>
                    </Form.Group>
                    <Form.Text className="text-center text-white mb-2">OTP has been send to your email <span >Send again</span></Form.Text>
                    <Button className='btn' variant="primary" type="submit">
                        Submit
                    </Button>
                </Form.Group>
            </Form>
        </div>
    )
}

export default OTPForm