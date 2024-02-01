import './Register.scss'
import 'react-toastify/dist/ReactToastify.css';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ZingContent from '../ZingContent';
import { isValidInput } from '../../servives/registerFormService';
import { registerService } from '../../servives/userService';
import { showTypeToastify } from '../../servives/toastifyService';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'

const Register = () => {
    const navigate = useNavigate()
    const [isShowPassword, setIsShowPassword] = useState(false)
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false)
    const [valueInput, setValueInput] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''    
    })

    const defaultValidInput = {
        isValid: {
            name: false,
            username: false,
            email: false,
            password: false,
            confirmPassword: false
        }
    }
    const [objCheckInput, setObjCheckInput] = useState(defaultValidInput)

    const handleSubmitForm = async (e) => {
        e.preventDefault()
        const user = {
            Name: valueInput.name,
            UserName: valueInput.username,
            Email: valueInput.email,
            Password: valueInput.password,
            ConfirmPassword: valueInput.confirmPassword
        }
        const {isValid, validAttr} = isValidInput(valueInput)
        setObjCheckInput(defaultValidInput)
        if(isValid) {
            setObjCheckInput({
                isValid: {
                    ...defaultValidInput.isValid,
                    [validAttr]: true
                }
            })
        }
        else {
            const res = await registerService(user)
            const errorCode = res.errorCode
            const errorMessage = res.message
            if(errorCode) {
                showTypeToastify(errorMessage, "success")
                setTimeout(()=>{
                    navigate('/Login')
                }, 1000)
            }
            else {
                showTypeToastify(errorMessage, "error")
            }
        }
    }

    return (
        <div className='register-container'>
            <div className='register pt-5 container flex-md-row flex-column mb-5'>
            <div className='zing-content content-left col-6 text-white'>
                <ZingContent />
                <p>Hưởng thức âm nhạc bất tận, nghe mọi lúc mọi nơi</p>
            </div>
            <div className='content-right form-container col-md-5 col-12'>
                <Form onSubmit={(e)=>handleSubmitForm(e)}>
                    <Form.Group className='d-flex flex-column'>
                        <Form.Group className="mb-3">
                            <Form.Label className="text-white">Your name</Form.Label>
                            <Form.Control 
                                type="text" placeholder="Your name" 
                                name="name" value={valueInput.name}
                                className={!objCheckInput.isValid.name ? "" : "is-invalid"}
                                onChange={e=>setValueInput({
                                    ...valueInput,
                                    name: e.target.value
                                })}                  
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className="text-white">User name</Form.Label>
                            <Form.Control 
                                type="text" placeholder="Username" 
                                name="username" value={valueInput.username}
                                className={!objCheckInput.isValid.username ? "" : "is-invalid"}
                                onChange={e=>setValueInput({
                                    ...valueInput,
                                    username: e.target.value
                                })}                   
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className="text-white">Your email</Form.Label>
                            <Form.Control 
                                type="text" placeholder="email" 
                                name="email" value={valueInput.email}
                                className={!objCheckInput.isValid.email ? "" : "is-invalid"}
                                onChange={e=>setValueInput({
                                    ...valueInput,
                                    email: e.target.value
                                })}                
                            />
                        </Form.Group>

                        <Form.Group className="mb-3 position-relative">
                            <Form.Label className="text-white">Password</Form.Label>
                            <Form.Group className='d-flex align-items-center'>
                                <Form.Group className='col-11'>
                                    <Form.Control 
                                        type={isShowPassword ? "text" : "password"} placeholder="Password" 
                                        name="password"  value={valueInput.password}
                                        className={!objCheckInput.isValid.password ? "" : "is-invalid"}
                                        onChange={e=>setValueInput({
                                            ...valueInput,
                                            password: e.target.value
                                        })}                 
                                    />
                                </Form.Group>
                                <FontAwesomeIcon 
                                    className='col-1'
                                    icon={isShowPassword ? faEyeSlash : faEye}
                                    onClick={()=>setIsShowPassword(!isShowPassword)} 
                                />
                            </Form.Group>
                        </Form.Group>
                        <Form.Group className="mb-3 position-relative">
                            <Form.Label className="text-white">Confirm password</Form.Label>
                            <Form.Group className='d-flex align-items-center'>
                                <Form.Group className='col-11'>
                                    <Form.Control 
                                        type={isShowConfirmPassword ? "text" : "password"} placeholder="Confirm password" 
                                        name="confirmpassword" value={valueInput.confirmPassword}
                                        className={!objCheckInput.isValid.confirmPassword ? "" : "is-invalid"}
                                        onChange={e=>setValueInput({
                                            ...valueInput,
                                            confirmPassword: e.target.value
                                        })}
                                    />
                                </Form.Group>
                                <FontAwesomeIcon 
                                    className='col-1'
                                    icon={isShowConfirmPassword ? faEyeSlash : faEye}
                                    onClick={()=>setIsShowConfirmPassword(!isShowConfirmPassword)} 
                                />
                            </Form.Group>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                        <Form.Text className='mt-3'><Link className='login-account' to='/Login'>You have a account, login now!</Link></Form.Text>
                    </Form.Group>
                </Form>
            </div>
            </div>
        </div>
  );
}

export default Register;