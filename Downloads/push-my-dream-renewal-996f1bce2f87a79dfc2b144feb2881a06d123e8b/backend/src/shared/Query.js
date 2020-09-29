const Sequelize = require("sequelize");
const { sequelize } = require("../config/sequelize.config");

const { dashFormYYMD, dashFormYYMDHMS, setLog } = require("./functions");
const getAll = async (query, config) => {
  return await sequelize.query(query, {
    type: Sequelize.QueryTypes.SELECT,
    nest: true,
    ...config
  });
};
const getOne = async (query, config) => {
  const result = await sequelize.query(query, {
    type: Sequelize.QueryTypes.SELECT,
    nest: true,
    ...config
  });
  return result[0];
};
const set = async (query, config) => {
  return await sequelize.query(query, {
    type: Sequelize.QueryTypes.INSERT,
    ...config
  });
};
const modify = async (query, config) => {
  return await sequelize.query(query, {
    type: Sequelize.QueryTypes.UPDATE,
    ...config
  });
};
const remove = async (query, config) => {
  return await sequelize.query(query, {
    type: Sequelize.QueryTypes.DELETE,
    ...config
  });
};

const query = async (query, config) => {
  return await sequelize.query(_query, {
    ...config
  });
};

module.exports = { getAll, getOne, set, modify, remove };
