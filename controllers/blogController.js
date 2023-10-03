const axios = require("axios");
const _ = require("lodash");

const fetchBlogData = async () => {
  const response = await axios.get(
    "https://intent-kit-16.hasura.app/api/rest/blogs",
    {
      headers: {
        "x-hasura-admin-secret":
          "32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6",
      },
    }
  );

  return response.data.blogs;
};

const analyzeBlogData = (blogs) => {
  const totalBlogs = blogs.length;
  const longestTitleBlog = _.maxBy(blogs, "title.length");
  const blogsWithPrivacy = blogs.filter((blog) =>
    blog.title.toLowerCase().includes("privacy")
  );
  const uniqueTitles = _.uniqBy(blogs, "title");

  return {
    totalBlogs,
    longestTitle: longestTitleBlog.title,
    blogsWithPrivacy: blogsWithPrivacy.length,
    uniqueTitles: uniqueTitles.map((blog) => blog.title),
  };
};

module.exports = {
  fetchBlogData,
  analyzeBlogData,
};
