import React, { useState, useEffect } from "react";
import getUserDetails from "../utils/getUserDetails";

const TestUserComponent = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user details when the component mounts
    getUserInfoBySessionId();
  }, []);

  async function getUserInfoBySessionId() {
    let session_id = "3f99a243-0a03-462c-a6d6-c83c71cc92ec";
    let userDetails = await getUserDetails(session_id);
    console.log("user details: " + userDetails);

    // Update the state with the user details
    setUser(userDetails);
  }

  console.log("user: " + user);
  console.log("user.email: " + user.email);

  let id = user.id;
  let email = user.email;

  return <div>User details: {id} {email}</div>;
};

export default TestUserComponent;



// import getUserDetails from "../utils/getUserDetails"

// const TestUserComponent = (props) => {

//     function getUserInfoBySessionId() {
//         let session_id = "3f99a243-0a03-462c-a6d6-c83c71cc92ec";
//         let user = getUserDetails(session_id);

//     }

//     return(
//         <div>{user}</div>
//     )
// }

// export default TestUserComponent;