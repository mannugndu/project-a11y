const Handlebars = require("handlebars");
const fs = require("fs");
const chalk = require("chalk");
const urls = require("../fixtures/urls");
const path = require("path");
const generatorConfig = require("./generatorConfig");

console.log(chalk.green("Generating Test Files..."));

Handlebars.registerHelper("codeFullScan", function (fullScan, options) {
  if (fullScan && fullScan.enabled === false) return options.inverse(this);
  else return options.fn(this);
});
Handlebars.registerHelper("isRuleAvailable", function (rules, options) {
  if (rules) return options.fn(this);
  else return options.inverse(this);
});
Handlebars.registerHelper("codeContext", function (include, exclude, options) {
  if ((include && include.length) || (exclude && exclude.length))
    return options.fn(this);
  else return options.inverse(this);
});
Handlebars.registerHelper("codeOptions", function (runOnly, rules, options) {
  if ((runOnly && runOnly.length) || (rules && Object.keys(rules).length))
    return options.fn(this);
  else return options.inverse(this);
});

const source = fs.readFileSync(
  path.join(__dirname, "testsTemplate.mustache"),
  "utf-8"
);
const template = Handlebars.compile(source);

const getTestsDir = () => {
  const directory = path.join(__dirname, "../integration/a11yTests");

  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
  }
  return directory;
};

Object.keys(urls).forEach((page) => {
  try {
    let pageConfig = require(`../fixtures/${page}.js`);
    fs.writeFileSync(
      path.join(getTestsDir(), `${page}.js`),
      template(pageConfig)
    );
  } catch (error) {
    if (error.code === "MODULE_NOT_FOUND") {
      fs.writeFileSync(
        path.join(getTestsDir(), `${page}.js`),
        template({
          name: page,
          url: urls[page],
          fullScan: {
            skipFailure: generatorConfig.skipFailure ? true : false,
            runOnly:
              generatorConfig.runOnly && generatorConfig.runOnly.length > 0
                ? generatorConfig.runOnly
                : undefined,
            rules:
              generatorConfig.rules &&
              Object.keys(generatorConfig.rules).length > 0
                ? generatorConfig.rules
                : undefined,
          },
        })
      );
    } else {
      throw error;
    }
  }
});
