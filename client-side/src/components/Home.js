import React, { useState } from "react";
import onError, { MUTATING, QUERYING } from "../services/errorsHandler";
import currentUser, { isAdmin } from "../services/apollo/cache";
import { useQuery, useMutation } from "@apollo/client";
import { CREATE_POST, GET_POSTS } from "../services/apollo/queries";
import { onAppendSuccess } from "../services/onSuccess";
import Postitem from "./Postitem";
import loader from "../images/loader.gif";
import _ from "lodash";

const Home = () => {
  const [newPost, setnewPost] = useState("");

  const { loading, error, data } = useQuery(GET_POSTS, {
    onError: () => onError(QUERYING),
  });
  const [createNewPost, { loading: mutationLoading }] = useMutation(
    CREATE_POST,
    {
      onError: () => onError(MUTATING),
    }
  );

  const onNewPostChange = ({ target }) => {
    const input = target.value;
    setnewPost(input);
  };

  const createPost = ({}) => {
    createNewPost({
      variables: { data: { author: currentUser()._id, content: newPost } },
      refetchQueries: [{ query: GET_POSTS }],
    });
    onAppendSuccess();
    setnewPost("");
  };

  if (loading) return <img src={loader} />;
  if (error) return `Error! ${error.message}`;
  return (
    <div id="wrapper" style={{marginTop: "2%", marginLeft: "9%"}}>
      <div className="main-content">
        <div className="form-group">
            {!isAdmin() && (
              <React.Fragment>
                <div className="col-lg-9 col-12">
                  <div className="row">
                    <div className="col-10 ml-5">
                      <div className="box-content card">
                        <h4 className="box-title" style={{backgroundColor: "#034a57"}}><i className="fa fa-user ico"></i>Create a Post: </h4>
                        <div className="card-content">
                          <textarea
                            id="message"
                            type="text"
                            className="col-11 ml-5"
                            value={newPost}
                            placeholder="Enter a message ..."
                            onChange={onNewPostChange}
                          />
                          <button className="btn btn-primary btn-sm mt-3 ml-5" disabled={_.isEmpty(newPost)} onClick={createPost}>
                            Post
                          </button>
                          </div>
                        </div>
                        {mutationLoading && (
                          <div>
                            <img src={loader} />
                          </div>
                        )}
                      </div>
                  </div>    
            </div>
          </React.Fragment>
        )}

                {data.posts.length !== 0 ? (
                  <ul>
                    {data.posts.map((post) => (
                      <Postitem key={post.id} post={post} />
                    ))}
                  </ul>
                ) : (
                  <p className="hello"> No post had been posted anything yet... </p>
                )}

       
        </div>
        </div>
        </div>
  
  );
};

export default Home;
