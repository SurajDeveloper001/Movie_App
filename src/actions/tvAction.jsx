export { removetv } from "../reducers/tvSlice";
import axios from "../utils/axios";
import { loadtv } from "../reducers/tvSlice";
export const asyncloadmove = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/Tv/${id}`);
    dispatch(loadmove(data));
    return data;
  } catch (error) {
    console.error("Error loading movie details:", error);
    return null;
  }
};
