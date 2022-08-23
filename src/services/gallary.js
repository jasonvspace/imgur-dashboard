import api from "./api";

const gallaryApi = {
  listGallary(query) {
    return api({
      method: "get",
      url: `/gallery/${query ? "search" : "hot"}/time/0`,
      params: {
        q: query,
      },
    });
  },
};

export default gallaryApi;
