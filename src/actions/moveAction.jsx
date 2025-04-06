export { removemove } from "../reducers/moveSlice";
import axios from "../utils/axios";
import { loadmove } from "../reducers/moveSlice";

// Action to fetch movie details by ID
export const asyncloadmove = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/movie/${id}`);
    dispatch(loadmove(data));
    return data;
  } catch (error) {
    console.error("Error loading movie details:", error);
    return null;
  }
};
