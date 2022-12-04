import axiosConfig from "./axiosconfig";

//get all user data
const getAllUser = async () => {
  return await axiosConfig.get("/api/users/");
};

//get a user data
const getOneUser = async (email) => {
  return await axiosConfig.get(`/api/users/select/${email}`);
};

//check the login user
const login = async (userdata) => {
  return await axiosConfig.get("/api/users/login", {
    params: {
      email: userdata.email,
      password: userdata.password,
    },
  });
};

//create a user
const createUser = async (userdata) => {
  try {
    // handler sucess
    return await axiosConfig.post("/api/users/create", userdata);
  } catch (error) {
    // handler error
    console.log(error);
  }
};

//updata a user detail
const updateUser = async (user_id, userdata) => {
  const user = await axiosConfig.put(`/api/users/update/${user_id}`, userdata);
  return user;
};

//delete a user
const removeUser = async (user_id) => {
  await axiosConfig.delete(`/api/users/delete/${user_id}`);
};

export { getAllUser, getOneUser, createUser, login, updateUser, removeUser };
