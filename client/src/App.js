import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/login/Login";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/dashboard/Dashboard";
import Register from "./pages/register/Register";
//import PublicRoute from "./component/PublicRoute";
import ProtectedRoute from "./component/ProtectedRoute";
import Home from './pages/home/Home';
import Employeelist from './pages/employeelist/Employeelist';
import Profile from './pages/profile/Profile';
import Logout from './pages/logout/Logout';

function App() {

  return (
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/register" element={<Register/>} />
        <Route path="/" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} >
          <Route element={<Home/>}/>
          <Route path="/employeelist" element={<Employeelist/>} />
          <Route path="profile" element={<Profile/>} />
          <Route path="logout" element={<Logout/>} />
        </Route>
        <Route path="/login" element={<Login/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
