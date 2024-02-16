import './EditForm.scss'

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from 'react';
import { updateService } from '../../../servives/userService';
import { showTypeToastify } from '../../../servives/toastifyService';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUser } from '../../../store/features/user/userSlice';

const EditForm = ({user}) => {
    const [email, setEmail] = useState(user.email)
    const [dateofbirth, setDateofbirth] = useState(user.dateofbirth)
    const [country, setCountry] = useState(user.country)
    const [gender, setGender] = useState(user.gender)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleUpdateUser = async (e) => {
        e.preventDefault()
        const data = {
            id: user.id,
            email: email,
            country: country,
            gender: gender,
            dateofbirth: dateofbirth
        }
        const response = await updateService(data, user.id)
        if(response.errorCode) {
          dispatch(getUser(user.id))
          showTypeToastify(response.message, "success")
          navigate(`/user/profile?u=${user.id}`)
        }
    }

    return (
        <Form onSubmit={(e)=>handleUpdateUser(e)}>
            <Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="text-white form-label">Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Email"
                  name="email"
                  value={`${email}`}
                  className="form-color"
                  onChange={(e)=>setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="text-white form-label">Gender</Form.Label>
                <Form.Select 
                    name='gender' onChange={(e)=>setGender(e.target.value)}
                    className="form-color" 
                    aria-label="Default select example" 
                    defaultValue={`${gender}`}
                >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="text-white form-label">Date of birth</Form.Label>
                <Form.Control
                  type="date"
                  name="dateofbirth"
                  value={`${dateofbirth}`}
                  className="form-color"
                  onChange={(e)=>setDateofbirth(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="text-white form-label">Country</Form.Label>
                <Form.Control
                  type="text"
                  name="country"
                  value={`${country ? country : ""}`}
                  className="form-color"
                  onChange={(e)=>setCountry(e.target.value)}
                />
              </Form.Group>
              <Button className='update-btn mt-2' variant="primary" type="submit">
                Save
              </Button>
              <Link className='btn back-home mt-2' to={"/"}>Back home</Link>
            </Form.Group>
          </Form>
    )
}

export default EditForm