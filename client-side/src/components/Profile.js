import React, { useState } from "react";
import onCustomError, {
  onServerRequestError,
  QUERYING,
} from "../services/errorsHandler";
import {
  onSuccessMailReceive,
  sendDeleteRequestEmail,
} from "../services/mailService";
import { useParams, useHistory } from "react-router-dom";
import { isToBeShownButton } from "../services/apollo/cache";
import { GET_USER } from "../services/apollo/queries";
import { useQuery } from "@apollo/client";
import loader from "../images/loader.gif";
import "../../public/assets/profile.css"

const Profile = () => {
  const { id } = useParams();
  const history = useHistory();
  const { loading, error, data } = useQuery(GET_USER, {
    variables: {
      id,
    },
    onError: () => onCustomError(QUERYING),
  });

  const [mailSent, setmailSent] = useState(false);

  const onDeleteUser = async () => {
    try {
      const result = await sendDeleteRequestEmail(user.userName, user.email);
      onSuccessMailReceive(result);
      setmailSent(true);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        console.log(ex.response.data);
        return onServerRequestError();
      }
    }
  };

  if (loading) return <img src={loader} />;
  if (error) return `Error! ${error.message}`;
  const { user } = data;

  return (

    <div className="container rounded bg-white" style={{marginTop: "10%"}}>

    <div className="row">
        <div className="col-md-4 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5"><img className="rounded-circle mt-5" src="https://img.icons8.com/bubbles/2x/user-male.png" width="90"/><span className="font-weight-bold"style={{textTransform: "uppercase", marginTop:"4%"}}>{user.firstName} {user.lastName}</span><span className="text-black-50">{user.email}</span><span>{user.role}</span></div>
        </div>
        <div className="col-md-8">
            <div className="p-3 py-5">
                <div className="text-right">
                    <div className=" flex-row align-items-center back"><i className="text-right"></i>
                    {isToBeShownButton(id) && (
                      <React.Fragment>
                        <a className="text-right" onClick={() => history.push(`/profile/${user.id}/modify`)}>Edit Profile</a>
                        </React.Fragment>
                      )}
                    </div>
                   
                </div>
                <div className="row">
                    <div className="col-lg-6">
                      <div className="form-group focused">
                        <label className="form-control-label" htmlFor="input-username">Username</label>
                        <input type="text" id="input-username" className="form-control form-control-alternative" value={user.userName} disabled={true}/>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label className="form-control-label" htmlFor="input-email">Email address</label>
                        <input type="email" id="input-email" className="form-control form-control-alternative" disabled={true} value={user.email}/>
                      </div>
                    </div>
                  </div>
                <div>
                <div className="row">
                    <div className="col-lg-6">
                      <div className="form-group focused">
                        <label className="form-control-label" htmlFor="input-first-name">First name</label>
                        <input type="text" id="input-first-name" className="form-control form-control-alternative" disabled={true} value={user.firstName}/>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group focused">
                        <label className="form-control-label" htmlFor="input-last-name">Last name</label>
                        <input type="text" id="input-last-name" className="form-control form-control-alternative" disabled={true} value={user.lastName}/>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                    <div className="col-lg-6">
                      <div className="form-group focused">
                        <label className="form-control-label" htmlFor="input-first-name">Age</label>
                        <input type="number" id="input-first-name" className="form-control form-control-alternative" disabled={true}  value={user.age}/>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group focused">
                        <label className="form-control-label" htmlFfor="input-last-name">Role</label>
                        <input type="text" id="input-last-name" className="form-control form-control-alternative" disabled={true} value={user.role}/>
                      </div>
                    </div>
                  </div>              
                  {isToBeShownButton(id) && (
                      <React.Fragment>
                        <div className="mt-5 text-right"><button className="btn btn-primary profile-button" disabled={mailSent} onClick={onDeleteUser}>
                          Delete Profile
                        </button></div>
                      </React.Fragment>
                    )}
            </div>
        </div>
    </div>
</div>

  );
};

export default Profile;
