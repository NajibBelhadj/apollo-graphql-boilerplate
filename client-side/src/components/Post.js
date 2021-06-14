import React, { useState, useEffect } from "react";
import currentUser, { isToBeShownButton } from "../services/apollo/cache";
import onCustomError, { MUTATING, QUERYING } from "../services/errorsHandler";
import { useQuery, useMutation } from "@apollo/client";
import { useParams, useHistory } from "react-router-dom";
import {
  CREATE_COMMENT,
  GET_POST,
  GET_POSTS,
  REMOVE_POST,
  UPDATE_POST,
} from "../services/apollo/queries";
import loader from "../images/loader.gif";
import Commentitem from "./Commentitem";
import moment from "moment";
import { onAppendSuccess, onUpdateSuccess } from "../services/onSuccess";

const Post = () => {
  let post;
  const history = useHistory();
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_POST, {
    variables: {
      id,
    },
    onError: () => {
      return onCustomError(QUERYING);
    },
  });

  const [deleted, setDeleted] = useState(false);
  const [editablePost, seteditablePost] = useState(true);
  const [TobeUpdatedPost, setUpdatePost] = useState("");
  const [newComment, setnewComment] = useState("");

  useEffect(() => {
    if (post) setUpdatePost(post.content);
    // soit tjibou mel cache, sinon aandekch le droit t'accedi mel url
    else {
      return history.push("/home");
    }
  }, []);

  const [updatePost] = useMutation(UPDATE_POST, {
    onError: () => onCustomError(MUTATING),
  });
  const [removePost] = useMutation(REMOVE_POST, {
    onError: () => onCustomError(MUTATING),
  });
  const [
    createNewComment,
    { loading: mutationLoading },
  ] = useMutation(CREATE_COMMENT, { onError: () => onCustomError(MUTATING) });

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
    //    seteditablePost(true);
    setDeleted(true);
  };

  const onNewCommentChange = ({ target }) => {
    const input = target.value;
    setnewComment(input);
  };

  const createComment = () => {
    createNewComment({
      variables: {
        data: {
          content: newComment,
          author: currentUser()._id,
          post: post.id,
        },
      },
      refetchQueries: [{ query: GET_POSTS }],
    });
    onAppendSuccess();
    setnewComment("");
  };
  if (deleted)
    return (
      <h4>Post has been deleted, you propably go back to the home page</h4>
    );

  if (loading) return <img src={loader} />;
  if (error) {
    return (
      <h3>Error! Post either not exist in our database or has been deleted</h3>
    );
  }
  post = data.post;
  return (


    <div className="container" style={{marginTop: "5%"}}>


  <div className="box-content card col-10 ml-3" style={{  display: "flex", flexDirection: "column"}}>
  <div className="row">

 
          <div className="col-11" >
            <div className="row">
            <div className=" border-right" style={{width: "200px"}}>
                  <div className="d-flex flex-column align-items-center text-center p-3 py-2"><img className="rounded-circle" src="https://img.icons8.com/bubbles/2x/user-male.png" width="90"/><span className="font-weight-bold"style={{textTransform: "uppercase"}}>{post.author.userName}</span></div>
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
    <div style={{ marginTop: "7%"}}>
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
      {post.comments.length !== 0 && (
        <div>
          <h3>comments :</h3>
          <ul className="ml-5">
            {post.comments.map((comment) => (
              <Commentitem key={comment.id} comment={comment} />
            ))}
          </ul>
        </div>
      )}
   
      {mutationLoading && (
        <div>
          <img src={loader} />
        </div>
      )}



<div className="box-content card col-7 " style={{marginLeft: "16%"}}>
<div className="row">
<div className="col-8" >
<div className="card-content">
<div className="mt-3 col-12" style={{marginLeft: "18%"}}>
      <textarea
        type="text"
        className="col-12 ml-5"
        placeholder="add comment"
        value={newComment}
        onChange={onNewCommentChange}
      />
      </div>
      <div className="mt-2" style={{marginLeft: "33%"}}>
      <button className="btn btn-primary btn-sm" disabled={_.isEmpty(newComment)} onClick={createComment}>
        comment
      </button>
      </div>
      </div>
    </div>
  </div>
  </div>
  </div>


  );
};
export default Post;
