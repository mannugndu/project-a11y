const urls = require("./urls");
const homePage = {
  name: "home page",
  url: urls.homePage,
  fullScan: {
    skipFailure: true,
  },
  partialScan: [
    {
      name: "navbar",
      include: [["nav.navbar"]],
      rules: { "color-contrast": { enabled: false } },
      skipFailure: true,
    },
  ],
};

module.exports = homePage;
