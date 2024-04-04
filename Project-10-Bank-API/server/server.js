const express = require("express");
const dotEnv = require("dotenv");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const yaml = require("yamljs");
const swaggerDocs = yaml.load("./swagger.yaml");
const dbConnection = require("./database/connection");
const userModel = require("./database/models/userModel");

dotEnv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to the database
dbConnection();

// Handle CORS issues
app.use(cors());

// Request payload middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handle custom routes
app.use("/api/v1/user", require("./routes/userRoutes"));

// API Documentation
if (process.env.NODE_ENV !== "production") {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
}

app.get("/", (req, res, next) => {
  res.send("Hello from my Express server v2!");
});

app.get("/api/users", async (req, res, next) => {
  try {
    const users = await userModel.find();
    res.json(users);
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs :", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des utilisateurs" });
  }
});
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
