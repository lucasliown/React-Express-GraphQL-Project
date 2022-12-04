import moment from "moment";

//use the moment for get the data time in the project
function formatMonth() {
  return moment().format("MMMM").substring(0, 3);
}

function formatWeekday() {
  return moment().format("dddd").substring(0, 3);
}

function formatYear() {
  return moment().format("YYYY");
}

function formatNumber() {
  return moment().format("DD");
}

function formattime() {
  return moment().format("MMMM Do YYYY, h:mm:ss a");
}

export { formatMonth, formatWeekday, formatYear, formatNumber, formattime };
