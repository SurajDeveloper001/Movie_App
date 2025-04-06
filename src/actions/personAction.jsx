import { loadperson, removeperson } from "../reducers/personSlice";
import axios from "../utils/axios";

// Action to fetch person details by ID
export const asyncloadperson = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/person/${id}`);
    dispatch(loadperson(data));
    return data;
  } catch (error) {
    console.error("Error loading person details:", error);
    return null;
  }
};

export { removeperson };
