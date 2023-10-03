const express = require("express");
const {
  fetchBlogData,
  analyzeBlogData,
} = require("../controllers/blogController");
const {
  memoizedFetchBlogData,
  memoizedSearch,
} = require("../middleware/blogMiddleware");

const router = express.Router();

// Middleware to fetch and analyze blog data with caching
router.get("/blog-stats", async (req, res) => {
  try {
    // Fetch blog data with caching
    const blogs = await memoizedFetchBlogData(fetchBlogData);

    // Data analysis
    const responseData = analyzeBlogData(blogs);

    res.json(responseData);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error", message: error.message });
  }
});

// Blog search endpoint with caching
router.get("/blog-search", async (req, res) => {
  try {
    const query = req.query.query;

    // Ensure query parameter is provided
    if (!query) {
      return res.status(400).json({ error: "Query parameter is required" });
    }

    // Fetch blog data with caching
    const blogs = await memoizedFetchBlogData(fetchBlogData);

    // Perform search with caching
    const searchResults = memoizedSearch(query, blogs, (query, blogs) => {
      return blogs.filter((blog) => blog.title.toLowerCase().includes(query));
    });

    res.json(searchResults);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
