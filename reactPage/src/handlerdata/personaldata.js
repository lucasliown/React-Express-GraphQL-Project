import {
  formatWeekday,
  formatMonth,
  formatYear,
  formatNumber,
  formattime,
} from "../Utilities/processDate";
import moment from "moment";
import {
  getAllUser as getServiceAllUser,
  createUser as serviceCreateUser,
  login as serviceLoginUser,
  updateUser as serviceUpdateUser,
  removeUser as serviceRemoveUser,
} from "./userDataService";

const userkey = "user";
const authCode = "code";
const authCodeTime = "authCodeTime";

function getUserData() {
  const user = JSON.parse(localStorage.getItem(userkey));
  return user;
}

function getCodeFromLocal() {
  const code = localStorage.getItem(authCode);
  return code;
}

//set the new user in the local storge
async function setNewUser(usernameFromWeb, emailFromWeb, passwordFromWeb) {
  const newUser = {
    username: usernameFromWeb,
    email: emailFromWeb,
    password: passwordFromWeb,
    join_Date:
      formatWeekday() +
      " " +
      formatNumber() +
      " " +
      formatMonth() +
      " " +
      formatYear(),
  };
  const userPromise = await serviceCreateUser(newUser);
  const user = userPromise.data;
  let userString = JSON.stringify(user);
  localStorage.setItem(userkey, userString);
  return user;
}

//user the lamba check the password is strong or not
function checkStrongPassword(password) {
  let strongPassword = new RegExp(
    "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
  );
  if (strongPassword.test(password)) {
    return true;
  }
  return false;
}

//check the vaildation for sign up
async function checkSignup(username, email, password) {
  const usersPromise = await getServiceAllUser();
  const users = usersPromise.data;
  if (username === null || username === "" || email === "" || email === null) {
    return "can not have empty username or email";
  }

  if (username.trim() === "" || email.trim() === "") {
    return "can not have empty username or email";
  }

  if (checkStrongPassword(password) === false) {
    return "not strong password";
  }
  for (const user of users) {
    if (username === user.username || email === user.email) {
      return "username or email already exist";
    }
  }

  const userData = await setNewUser(username, email, password);
  return userData;
}

//check the login when user login
async function checkLogin(email, password, authCode) {
  const loginUser = {
    email: email,
    password: password,
  };
  const checkUserLoginPromise = await serviceLoginUser(loginUser);
  const user = checkUserLoginPromise.data;
  const codeFromLocal = getCodeFromLocal();
  if (user === null || codeFromLocal !== authCode) {
    return false;
  }
  if(user.blockStatus===true){
    return "You has been blocked,Please contact website Administrator"
  }
  let userString = JSON.stringify(user);
  localStorage.setItem(userkey, userString);
  return user;
}

function logoutFromWbsite() {
  localStorage.removeItem(userkey);
}

async function deleteUser(user_id) {
  //delete the user detail in the local storge and API
  localStorage.removeItem(userkey);
  await serviceRemoveUser(user_id);
}

function findUser(email, username, array) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].email === email && array[i].username === username) return i;
  }
  return -1;
}

//edit a user when user in the profile page
async function editUser(userDatil) {
  const userFromLocal = getUserData();
  if (
    userDatil.email === userFromLocal.email &&
    userDatil.username === userFromLocal.username
  ) {
    return "You have to modify your detial";
  }
  if (
    userDatil.username === null ||
    userDatil.username === "" ||
    userDatil.email === "" ||
    userDatil.email === null
  ) {
    return "can not have empty username or email";
  }

  if (userDatil.username.trim() === "" || userDatil.email.trim() === "") {
    return "can not have empty username or email";
  }
  const usersPromise = await getServiceAllUser();
  const users = usersPromise.data;

  const deleteIndex = findUser(
    userFromLocal.email,
    userFromLocal.username,
    users
  );
  users.splice(deleteIndex, 1);
  for (const user of users) {
    if (
      user.email === userDatil.email ||
      user.username === userDatil.username
    ) {
      return "Username or email already exist";
    }
  }
  //give a new user and put in the storge
  const editUser = {
    username: userDatil.username,
    email: userDatil.email,
  };
  const userFormService = await serviceUpdateUser(
    userFromLocal.user_id,
    editUser
  );
  const userPromiseData = userFormService.data;
  userFromLocal.username = userDatil.username;
  userFromLocal.email = userDatil.email;
  localStorage.setItem(userkey, JSON.stringify(userFromLocal));
  return userPromiseData;
}

//get the auth code is here
function getcode() {
  let code =
    Math.floor(Math.random() * 100).toString() +
    Math.floor(Math.random() * 100).toString() +
    Math.floor(Math.random() * 100).toString();
  return code;
}

function saveCodeIntoLocal(code) {
  localStorage.setItem(authCode, code);
}

function removeCodeFromLocal() {
  localStorage.removeItem(authCode);
}

function saveTime() {
  const time = formattime();
  localStorage.setItem(authCodeTime, time);
}

//count the time from local storge by use momnent
function countTime() {
  const time = localStorage.getItem(authCodeTime);
  const getMomentObject = moment(time, "MMMM Do YYYY, h:mm:ss a");
  const timeCount = moment().diff(getMomentObject, "second");
  const leftTime = 60 - timeCount;
  return leftTime;
}

//make sure the button is diable or not
function countDisableTime() {
  const leftTime = countTime();
  if (leftTime === 0 || leftTime < 0) {
    return true;
  } else if (leftTime > 0) {
    return false;
  }
  return true;
}

export {
  checkLogin,
  getUserData,
  logoutFromWbsite,
  setNewUser,
  checkSignup,
  editUser,
  deleteUser,
  getcode,
  saveCodeIntoLocal,
  removeCodeFromLocal,
  saveTime,
  countTime,
  countDisableTime,
  getCodeFromLocal
};
