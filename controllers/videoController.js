import routes from "../routes";

export const home = (req, res) => {
  res.render("Home", { pageTitle: "Home", videos });
};

export const search = (req, res) => {
  // const searchingBy = req.query.term; sasme as below
  const {
    query: { term: searchingBy },
  } = req;
  console.log(searchingBy);
  res.render("Search", { pageTitle: "Search", searchingBy, videos });
};

// export const videos = (req, res) => res.render("Videos", {pageTitle: "Videos"});
export const getUpload = (req, res) => res.render("upload", { pageTitle: "Upload" });

export const postUpload = (req, res) => {
  // gets info from upload.pug
  const {
    body: { file, title, description },
  } = req;
  //    To do : Upload and save video
  res.redirect(routes.videoDetail(11111));
};

export const videoDetail = (req, res) => res.render("videoDetail", { pageTitle: "Video Detail" });
export const editVideo = (req, res) => res.render("editVideo", { pageTitle: "Edit Video" });
export const deleteVideo = (req, res) => res.render("deleteVideo", { pageTitle: "Delete Video" });
