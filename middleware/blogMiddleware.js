const _ = require("lodash");

const memoizedFetchBlogData = _.memoize(
  async (fetchFunction) => {
    return await fetchFunction();
  },
  () => Date.now()
);

const memoizedSearch = _.memoize(
  (query, blogs, searchFunction) => {
    return searchFunction(query, blogs);
  },
  (query) => query.toLowerCase()
);

module.exports = {
  memoizedFetchBlogData,
  memoizedSearch,
};
