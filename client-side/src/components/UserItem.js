import React from "react";


const UserItem = (props) => {
  const { user } = props;
  return (
    
    <tr>
        <th>{user.firstName}</th>
        <th>{user.lastName}</th>
        <th>{user.userName}</th>
        <th>{user.age}</th>
        <th>{user.email}</th>
        <th>{user.role}</th>
        <th><button>delete user</button></th>
    </tr>
  
    
  );
};

export default UserItem;
