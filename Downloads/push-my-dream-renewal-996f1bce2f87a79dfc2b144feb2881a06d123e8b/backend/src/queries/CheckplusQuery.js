const { getAll, getOne, set, modify, remove } = require("../shared/Query");
const { escapeQuot } = require("shared/functions");

class Query {
  async setCheckplusLog({
    sEncData,
    sRtnMSG,
    requestnumber,
    responsenumber,
    authtype,
    name,
    birthdate,
    gender,
    nationalinfo,
    dupinfo,
    conninfo,
    mobileno,
    mobileco,
    errcode
  }) {
    const res = await set(`
        INSERT INTO CHECKPLUS_LOG(sEncData, sRtnMSG, requestnumber, responsenumber, authtype, name, birthdate, gender, nationalinfo, dupinfo, conninfo, mobileno, mobileco, errcode) 
        VALUES(${escapeQuot(sEncData)}, ${escapeQuot(sRtnMSG)}, ${escapeQuot(
      requestnumber
    )}, ${escapeQuot(responsenumber)}, ${escapeQuot(authtype)}, ${escapeQuot(
      name
    )}, ${escapeQuot(birthdate)}, ${gender || null}, ${nationalinfo ||
      null}, ${escapeQuot(dupinfo)}, ${escapeQuot(conninfo)}, ${escapeQuot(
      mobileno
    )}, ${escapeQuot(mobileco)}, ${escapeQuot(errcode || "")})
        `);

    return res;
  }
}

module.exports = Query;
