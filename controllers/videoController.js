import routes from "../routes";
import Video from "../models/Video";

export const home = async (req, res) => {
  // use async, await to handle data asynchrously
  try {
    const videos = await Video.find({}).sort({ _id: -1 });
    res.render("Home", { pageTitle: "Home", videos });
  } catch (error) {
    console.log(error);
    res.render("Home", { pageTitle: "Home", videos: [] });
  }
};

export const search = async (req, res) => {
  // const searchingBy = req.query.term; sasme as below
  const {
    query: { term: searchingBy },
  } = req;
  let videos = [];
  try {
    videos = await Video.find({ title: { $regex: searchingBy, $options: "i" } }); // use Regex for insensitive
  } catch (error) {
    console.log(error);
  }
  res.render("Search", { pageTitle: "Search", searchingBy, videos });
};

// export const videos = (req, res) => res.render("Videos", {pageTitle: "Videos"});
export const getUpload = (req, res) => res.render("upload", { pageTitle: "Upload" });

export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { path },
  } = req;
  // insert data on DB
  const newVideo = await Video.create({
    fileUrl: path,
    title,
    description,
    creator: req.user.id,
  });
  req.user.videos.push(newVideo.id); // add new video on a user
  req.user.save();
  res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id).populate("creator"); // find vidoe from db, then find user detail only USING Object ID!

    res.render("videoDetail", { pageTitle: video.title, video });
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const getEditVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    if (`${video.creator}` !== req.user.id) {
      throw Error();
    } else {
      res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
    }
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description },
  } = req;
  try {
    await Video.findOneAndUpdate({ _id: id }, { title, description });
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const deleteVideo = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const video = await Video.findById(id);
    if (`${video.creator}` !== req.user.id) {
      throw Error();
    } else {
      await Video.findOneAndRemove({ _id: id });
    }
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.home);
};
// register video view
export const postRegisterView = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;

    const video = await Video.findById(id);
    video.views = video.views + 1;
    video.save();
    res.status(200);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};
