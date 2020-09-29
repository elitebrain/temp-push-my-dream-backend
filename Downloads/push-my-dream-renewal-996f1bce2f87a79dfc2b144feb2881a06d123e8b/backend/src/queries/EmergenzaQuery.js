const { getAll, getOne, set, modify, remove } = require("shared/Query");

const { escapeQuotAllowNull } = require("shared/functions");

class EmergenzaQuery {
  // 참가 신청
  async setEmergenza(
    userNo,
    teamName,
    memberCount,
    genre,
    genre_etc,
    phone1,
    phone2,
    introduce,
    releaseCount,
    career,
    averageAge,
    instrumentList,
    memberEmailList
  ) {
    // 팀 등록
    const resTeam = await set(`
      INSERT INTO EMERGENZA_TEAM (user_no, team_name, member_count, genre, genre_etc, phone1, phone2, introduce, release_count, career, average_age)
      VALUES (${userNo || null}, ${escapeQuotAllowNull(
      teamName
    )}, ${escapeQuotAllowNull(memberCount)}, ${escapeQuotAllowNull(
      genre
    )}, ${escapeQuotAllowNull(genre_etc)}, ${escapeQuotAllowNull(
      phone1
    )}, ${escapeQuotAllowNull(phone2)}, ${escapeQuotAllowNull(
      introduce
    )}, ${escapeQuotAllowNull(releaseCount)}, ${escapeQuotAllowNull(career)}, ${
      averageAge ? escapeQuotAllowNull(averageAge) : null
    })
    `);
    // 악기 / 이메일 등록
    const arrValues = [];
    for (let i = 0; i < instrumentList.length; i++) {
      if (instrumentList[i].length > 0) {
        arrValues.push(
          `(${resTeam[0]}, 'instrument', ${escapeQuotAllowNull(
            instrumentList[i]
          )})`
        );
      }
    }
    for (let i = 0; i < memberEmailList.length; i++) {
      if (memberEmailList[i].length > 0) {
        arrValues.push(
          `(${resTeam[0]}, 'email', ${escapeQuotAllowNull(memberEmailList[i])})`
        );
      }
    }
    if (arrValues.length > 0) {
      const resTeamSub = await set(`
        INSERT INTO EMERGENZA_TEAM_SUB (emergenza_team_no, gubun, value) VALUES ${arrValues.toString()}
      `);
    }
    return resTeam;
  }
  // 참가 신청서 수정
  async modifyEmergenza(
    emergenzaTeamNo,
    teamName,
    memberCount,
    genre,
    genre_etc,
    phone1,
    phone2,
    introduce,
    releaseCount,
    career,
    averageAge,
    instrumentList,
    memberEmailList
  ) {
    // 팀 수정
    const resTeam = await modify(`
      UPDATE EMERGENZA_TEAM SET team_name = ${escapeQuotAllowNull(
        teamName
      )}, member_count = ${
      memberCount ? escapeQuotAllowNull(memberCount) : 1
    }, genre = ${escapeQuotAllowNull(genre)}, genre_etc = ${escapeQuotAllowNull(
      genre_etc
    )},
        phone1 = ${escapeQuotAllowNull(phone1)}, phone2 = ${escapeQuotAllowNull(
      phone2
    )}, introduce = ${escapeQuotAllowNull(introduce)}, release_count = ${
      releaseCount ? escapeQuotAllowNull(releaseCount) : 1
    },
        career = ${career ? escapeQuotAllowNull(career) : 1}, average_age = ${
      averageAge ? escapeQuotAllowNull(averageAge) : null
    } WHERE emergenza_team_no = ${emergenzaTeamNo} 
    `);
    // 악기 / 이메일 수정
    // 악기 / 이메일 삭제 -> 추가
    //삭제
    const resRemove = await remove(`
      DELETE FROM EMERGENZA_TEAM_SUB WHERE emergenza_team_no = ${emergenzaTeamNo}
    `);
    //추가
    const arrValues = [];
    for (let i = 0; i < instrumentList.length; i++) {
      if (instrumentList[i].length > 0) {
        arrValues.push(
          `(${emergenzaTeamNo}, 'instrument', ${escapeQuotAllowNull(
            instrumentList[i]
          )})`
        );
      }
    }
    for (let i = 0; i < memberEmailList.length; i++) {
      if (memberEmailList[i].length > 0) {
        arrValues.push(
          `(${emergenzaTeamNo}, 'email', ${escapeQuotAllowNull(
            memberEmailList[i]
          )})`
        );
      }
    }
    if (arrValues.length > 0) {
      const resTeamSub = await set(`
        INSERT INTO EMERGENZA_TEAM_SUB (emergenza_team_no, gubun, value) VALUES ${arrValues.toString()}
      `);
    }
    console.log("resTeam", resTeam);
    return resTeam;
  }
  // 참가 신청서 조회
  async getEmergenza(userNo) {
    const res = await getAll(`
      SELECT EMERGENZA_TEAM.emergenza_team_no, EMERGENZA_TEAM.user_no, EMERGENZA_TEAM.team_name, EMERGENZA_TEAM.member_count, EMERGENZA_TEAM.genre, EMERGENZA_TEAM.genre_etc, EMERGENZA_TEAM.phone1, EMERGENZA_TEAM.phone2, EMERGENZA_TEAM.introduce, EMERGENZA_TEAM.release_count, EMERGENZA_TEAM.career, EMERGENZA_TEAM.average_age, 
      EMERGENZA_TEAM_SUB.emergenza_team_sub_no, EMERGENZA_TEAM_SUB.gubun, EMERGENZA_TEAM_SUB.value
      FROM EMERGENZA_TEAM
        LEFT OUTER JOIN EMERGENZA_TEAM_SUB ON EMERGENZA_TEAM_SUB.emergenza_team_no = EMERGENZA_TEAM.emergenza_team_no
      WHERE EMERGENZA_TEAM.user_no = ${userNo} 
    `);
    if (res.length === 0) {
      return {};
    } else {
      const result = {
        emergenza_team_no: res[0].emergenza_team_no,
        user_no: res[0].user_no,
        team_name: res[0].team_name,
        member_count: res[0].member_count,
        genre: res[0].genre,
        genre_etc: res[0].genre_etc,
        phone1: res[0].phone1,
        phone2: res[0].phone2,
        introduce: res[0].introduce,
        release_count: res[0].release_count,
        career: res[0].career,
        average_age: res[0].average_age,
        instrumentList: [],
        memberEmailList: []
      };
      for (let i = 0; i < res.length; i++) {
        if (res[i].gubun === "instrument") {
          result.instrumentList.push(res[i].value);
        } else if (res[i].gubun === "email") {
          result.memberEmailList.push(res[i].value);
        }
      }
      return result;
    }
  }
}

module.exports = EmergenzaQuery;
