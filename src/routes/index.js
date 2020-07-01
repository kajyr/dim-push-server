const colors = require("colors");
const routes = [require("./tracking"), require("./solr")];

module.exports = function (app) {
  console.info(colors.blue("Routes"));
  console.info("------");

  routes.forEach((group) => {
    group.forEach((route) => {
      console.info(`${colors["blue"](route.method)}\t${route.path}`);

      app[route.method.toLowerCase()](route.path, route.handler);
    });
  });
  console.info("------");
};
