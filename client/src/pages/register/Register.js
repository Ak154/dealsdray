import { Button, TextField } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import './register.css'

const Register = () => {
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        name: "",
        username: "",
        password: "",
      });
    
      const handleChange = (e) => {
        setInputs((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }));
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const resp = await axios.post(`http://localhost:5001/api/users/register`, inputs);
          if (resp.data.success) {
            toast.success(resp.data.message);
            navigate("/login");
          } else {
            toast.error(resp.data.message);
          }
        } catch (error) {
          toast.error("Something went wrong");
        }
      };
    return (
        <div className="wrapper">
          <form onSubmit={handleSubmit} className="form-container-sign-up">
            <TextField
              name="name"
              value={inputs.name}
              type="text"
              onChange={handleChange}
              sx={{ margin: 2 }}
              placeholder="Enter your name "
              variant="outlined"
            />
            <TextField
              name="username"
              value={inputs.username}
              type="text"
              onChange={handleChange}
              sx={{ margin: 2, marginTop: 0 }}
              placeholder="Enter your username"
              variant="outlined"
            />
            <TextField
              name="password"
              value={inputs.password}
              type="password"
              onChange={handleChange}
              sx={{ margin: 2, marginTop: 0 }}
              placeholder="Enter your password"
              variant="outlined"
            />
            <Button type="submit" variant="contained" sx={{ marginInline: 2 }}>
              Register
            </Button>
            <Link to="/login" className="anchor-signup">
              Click here to Sign-in
            </Link>
          </form>
        </div>
      );
}

export default Register