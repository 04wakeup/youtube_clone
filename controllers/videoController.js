export const home = (req, res) => res.render("Home", {pageTitle: "Home"}); 

export const search = (req, res) => {
    // const searchingBy = req.query.term; sasme as below
    const {query: {term: searchingBy}} = req;
    console.log(searchingBy);
    res.render("Search", {pageTitle: "Search", searchingBy });
} 

export const videos = (req, res) => res.render("Videos", {pageTitle: "Videos"});
export const upload = (req, res) => res.render("upload", {pageTitle: "Upload"});
export const videoDetail = (req, res) => res.render("Video Detail", {pageTitle: "Video Detail"});
export const editVideo = (req, res) => res.render("editVideo", {pageTitle: "Edit Video"});
export const deleteVideo = (req, res) => res.render("deleteVideo", {pageTitle: "Delete Video"});   