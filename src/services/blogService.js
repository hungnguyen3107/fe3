import axiosInstance from "../const/axiosInstance"

const fetchAllBlog = () => {
    return axiosInstance.get("/");
}
const postDetailBlog = (title) => {
    return axiosInstance.post("/get_new/", title);
}

export { fetchAllBlog, postDetailBlog };