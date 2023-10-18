const app = require("./app/app");

const { swaggerDocs: V1SwaggerDocs } = require("./v1/swagger");
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  V1SwaggerDocs(app, PORT);
});
