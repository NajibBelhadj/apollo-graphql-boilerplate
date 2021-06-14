import React from "react";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import NotFound from "./components/NotFound";
import Post from "./components/Post";
import Logout from "./components/Logout";
import Home from "./components/Home";
import StickyHeadTable from "./components/Userstest";
import PublicRoute from "./Routes/PublicRoute";
import PrivateRoute from "./Routes/PrivateRoute";
import currentUser from "./services/apollo/cache";
import UserForm from "./components/UserForm";
import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { getCurrentUser } from "./services/authService";
import "!style-loader!css-loader!react-toastify/dist/ReactToastify.css";
import users from "./components/Userstest";



function App() {


  currentUser(getCurrentUser());
  return (
    <React.Fragment>
      <Route path="/not-found" component={NotFound} />
      <ToastContainer />
      <Header />
      
      <Switch>
        <PublicRoute path="/login" component={Login} />
        <PublicRoute path="/register" component={Register} />
        <PrivateRoute path="/logout" component={Logout} />
        <PrivateRoute path="/post/:id" component={Post} />
        <PrivateRoute path="/profile/:id/modify" component={UserForm} />
        <PrivateRoute path="/profile/:id" component={Profile} />
        <PrivateRoute path="/users" component={users} />
        <PrivateRoute path="/home" component={Home} />
        
        <Redirect from="/" exact to="/home" />
        <Redirect to="/not-found" />
      </Switch>  
      
    </React.Fragment>
  );
}
export default App;
