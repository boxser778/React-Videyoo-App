import  {useState,useEffect} from "react";
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

 const useUsers = (users)=>{
  const [resources,setResources]= useState([]);

  const getUsers = async ()=>{
    const response = await axios.get(`${apiUrl}/users/my-users`);
    setResources(response.data);
  }

  useEffect(()=>{
    getUsers(users);
  },[users])

  return resources;
}

export default useUsers;