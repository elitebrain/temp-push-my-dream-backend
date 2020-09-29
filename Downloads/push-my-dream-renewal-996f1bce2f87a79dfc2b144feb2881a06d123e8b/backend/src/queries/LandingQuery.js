const { getAll, getOne, set, modify, remove } = require("../shared/Query");

class LandingQuery {
  async getDreamerIntro() {
    const res = await getAll(`SELECT CATEGORY_LEVEL1.category_level1_no, CATEGORY_LEVEL1.category_level1_gubun, CATEGORY_LEVEL1.category_level1_title, CATEGORY_LEVEL1.category_level1_slogan, 
      DREAMER_TAB.dreamer_tab_no, DREAMER_TAB.dreamer_tab,
      DREAMER_CONTENTS.dreamer_contents_no, DREAMER_CONTENTS.dreamer_gubun, DREAMER_CONTENTS.dreamer_contents, DREAMER_CONTENTS.dreamer_contents_photo, DREAMER_CONTENTS.parent_pk,
      CATEGORY_LEVEL2.category_level2_no, CATEGORY_LEVEL2.category_level2, CATEGORY_LEVEL2.category_level2_desc
    FROM CATEGORY_LEVEL1
      INNER JOIN DREAMER_TAB ON DREAMER_TAB.category_level1_no = CATEGORY_LEVEL1.category_level1_no
      INNER JOIN DREAMER_CONTENTS ON DREAMER_CONTENTS.dreamer_tab_no = DREAMER_TAB.dreamer_tab_no
      INNER JOIN CATEGORY_LEVEL2 ON CATEGORY_LEVEL2.category_level1_no = CATEGORY_LEVEL1.category_level1_no`);
    // const res = await getAll(`SELECT CATEGORY_LEVEL1.category_level1_no AS "CATEGORY_LEVEL1.category_level1_no", CATEGORY_LEVEL1.category_level1_gubun AS "CATEGORY_LEVEL1.category_level1_gubun", CATEGORY_LEVEL1.category_level1_title AS "CATEGORY_LEVEL1.category_level1_title", CATEGORY_LEVEL1.category_level1_slogan AS "CATEGORY_LEVEL1.category_level1_slogan",
    //   DREAMER_TAB.dreamer_tab_no AS "DREAMER_TAB.dreamer_tab_no", DREAMER_TAB.dreamer_tab AS "DREAMER_TAB.dreamer_tab",
    //   DREAMER_CONTENTS.dreamer_contents_no AS "DREAMER_CONTENTS.dreamer_contents_no", DREAMER_CONTENTS.dreamer_gubun AS "DREAMER_CONTENTS.dreamer_gubun", DREAMER_CONTENTS.dreamer_contents AS "DREAMER_CONTENTS.dreamer_contents", DREAMER_CONTENTS.dreamer_contents_photo AS "DREAMER_CONTENTS.dreamer_contents_photo", DREAMER_CONTENTS.parent_pk AS "DREAMER_CONTENTS.parent_pk"
    // FROM CATEGORY_LEVEL1
    //   INNER JOIN DREAMER_TAB ON CATEGORY_LEVEL1.category_level1_no = DREAMER_TAB.category_level1_no
    //   INNER JOIN DREAMER_CONTENTS ON DREAMER_CONTENTS.dreamer_tab_no = DREAMER_TAB.dreamer_tab_no`);
    // return res;
    const CATEGORY_LEVEL2 = [];
    for (let i = 0; i < res.length; i++) {
      if (
        CATEGORY_LEVEL2.findIndex(
          v => v.category_level2_no === res[i].category_level2_no
        ) === -1
      ) {
        CATEGORY_LEVEL2.push({
          category_level1_no: res[i].category_level1_no,
          category_level2_no: res[i].category_level2_no,
          category_level2: res[i].category_level2,
          category_level2_desc: res[i].category_level2_desc
        });
      }
    }
    const DREAMER_CONTENTS = [];
    for (let i = 0; i < res.length; i++) {
      if (
        DREAMER_CONTENTS.findIndex(
          v => v.dreamer_contents_no === res[i].dreamer_contents_no
        ) === -1
      ) {
        DREAMER_CONTENTS.push({
          dreamer_tab_no: res[i].dreamer_tab_no,
          dreamer_contents_no: res[i].dreamer_contents_no,
          dreamer_gubun: res[i].dreamer_gubun,
          dreamer_contents: res[i].dreamer_contents,
          dreamer_contents_photo: res[i].dreamer_contents_photo,
          parent_pk: res[i].parent_pk
        });
      }
    }
    const DREAMER_TAB = [];
    for (let i = 0; i < res.length; i++) {
      const tabIdx = DREAMER_TAB.findIndex(
        v => v.dreamer_tab_no === res[i].dreamer_tab_no
      );
      if (tabIdx === -1) {
        DREAMER_TAB.push({
          dreamer_tab_no: res[i].dreamer_tab_no,
          dreamer_tab: res[i].dreamer_tab,
          DREAMER_CONTENTS: DREAMER_CONTENTS.filter(
            v => v.dreamer_tab_no === res[i].dreamer_tab_no
          )
        });
      }
    }
    const resObj = [];
    for (let i = 0; i < res.length; i++) {
      const introIdx = resObj.findIndex(
        v => v.category_level1_no === res[i].category_level1_no
      );
      if (introIdx === -1) {
        resObj.push({
          category_level1_no: res[i].category_level1_no,
          category_level1_gubun: res[i].category_level1_gubun,
          category_level1_title: res[i].category_level1_title,
          category_level1_slogan: res[i].category_level1_slogan,
          DREAMER_TAB,
          CATEGORY_LEVEL2: CATEGORY_LEVEL2.filter(
            v => v.category_level1_no === res[i].category_level1_no
          )
        });
      }
    }
    return resObj;
  }
}

module.exports = LandingQuery;
