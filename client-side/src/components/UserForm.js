import React, { useEffect, useState } from "react";
import onCustomError, {
  MUTATING,
  onInputError,
  QUERYING,
} from "../services/errorsHandler";
import { useQuery, useMutation } from "@apollo/client";
import { useParams, useHistory, useLocation } from "react-router-dom";
import { GET_USER, UPDATE_USER } from "../services/apollo/queries";
import { onUpdateSuccess } from "../services/onSuccess";
import validator from "validator";
import _ from "lodash";
import loader from "../images/loader.gif";

const UserForm = () => {
  let { id } = useParams();
  const history = useHistory();
  let location = useLocation();
  let user;
  const { loading, error, data } = useQuery(GET_USER, {
    variables: {
      id,
    },
    onError: () => onCustomError(QUERYING),
  });
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [age, setAge] = useState("");
  const [formError, setFormError] = useState({});

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setUserName(user.userName);
      setAge(user.age);
    } else {
      return history.push(`/profile/${id}`);
    }
  }, []);

  const [updateUser] = useMutation(UPDATE_USER, {
    onError: () => onCustomError(MUTATING),
  });

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

  const anyInputIsEmpty = () => {
    return _.isEmpty(userName) || _.isEmpty(lastName) || _.isEmpty(firstName);
  };

  const onSubmitLogin = (e) => {
    e.preventDefault();
    if (!_.isEmpty(formError) || anyInputIsEmpty()) {
      console.log(anyInputIsEmpty());
      console.log("age", age);
      console.log("userName", userName);
      console.log("lastName", lastName);
      console.log("firstName", firstName);
      return onInputError();
    }
    updateUser({
      variables: {
        id,
        data: { firstName, lastName, userName, age },
      },
    });
    onUpdateSuccess();
  };

  if (loading) return <img src={loader} />;
  if (error) return `Error! ${error.message}`;
  user = data.user;

  return (
    <div className="container rounded bg-white" style={{marginTop: "10%"}}>
      <div className="row">
        <div className="col-md-8"style={{marginLeft: "18%"}}>
          <center><h1>EDIT PROFILE</h1></center>
          <div className="p-3 py-5">
            <form onSubmit={onSubmitLogin}>
            <div className="row">
                <div className="col-lg-6">
                  <div className="form-group focused">
                    <label className="form-control-label" htmlFor="input-username">First Name</label>
                    <input
                      id="input-username" 
                      className="form-control form-control-alternative"
                      name="firstName"
                      type="text"
                      value={firstName}
                      onChange={onFirstNameChange}
                      placeholder="firstName"
                    />
                    {formError && formError.firstName && (
                      <small>
                        <i>{formError.firstName}</i>
                      </small>
                    )}
                  </div>
                </div>
                    <div className="col-lg-6">
                      <div className="form-group focused">
                        <label className="form-control-label" htmlFor="input-username">Last Name</label>
                        <input
                          id="input-last-name"
                          className="form-control form-control-alternative"
                          name="lastName"
                          type="text"
                          value={lastName}
                          onChange={onLastNameChange}
                          placeholder="lastName"
                        />
                        {formError && formError.lastName && (
                          <small>
                            <i>{formError.lastName}</i>
                          </small>
                        )}
                      </div>
                    </div>
                  </div>
            <div className="row">
              <div className="col-lg-6">
                <div className="form-group focused">
                <label className="form-control-label" htmlFor="input-username">User Name</label>
                  <input
                    id="input-username" 
                    className="form-control form-control-alternative"
                    name="userName"
                    type="text"
                    value={userName}
                    onChange={onUserNameChange}
                    placeholder="userName"
                  />
                  {formError && formError.userName && (
                    <small>
                      <i>{formError.userName}</i>
                    </small>
                  )}
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group focused">
                <label className="form-control-label" htmlFor="input-username">Age</label>
                  <input
                    id="input-username" 
                    className="form-control form-control-alternative"
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
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div className="form-group focused">
                <label className="form-control-label" htmlFor="input-username">Email address</label>
                  <input name="email" id="input-email" className="form-control form-control-alternative" type="text" value={user.role} disabled={true} />

                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group focused">
                  <label className="form-control-label" htmlFor="input-username">Role</label>
                  <input name="email" id="input-email" className="form-control form-control-alternative" type="text" value={user.email} disabled={true} />
                </div>
              </div>
            </div>
              <div style={{marginLeft: "79%"}}><button className="btn btn-primary profile-button">Save Changes</button></div>
            </form>
          </div>
        </div>
      </div>
  </div>
  );
};

export default UserForm;
