import app from "./app.js";
import sequelize from "./config/db.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully!");

    //seedimg the Database
    await sequelize.sync({ alter: true });
    console.log("Models synchronized!");

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer();

