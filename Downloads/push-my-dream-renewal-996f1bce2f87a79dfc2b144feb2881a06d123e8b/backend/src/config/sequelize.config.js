const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  // process.env.NODE_ENV === "development" ? "root" : process.env.DB_USER,
  // process.env.NODE_ENV === "development" ? "!2dkdltpfk" : process.env.DB_PASS,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    // host:
    //   process.env.NODE_ENV === "development"
    //     ? "127.0.0.1"
    //     : process.env.DB_HOST,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    operatorsAliases: 0,
    encrypt: true,
    timezone: "+09:00",
    logging: process.env.NODE_ENV !== "production" ? console.log : null,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

const ping = () => {
  sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully");
    })
    .catch((err) => {
      console.error("Unable to connect to the database", err);
    });
};

module.exports = { sequelize, ping };
