const { getAll, getOne, set, modify, remove } = require("../shared/Query");

class CategoryContestQuery {
  async getCompany() {
    return await getOne(
      `SELECT company_no, company_name, company_addr, company_num, company_tel FROM COMPANY`
    );
  }
  async getDreamerIntro() {
    return await getAll(
      `SELECT category_level1_no, category_level1_gubun, category_level1_title, category_level1_slogan FROM CATEGORY_LEVEL1`
    );
  }
  async getDreamerContents(dreamerIntroNo) {
    return await getAll(
      `SELECT dreamer_contents_no, dreamer_contents_title, dreamer_contents FROM DREAMER_CONTENTS WHERE category_level1_no = ${dreamerIntroNo}`
    );
  }
  async getCategoryContest() {
    return await getAll(
      `SELECT category_contest_no, category_contest, category_contest_desc FROM CATEGORY_CONTEST`
    );
  }
  async test() {
    const res = await getAll(`SELECT CATEGORY_LEVEL1.category_level1_no, CATEGORY_LEVEL1.category_level1_gubun, CATEGORY_LEVEL1.category_level1_title, CATEGORY_LEVEL1.category_level1_slogan, DREAMER_CONTENTS.dreamer_contents_no, DREAMER_CONTENTS.dreamer_contents_title, DREAMER_CONTENTS.dreamer_contents
    FROM CATEGORY_LEVEL1
      INNER JOIN DREAMER_CONTENTS ON DREAMER_CONTENTS.category_level1_no = CATEGORY_LEVEL1.category_level1_no`);
    const resObj = [];
    for (let i = 0; i < res.length; i++) {
      const idx = resObj.findIndex(
        v => v.category_level1_no === res[i].category_level1_no
      );
      if (idx === -1) {
        resObj.push({
          category_level1_no: res[i].category_level1_no,
          category_level1_gubun: res[i].category_level1_gubun,
          category_level1_title: res[i].category_level1_title,
          category_level1_slogan: res[i].category_level1_slogan,
          DREAMER_CONTENTS: [
            {
              dreamer_contents_no: res[i].dreamer_contents_no,
              dreamer_contents_title: res[i].dreamer_contents_title,
              dreamer_contents: res[i].dreamer_contents
            }
          ]
        });
      } else {
        resObj[idx].DREAMER_CONTENTS.push({
          dreamer_contents_no: res[i].dreamer_contents_no,
          dreamer_contents_title: res[i].dreamer_contents_title,
          dreamer_contents: res[i].dreamer_contents
        });
      }
    }
    return resObj;
  }
}

module.exports = CategoryContestQuery;
