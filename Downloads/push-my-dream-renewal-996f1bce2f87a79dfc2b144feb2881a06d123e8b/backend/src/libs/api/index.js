const axios = require("axios");

const { API_SERVER, ADMIN_SERVER } = process.env;

exports.adminCommonApi = axios.create({
  baseURL: `${ADMIN_SERVER}/api/v1/common`,
});
