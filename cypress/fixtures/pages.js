const fullScanDefaults = () => ({
  skipFailures: false,
  rules: [],
  runOnly: [],
});

const partialDefaults = () => ({
  ...fullScanDefaults(),
  selector: "",
  include: [],
  exclude: [],
});

const pageData = {
  home: {
    url: "",
    locators: {},
  },
};

export default {
  home: {
    url: "",
    fullScan: { ...fullScanDefaults() },
    partialScan: {
      navBar: { ...partialDefaults() },
      header: { ...partialDefaults() },
      allLinks: { ...partialDefaults() },
    },
  },
};
