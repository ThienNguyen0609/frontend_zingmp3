import './Login.scss'
import 'react-toastify/dist/ReactToastify.css';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ZingContent from '../ZingContent';
import { loginService } from '../../servives/userService';
import { Toastify, isValidInput, showTypeToastify } from '../../servives/registerFormService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';


const Login = () => {
    const navigate = useNavigate()
    const [isShowPassword, setIsShowPassword] = useState(false)
    const [valueInput, setValueInput] = useState({
        username: '',
        password: ''
    })
    const defaultValidInput = {
        isValid: {
            username: false,
            password: false
        }
    }
    const [objCheckInput, setObjCheckInput] = useState(defaultValidInput)

    const handleSubmitForm = async (e) => {
        e.preventDefault()
        const user = {
            username: valueInput.username,
            password: valueInput.password
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
            try {
                const res = await loginService(user);
                const errorCode = res.data.errorCode
                const errorMessage = res.data.message
                const userData = res.data.data
                console.log(errorMessage)
                if(errorCode === 0) {
                    let data = {
                        isAuthenticated: true,
                        token: "fakeToken",
                        data: {
                            ...userData
                        }
                    }
                    localStorage.setItem("account", JSON.stringify(data));
                    navigate('/')
                }
                else {
                    console.log(errorMessage)
                    showTypeToastify(errorMessage, "error")
                }
            }
            catch(err) {
                console.log(err)
            }
        }
    }

    useEffect(()=>{
        let session = JSON.parse(localStorage.getItem("account"))
        if(session && session.isAuthenticated) {
            navigate('/')
        }
    }, [])
    return (
        <div className='login-container pt-5 container flex-md-row flex-column'>
            <ZingContent />
            <div className='content-right form-container col-md-5 col-12'>
                <Form onSubmit={(e)=>handleSubmitForm(e)}>
                    <Form.Group className='d-flex flex-column'>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
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

                        <Form.Group className="mb-3 position-relative" controlId="formBasicPassword">
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
                        <Form.Text className='error-style'></Form.Text>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                        <Form.Text className='mt-3'><Link className='create-account' to='/Register'>You dont have a account, register now!</Link></Form.Text>
                    </Form.Group>
                </Form>
            </div>
            <Toastify />
        </div>
  );
}

export default Login;