const sonarqubeScanner = require("sonarqube-scanner");
sonarqubeScanner(
  {
    serverUrl: "http://16.171.237.144:9000/",
    options: {
      "sonar.login": "squ_bc5360b1e2379dd685703d711f24188707574c5a",
      "sonar.projectKey": "nodejs-api-testing",
      "sonar.sources": ".",
      "sonar.tests": ".",
      "sonar.inclusions": "index.js",
      "sonar.javascript.lcov.reportPaths": "./coverage/lcov.info",
    },
  },
  () => {}
);
