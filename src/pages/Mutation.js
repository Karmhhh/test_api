import { useState } from "react";
import { useMutation } from "react-query";
import axios from "axios";
const updateUser = async (x) => {
  return await axios.put(`https://api.github.com/users/`, x.body);
};

const onSuccFn = () => {};

const getUsers = async () => {
  return await axios.get("https://api.github.com/users");
};

export default function Mutation() {

  const [postData, setPostData] = useState({ id: "", body: "" });
  const mutation = useMutation({
    mutationFn: 
    ()=> updateUser,
    onSuccess: () => {
      // Success actions
    },
    onError: (error) => {
      // Error actions
    },
  });

  return (
    <div>
      <input
        type="text"
        onChange={(e) => {
          setPostData({ ...postData, id: e.target.value });
        }}
      ></input>{" "}
      <input
        type="text"
        onChange={(e) => {
          setPostData({ ...postData, body: e.target.value });
        }}
      ></input>
      <br />
      <i>{`{ id: "${postData.id}"`}</i>
      <i>
        {` , body: "${postData.body}"`}
        {" }"}
      </i>

      {mutation.isSuccess ? <div>Added!</div> : null}


      <br />
      <button onClick={ mutation.mutate({ id: postData.id, body: postData.body})}>Post</button>
    </div>
  );
}
