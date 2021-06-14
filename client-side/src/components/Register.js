import React, { useState } from "react";
import { register } from "../services/authService";
import { onInputError } from "../services/errorsHandler";
import validator from "validator";
import _ from "lodash";
import '../../public/assets/styles/style.min.css';
import '../../public/assets/styles/custom.css';
import '../../public/assets/plugin/waves/waves.min.css';

const Register = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [age, setAge] = useState("");
  const [role, setRole] = useState("default");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState({});
  const [requestError, setRequestError] = useState({});

  const onFirstNameChange = (e) => {
    const input = e.target.value;
    const isValid = validator.isAlphanumeric(input);
    if (!isValid) {
      setFormError((prevState) => ({
        ...prevState,
        firstName: "firstName is not valid",
      }));
    } else delete formError.firstName;
    setFirstName(input);
  };

  const onLastNameChange = (e) => {
    const input = e.target.value;
    const isValid = validator.isAlphanumeric(input);
    if (!isValid) {
      setFormError((prevState) => ({
        ...prevState,
        lastName: "lastName is not valid",
      }));
    } else delete formError.lastName;
    setLastName(input);
  };

  const onUserNameChange = (e) => {
    const input = e.target.value;
    const isValid = validator.isAlphanumeric(input);
    if (!isValid) {
      setFormError((prevState) => ({
        ...prevState,
        userName: "userName is not valid",
      }));
    } else delete formError.userName;
    setUserName(input);
  };

  const onAgeChange = (e) => {
    const input = e.target.value;
    const isValid = validator.isInt(input, { min: 10, max: 120 });
    if (!isValid) {
      setFormError((prevState) => ({
        ...prevState,
        age: "age is not valid",
      }));
    } else delete formError.age;
    setAge(input);
  };

  const onRoleChange = (e) => {
    const input = e.target.value;
    const isValid = validator.isAlphanumeric(input);
    if (!isValid) {
      setFormError((prevState) => ({
        ...prevState,
        role: "role is not valid",
      }));
    } else delete formError.role;
    setRole(input);
  };

  const onEmailChange = (e) => {
    const input = e.target.value;
    const isValid = validator.isEmail(input);
    if (!isValid) {
      setFormError((prevState) => ({
        ...prevState,
        email: "email is not valid",
      }));
    } else delete formError.email;
    setEmail(input);
  };

  const onPasswordChange = (e) => {
    const input = e.target.value;
    const isValid = validator.isStrongPassword(input, {
      pointsPerRepeat: 1,
      pointsPerUnique: 1,
      returnScore: true,
    });
    if (isValid < 18) {
      setFormError((prevState) => ({
        ...prevState,
        password: "password is not strong enough",
      }));
    } else delete formError.password;
    setPassword(input);
  };

  const anyInputIsEmpty = () => {
    return (
      _.isEmpty(password) ||
      _.isEmpty(email) ||
      _.isEmpty(role) ||
      _.isEmpty(age) ||
      _.isEmpty(userName) ||
      _.isEmpty(lastName) ||
      _.isEmpty(firstName)
    );
  };

  const onSubmitLogin = async (e) => {
    e.preventDefault();
    if (!_.isEmpty(formError) || anyInputIsEmpty()) {
      return onInputError();
    }
    try {
      await register(firstName, lastName, userName, age, role, email, password);
      props.history.push("/");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const requestError = { ...requestError };
        requestError.request = ex.response.data;
        setRequestError(requestError);
      }
    }
  };
  //Helmi@mail.com
  return (
    <div id="single-wrapper">
      <form onSubmit={onSubmitLogin} className="frm-single">
        <div className="inside" style={{marginTop: "40%"}}>
          <div className="title"><strong>Social Media</strong></div>
			    <div className="frm-title">Register</div>
          <div className="frm-input">
            <input
              className="frm-inp"
              name="firstName"
              type="text"
              value={firstName}
              onChange={onFirstNameChange}
              placeholder="First Name"
            />
            {formError && formError.firstName && (
              <small>
                <i>{formError.firstName}</i>
              </small>
            )}
            <i className="fa fa-user frm-ico"></i>
          </div>
          
          <div className="frm-input">
            <input
              className="frm-inp"
              name="lastName"
              type="text"
              value={lastName}
              onChange={onLastNameChange}
              placeholder="Last Name"
            />
            {formError && formError.lastName && (
              <small>
                <i>{formError.lastName}</i>
              </small>
            )}
            <i className="fa fa-user frm-ico"></i>
          </div>
         
          <div className="frm-input">
            <input
              className="frm-inp"
              name="userName"
              type="text"
              value={userName}
              onChange={onUserNameChange}
              placeholder="User Name"
            />
            {formError && formError.userName && (
              <small>
                <i>{formError.userName}</i>
              </small>
            )}
            <i className="fa fa-user-circle frm-ico"></i>
          </div>
          <div className="frm-input">
            <input
              className="frm-inp"
              name="email"
              type="text"
              value={email}
              onChange={onEmailChange}
              placeholder="Email"
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
              className="frm-inp"
              name="password"
              type="password"
              value={password}
              onChange={onPasswordChange}
              placeholder="Password"
            />
            {formError && formError.password && (
              <small>
                <i>{formError.password}</i>
              </small>
            )}
            <i className="fa fa-lock frm-ico"></i>
          </div>
          
            <div className="frm-input">
              <input
                className="frm-inp"
                name="age"
                type="number"
                value={age}
                onChange={onAgeChange}
                placeholder="age"
              />
              {formError && formError.age && (
                <small>
                  <i>{formError.age}</i>
                </small>
              )}
              <i className="fa fa-calendar frm-ico"></i>
            </div>
          
          <div className="frm-input">
            <select name="role" value={role} onChange={onRoleChange} className="frm-inp form-control">
              <option disabled value="default">Role</option>
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
            </select>
            {formError && formError.role && (
              <small>
                <i>{formError.role}</i>
              </small>
            )}
            <i className="fa fa-cog frm-ico"></i>
          </div>
          <div className="clearfix margin-bottom-20">
				    <div className="checkbox primary">
              <input type="checkbox" id="accept" required/>
              <label htmlFor="accept">I accept Terms and Conditions</label>
            </div>
			    </div>
          <button type="submit" className="frm-submit">Register<i className="fa fa-arrow-circle-right"></i></button>
          {requestError && requestError.request && (
            <small>
              <i>{requestError.request}</i>
            </small>
          )}
            
            <div className="frm-footer"></div>
            <div className="row small-spacing">
              <div className="col-md-12">
                <div className="txt-login-with txt-center">or register with</div>
              </div>
              <div className="col-md-6"><button type="button" className="btn btn-sm btn-icon btn-icon-left btn-social-with-text btn-facebook text-white waves-effect waves-light"><i className="ico fab fa-facebook"></i><span>Facebook</span></button></div>
              <div className="col-md-6"><button type="button" className="btn btn-sm btn-icon btn-icon-left btn-social-with-text btn-google-plus text-white waves-effect waves-light"><i className="ico fab fa-google-plus"></i>Google+</button></div>
            </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
