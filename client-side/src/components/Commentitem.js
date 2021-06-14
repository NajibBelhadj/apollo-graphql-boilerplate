import React, { useState } from "react";
import onErrorMutation, { MUTATING } from "../services/errorsHandler";
import { useMutation } from "@apollo/client";
import {
  GET_POSTS,
  UPDATE_COMMENT,
  REMOVE_COMMENT,
} from "../services/apollo/queries";
import { Link } from "react-router-dom";
import { isToBeShownButton } from "../services/apollo/cache";
import { onUpdateSuccess } from "../services/onSuccess";
import moment from "moment";
import _ from "lodash";

const Commentitem = (props) => {
  const { comment } = props;
  const onError = () => onErrorMutation(MUTATING);

  const [editableComment, seteditableComment] = useState(true);
  const [TobeUpdatedComment, setUpdateComment] = useState(comment.content);

  const [updateComment] = useMutation(UPDATE_COMMENT, { onError });
  const [removeComment] = useMutation(REMOVE_COMMENT, { onError });

  const onCommentChange = ({ target }) => {
    const input = target.value;
    setUpdateComment(input);
  };

  const onSaveComment = () => {
    updateComment({
      variables: {
        id: comment.id,
        data: {
          content: TobeUpdatedComment,
        },
      },
    });
    onUpdateSuccess();
    seteditableComment(true);
  };

  const onDeleteComment = () => {
    removeComment({
      variables: { id: comment.id },
      refetchQueries: [{ query: GET_POSTS }],
    });
    seteditableComment(true);
  };

  return (
    <div  style={{marginLeft: "5%"}}>
      <li>


      <div className="box-content card col-8 ml-5" >
      <div className="row">
          <div className="col-11" >
            <div className="row">
            <div className=" border-right" style={{width: "200px"}}>
                  <div className="d-flex flex-column align-items-center text-center p-3 py-2"><img className="rounded-circle" src="https://img.icons8.com/bubbles/2x/user-male.png" width="90"/><span className="font-weight-bold"style={{textTransform: "uppercase"}}><Link to={`/profile/${comment.author.id}`}>{comment.author.userName}</Link></span></div>
                </div>
          <div>
        {editableComment ? (
          <div>
            {comment.content.split("\n").map((item, key) => {
              return (
                <React.Fragment key={key}>
                          <div className=" col-12">
                          <div className="row">
                              <div className="ml-2">
                          <p className="font-weight-bold mt-2" style={{cursor: "pointer", fontSize:"28px"}}>{item}</p>
                          </div>
                          </div>
                          </div>
           
                </React.Fragment>
              );
            })}
            {isToBeShownButton(comment.author.id) && (
              <React.Fragment>

                           <a className="edit ml-3 mt-5" onClick={() => seteditableComment(false)} style={{color: "#4caf50"}}><i
                              style={{cursor: "pointer", fontSize:"30px"}} className="material-icons">&#xE254;</i></a>
                        <a className="delete ml-3 mt-5" onClick={onDeleteComment} style={{color: "#E34724"}}><i
                              style={{cursor: "pointer", fontSize:"30px"}} className="material-icons">&#xE872;</i></a>
              </React.Fragment>
            )}
          </div>
        ) : (
          <div className="card-content">
                        
          <textarea
            style={{height: "57px"}}
            className="form-control"
            type="text"
            onChange={onCommentChange}
            value={TobeUpdatedComment}
          />
    
          <div className="mt-1">
            <button className=" btn btn-primary btn-sm" disabled={_.isEmpty(TobeUpdatedComment)} onClick={onSaveComment}>
              Save
            </button>

            <button
              className=" btn btn-primary btn-sm ml-1"
                onClick={() => {
                  seteditableComment(true);
                  setUpdateComment(comment.content);
                }}
              >
                Cancel
            </button>
          </div>
      </div>

        )}
        


        <small>
          commented at :
          {moment
            .unix(comment.createdAt / 1000)
            .format("MMMM Do YYYY, h:mm:ss a")}
        </small>

        </div>
     
        </div>
      </div>
      </div>

        </div>
      </li>

    </div>
  );
};

export default Commentitem;
