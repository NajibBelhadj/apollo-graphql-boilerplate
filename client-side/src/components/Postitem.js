import React, { useState, useEffect } from "react";
import onErrorMutation, { MUTATING } from "../services/errorsHandler";
import { useMutation } from "@apollo/client";
import {
  GET_POSTS,
  REMOVE_POST,
  UPDATE_POST,
} from "../services/apollo/queries";
import { Link } from "react-router-dom";
import { isToBeShownButton } from "../services/apollo/cache";
import { useHistory } from "react-router-dom";
import { onUpdateSuccess } from "../services/onSuccess";
import moment from "moment";
import _ from "lodash";

const Postitem = (props) => {
  const { post } = props;
  const history = useHistory();
  const onError = () => onErrorMutation(MUTATING);

  const [editablePost, seteditablePost] = useState(true);
  const [TobeUpdatedPost, setUpdatePost] = useState("");
  useEffect(() => {
    setUpdatePost(post.content);
  }, []);

  const [updatePost] = useMutation(UPDATE_POST, { onError });
  const [removePost] = useMutation(REMOVE_POST, { onError });

  const onPostChange = ({ target }) => {
    const input = target.value;
    setUpdatePost(input);
  };

  const onSavePost = () => {
    updatePost({
      variables: { id: post.id, data: { content: TobeUpdatedPost } },
    });
    onUpdateSuccess();
    seteditablePost(true);
  };

  const onDeletePost = () => {
    removePost({
      variables: { id: post.id },
      refetchQueries: [{ query: GET_POSTS }],
    });
    seteditablePost(true);
  };

  return (
    <div className="col-lg-9" >
      <div className="box-content card col-10 ml-3">
        <div className="row">
          <div className="col-11" >
            <div className="row">
                <div className=" border-right" style={{width: "200px"}}>
                  <div className="d-flex flex-column align-items-center text-center p-3 py-2"><img className="rounded-circle" src="https://img.icons8.com/bubbles/2x/user-male.png" width="90"/><span className="font-weight-bold"style={{textTransform: "uppercase"}}><Link to={`/profile/${post.author.id}`}>{post.author.userName}</Link></span></div>
                </div>
                <div>
                {editablePost ? (
                  <div>
                    {post.content.split("\n").map((item, key) => {
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
                    <a className="edit ml-3 " style={{color: "#4caf50"}} onClick={() => history.push(`/post/${post.id}`)}>
                    <i className="far fa-comment mt-1" style={{cursor: "pointer", fontSize:"28px"}}></i>
                    </a>
                    {isToBeShownButton(post.author.id) && (
                      <React.Fragment>
                        <a className="edit ml-3 mt-5" onClick={() => seteditablePost(false)} style={{color: "#4caf50"}}><i
                              style={{cursor: "pointer", fontSize:"30px"}} className="material-icons">&#xE254;</i></a>
                        <a className="delete ml-3 mt-5" onClick={onDeletePost} style={{color: "#E34724"}}><i
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
                            value={TobeUpdatedPost}
                            onChange={onPostChange}
                          />
                    
                          <div className="mt-1">
                            <button className=" btn btn-primary btn-sm" disabled={_.isEmpty(TobeUpdatedPost)} onClick={onSavePost}>
                              Save
                            </button>
                
                            <button
                              className=" btn btn-primary btn-sm ml-1"
                                onClick={() => {
                                  seteditablePost(true);
                                  setUpdatePost(post.content);
                                }}
                              >
                                Cancel
                            </button>
                          </div>
                      </div>
        
                    )}

              <div>
                {post.comments.length === 0 ? (
                <p>This post has no submitted comment yet</p>
                  ):(
                    <p className="hello">
                      This post contains {post.comments.length} comment
                    </p>
                  )}
                  
                  <small>
                    posted at :
                    {moment.unix(post.createdAt / 1000).format("MMMM Do YYYY, h:mm:ss a")}
                  </small>
              </div>  
            </div>
            </div>
          </div>

                    
        </div>

      </div>
      

 

      {/*
      {post.comments.length !== 0 && (
        <ul>
          comments :
          {post.comments.map((comment) => (
            <Commentitem key={comment.id} comment={comment} />
          ))}
        </ul>
      )}
      {mutationLoading && (
        <div>
          <img src={loader} />
        </div>
      )}
      <input
        type="text"
        placeholder="add comment"
        value={newComment}
        onChange={onNewCommentChange}
      />
      <button disabled={_.isEmpty(newComment)} onClick={createComment}>
        comment
      </button>
      */}
      <hr />
    </div>
  );
};

export default Postitem;
