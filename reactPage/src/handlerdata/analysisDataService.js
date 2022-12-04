import axiosConfig from "./axiosconfig";

//add profile visit count
const addPorfileVisitCount = async (user_id) => {
  return await axiosConfig.post(
    `/api/profileVisit/addProfilevisitCount/${user_id}`
  );
};

//add how many user visit website
const addPersonVisitCount = async () => {
  return await axiosConfig.post("/api/personVisit/addPersonvisitCount");
};

export { addPorfileVisitCount, addPersonVisitCount };
