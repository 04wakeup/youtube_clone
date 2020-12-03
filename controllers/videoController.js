import routes from "../routes";
import Video from "../models/Video";

export const home = async (req, res) => {
  // use async, await to handle data asynchrously
  try {
    const videos = await Video.find({});
    res.render("Home", { pageTitle: "Home", videos });
  } catch (error) {
    console.log(error);
    res.render("Home", { pageTitle: "Home", videos: [] });
  }
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

export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { path },
  } = req;
  const newVideo = await Video.create({
    fileUrl: path,
    title,
    description,
  });
  res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id); // find vidoe from db
    res.render("videoDetail", { pageTitle: "Video Detail", video });
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const editVideo = (req, res) => res.render("editVideo", { pageTitle: "Edit Video" });
export const deleteVideo = (req, res) => res.render("deleteVideo", { pageTitle: "Delete Video" });
