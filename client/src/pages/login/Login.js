import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import toast from "react-hot-toast";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
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
    //console.log(inputs)
    try {
      const resp = await axios.post(
        `http://localhost:5001/api/users/login`,
        inputs
      );

      if (resp.data.success) {
       // console.log(resp.data);
        toast.success("Login is successful");
        localStorage.setItem('token', resp.data.data)
        navigate("/");
      } else {
        toast.error(resp.data.message);
      }
    } catch (error) {
      toast.error("User does not exist");
    }
  };
  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit} className="form-container-login">
        <TextField
          name="username"
          value={inputs.username}
          type="text"
          onChange={handleChange}
          sx={{ margin: 2 }}
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
          Login
        </Button>
        <div className="anchor-sign">
          <Link to="/forgot">Reset password</Link>
          <Link to="/register">Register</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
