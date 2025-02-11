import React, { ChangeEvent, FormEvent, useState } from 'react'
import './styles.css'
import { Link } from 'react-router-dom';
import axios from 'axios';

type FormDataTypes = {
    firstName: string;
    surname: string;
    email: string;
    phone: string;
    password: string;
    confirm_password: string;
}

const Register = () => {
    const normalFormData: FormDataTypes = {
        firstName: "",
        surname: "",
        email: "",
        phone: "",
        password: "",
       confirm_password: ""
    };
    const [formData, setFormData] = useState<FormDataTypes>(normalFormData)


    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    };
   const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
       try {
           e.preventDefault();
           console.log("I got here")
        console.log(JSON.parse(JSON.stringify(formData)))
    const response = await axios.post('http://localhost:3000/api/register', formData);
    console.log(response)
    if (response.status === 201) {
        console.log("success")
    } else {
        console.error('Error Response & whatever:', response);
    }
} catch (err) {
    console.error('Axios Error and an Error here:', err);
} finally {
   console.log("well well")
}
};





    return (
        <div className='form min-vh-100 d-flex justify-content-center align-items-center '>
            <div className='border'>
                <form className='form' style={{ color: "white" }} onSubmit={onSubmit}
>
                    <div className="row">
                        <label htmlFor="exampleInputUsername">firstname</label>
                        <input type="text" className="input" value={formData.firstName} onChange={handleInputChange} name='firstName'/>
                    </div>
                    <div className="row">
                        <label htmlFor="exampleInputUsername">surname</label>
                        <input type="text" className="input" value={formData.surname} onChange={handleInputChange} name='surname'/>
                    </div>
                    <div className="row">
                        <label htmlFor="exampleInputUsername">phone</label>
                        <input type="text" className="input" value={formData.phone} onChange={handleInputChange} name='phone'/>
                    </div>
                    <div className="row">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="input" value={formData.email} onChange={handleInputChange} name='email'/>
                    </div>

                    <div className="row">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="input" value={formData.password} onChange={handleInputChange} name='password'/>
                    </div>
                    <div className="row">
                        <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
                        <input type="password" className="input" value={formData.confirm_password} onChange={handleInputChange} name='confirm_password'/>
                    </div>
                    <button type="submit" className="send-btn send-txt">Register</button>
                    <p>Already a User<Link to={"/login"}>Login here</Link></p>
                </form>
            </div>
        </div>
    )
};

export default Register;