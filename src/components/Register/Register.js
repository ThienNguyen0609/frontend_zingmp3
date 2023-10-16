import './Register.scss'
import 'react-toastify/dist/ReactToastify.css';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ZingContent from '../ZingContent';
import { registerService } from '../../servives/userService';
import { Toastify, isValidInput, showTypeToastify } from '../../servives/registerFormService';
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

    const handleSubmitForm = (e) => {
        e.preventDefault()
        const user = {
            name: valueInput.name,
            username: valueInput.username,
            email: valueInput.email,
            password: valueInput.password,
            confirmPassword: valueInput.confirmPassword
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
            registerService(user)
            .then(res => {
                const errorCode = res.data.errorCode
                const errorMessage = res.data.message
                if(errorCode === 0) {
                    setTimeout(()=>{
                        navigate('/Login')
                    }, 1000)
                }
                else {
                    showTypeToastify(errorMessage, "error")
                }
            })
        }
    }

    useEffect(()=>{
        // axios.post('http://localhost:8080/api/users', {username: 'haibadong',password: '1234'})
        // .then(res => console.log(res))
    }, [])

    return (
        <div className='register-container'>
            <div className='register pt-5 container flex-md-row flex-column mb-5'>
            <ZingContent />
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
            <Toastify />
            </div>
        </div>
  );
}

export default Register;