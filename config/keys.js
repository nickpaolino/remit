// determine whether we're in the prod or dev environments and return the relevant keys

if (process.env.NODE_ENV === "production") {
  // in production, return prod set of keys
  module.exports = require("./prod");
} else {
  // in development, return dev set of keys
  module.exports = require("./dev");
}
