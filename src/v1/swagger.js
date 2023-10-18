const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Metadata info about api
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Content manager API",
      version: "1.0.0",
    },
  },
  apis: [
    "src/v1/routes/content.router.js",
    "src/v1/routes/user.router.js",
    "src/v1/routes/auth.router.js",
    "src/v1/routes/category.router.js",
    "src/v1/routes/topic.router.js",
    "src/models/content.js",
  ],
};

// Docs json format
const swaggerSpec = swaggerJSDoc(options);
//Function to setup our docs
const swaggerDocs = (app, port) => {
  app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get("/api/v1/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  console.log(
    ` Version 1 Docs is available at http://localhost:${port}/api/v1/docs`
  );
};

module.exports = { swaggerDocs };
