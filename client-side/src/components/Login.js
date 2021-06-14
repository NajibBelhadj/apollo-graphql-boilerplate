import React, { useState } from "react";
import validator from "validator";
import _ from "lodash";
import { login } from "../services/authService";
import { onInputError } from "../services/errorsHandler";
import '../../public/assets/styles/style.min.css';
import '../../public/assets/styles/custom.css';
import '../../public/assets/plugin/waves/waves.min.css';


const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState({});
  const [requestError, setRequestError] = useState({});

  const onEmailChange = (e) => {
    const input = e.target.value;
    const isValid = validator.isEmail(input);
    if (!isValid) {
      setFormError({ ...formError, email: "email in not valid" });
    } else delete formError.email;
    setEmail(input);
  };

  const onPasswordChange = (e) => {
    const input = e.target.value;
    const isValid = validator.isEmpty(input);
    if (isValid) {
      setFormError((prevState) => ({
        ...prevState,
        password: "password in invalid",
      }));
    } else delete formError.password;
    setPassword(input);
  };

  const onSubmitLogin = async (e) => {
    e.preventDefault();
    if (!_.isEmpty(formError) || _.isEmpty(password) || _.isEmpty(email)) {
      return onInputError();
    }
    try {
      await login(email, password);
      /*
      props.location.state
        ? props.history.push(props.location.state.from)
        : props.history.push("/");
        */
      window.location = props.location.state ? props.location.state.from : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const requestError = { ...requestError };
        requestError.request = ex.response.data;
        setRequestError(requestError);
      } else console.log(ex.message);
    }
  };
  //Helmi@mail.com
  return (     
      <div id="single-wrapper">
        <form  onSubmit={onSubmitLogin} className="frm-single">
          <div className="inside" style={{marginTop: "70%"}}>
            <div className="title"><strong>Social Media</strong></div>
            <div className="frm-title">Login</div>
            <div className="frm-input">
              <input
                className="frm-inp"
                placeholder="Email"
                name="email"
                type="text"
                value={email}
                onChange={onEmailChange}
              />
              {formError && formError.email && (
                <small>
                  <i>{formError.email}</i>
                </small>
              )}
              <i className="fa fa-envelope frm-ico"></i>
            </div>
            <div className="frm-input">
              <input
                placeholder="Password"
                className="frm-inp"
                name="password"
                type="password"
                value={password}
                onChange={onPasswordChange}
              />
              {formError && formError.password && (
                <small>
                  <i>{formError.password}</i>
                </small>
              )}
              <i className="fa fa-lock frm-ico"></i>
            </div>
            <div className="clearfix margin-bottom-20">
              <div className="float-left">
                <div className="checkbox primary"><input type="checkbox" id="rememberme"/>
                  <label htmlFor="rememberme">Remember me</label>
                </div>
              </div>
              <div className="float-right"><a href="page-recoverpw.html" className="a-link"><i className="fa fa-unlock-alt"></i>Forgot password?</a></div>
            </div>
            
            <button  type="submit" className="frm-submit">Login<i className="fa fa-arrow-circle-right"></i></button>
            {requestError && requestError.request && (
              <small>
                <i>{requestError.request}</i>
              </small>
            )}
            
            <div className="frm-footer"></div>
            <div className="row small-spacing">
              <div className="col-md-12">
                <div className="txt-login-with txt-center">or login with</div>
              </div>
              <div className="col-md-6"><button type="button" className="btn btn-sm btn-icon btn-icon-left btn-social-with-text btn-facebook text-white waves-effect waves-light"><i className="ico fab fa-facebook"></i><span>Facebook</span></button></div>
              <div className="col-md-6"><button type="button" className="btn btn-sm btn-icon btn-icon-left btn-social-with-text btn-google-plus text-white waves-effect waves-light"><i className="ico fab fa-google-plus"></i>Google+</button></div>
            </div>
          
          </div>
        </form>    
      </div>

  );
};

export default Login;
