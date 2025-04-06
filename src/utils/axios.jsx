import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",

  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMTA1OGZlZGU0YzI4ZjEwYzFjYjkwYzY5ZjY5ZmQ0MCIsIm5iZiI6MTc0MTQxOTI1NS40MjcsInN1YiI6IjY3Y2JmMmY3NDJjNzUyMTI1MmY1OWNmOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Uk7RkUfEnfMRAe6dXBjL2FzsPUPbdO_nUtg_E9cnusg",
  },
});

export default instance;
