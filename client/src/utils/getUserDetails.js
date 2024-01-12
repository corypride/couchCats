import axios from 'axios';

//TODO: Revisit -- this is not an accurate backend api endpoint now that it has been reconfigured. Also this endpoint is NOT for getting user details, it is for checking if a user has a valid sessionId and is logged in. 
const getUserDetails = async (session_id) => {
  const url = 'http://localhost:8080/user/secure';

  try {
    console.log("Try statement runs");
    const response = await axios.get(url, {
      params: {
        //TODO: Remove this hard-coded sessionId
        sessionId: "3f99a243-0a03-462c-a6d6-c83c71cc92ec",
      },
    });

    const data = await response.data;
    console.log(data);
    return data;
  } catch (error) {
    console.error("Catch statement runs" + error);
    return null;
  }
};

export default getUserDetails;
