const Sequelize = require("sequelize");
const { sequelize } = require("config/sequelize.config.js");

const { escapeQuot } = require("shared/functions");
const { getVideoDurationInSeconds } = require("get-video-duration");

module.exports = (function () {
  // 비디오 아이디로 정보 조회
  async function selectVideoById(videoNo) {
    const res = await sequelize.query(
      `
      SELECT VIDEO.\`video_no\`, VIDEO.\`category_level1_no\`, VIDEO.\`category_level2_no\`, VIDEO.\`category_level3_no\`, VIDEO.\`status_no\`, VIDEO.\`flag\`, VIDEO.\`title\`, VIDEO.\`description\`, VIDEO.\`count_like\`, VIDEO.\`count_view\`,  VIDEO.\`type\`,  VIDEO.\`url_original\`,  VIDEO.\`url_480p\`,  VIDEO.\`url_720p\`,  VIDEO.\`url_1080p\`, VIDEO.\`duration\`,  VIDEO.\`thumbnail\`,  VIDEO.\`job_id\`,  VIDEO.\`created_at\`,
      \`STATUS\`.\`status_no\` AS \`STATUS.status_no\`, \`STATUS\`.\`status_description\` AS \`STATUS.status_description\`
      FROM VIDEO
        LEFT OUTER JOIN STATUS ON STATUS.status_no = VIDEO.status_no
      WHERE VIDEO.\`video_no\` = ${videoNo}
    `,
      {
        nest: true,
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    return res;
  }

  async function selectVideoOriginByJobId(jobId) {
    const res = await sequelize.query(
      `
      SELECT video_no, url_original
      FROM VIDEO
      WHERE job_id = ${escapeQuot(jobId)}
    `,
      {
        nest: true,
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    return res[0];
  }

  // 비디오 생성
  async function createVideo({
    description,
    title,
    category_level4_no,
    category_level3_no,
    category_level2_no,
    category_level1_no,
    userNo,
  }) {
    console.log(
      "비디오생성",
      description,
      title,
      category_level4_no,
      category_level3_no,
      category_level2_no,
      category_level1_no,
      userNo
    );
    try {
      const data = await sequelize.query(
        `
        INSERT INTO VIDEO(category_level1_no, category_level2_no, category_level3_no, category_level4_no, user_no, title, description, status_no, flag)
          VALUES (${category_level1_no ? escapeQuot(category_level1_no) : 3}, 
          ${category_level2_no ? escapeQuot(category_level2_no) : 6}, 
          ${category_level3_no ? escapeQuot(category_level3_no) : 2},        ${
          category_level4_no ? escapeQuot(category_level4_no) : 1
        }, ${escapeQuot(userNo)}, 
          ${escapeQuot(title)}, 
          ${escapeQuot(description)}, ${1}, ${1})
      `,
        {
          type: Sequelize.QueryTypes.INSERT,
        }
      );
      return data[0];
    } catch (error) {
      console.log("dddddddddddddddddddddddddddd", error);
    }
  }

  // 비디오 업로드 정보 입력
  async function uploadVideo({ location, videoNo }) {
    return await sequelize.query(
      `UPDATE VIDEO
      SET url_original = ${escapeQuot(location)}
      WHERE video_no = ${escapeQuot(videoNo)}`,
      {
        type: Sequelize.QueryTypes.UPDATE,
      }
    );
  }

  // 비디오 상태 변경
  async function updateStatusVideoById({ videoNo, status }) {
    return await sequelize.query(
      `UPDATE VIDEO
      SET status_no = ${escapeQuot(status)}
      WHERE video_no = ${escapeQuot(videoNo)}`,
      {
        type: Sequelize.QueryTypes.UPDATE,
      }
    );
  }

  // 비디오 상태 변경
  async function updateStatusAndFlagVideoByJobId({ jobId, flag, status }) {
    return await sequelize.query(
      `UPDATE VIDEO
        SET status_no = ${escapeQuot(status)}, flag = ${flag}
        WHERE job_id = ${escapeQuot(jobId)}`,
      {
        type: Sequelize.QueryTypes.UPDATE,
      }
    );
  }

  // JOD 아이디로 상태 변경
  async function updateStatusVideoByJobId({ jobId, status }) {
    return await sequelize.query(
      `UPDATE VIDEO
      SET status_no = ${escapeQuot(status)}
      WHERE job_id = ${escapeQuot(jobId)}`,
      {
        type: Sequelize.QueryTypes.UPDATE,
      }
    );
  }

  // 비디오 transcoder job_id 추가
  async function addTranscoder({ videoNo, jobId, files, location }) {
    const duration = await getVideoDurationInSeconds(location);

    const thumbnailCondition = files.thumbnails.map(
      (thumbnail) => `(${escapeQuot(videoNo)}, ${escapeQuot(thumbnail)})`
    );
    await sequelize.query(
      `
      INSERT INTO THUMBNAIL(video_no, thumbnail_url)
      VALUES ${thumbnailCondition}
    `,
      {
        type: Sequelize.QueryTypes.INSERT,
      }
    );

    return await sequelize.query(
      `UPDATE VIDEO
      SET status_no = 4, job_id = ${escapeQuot(jobId)}, duration = ${escapeQuot(
        duration
      )},
        url_1080p = ${escapeQuot(files.url1080p)}, 
        url_720p = ${escapeQuot(files.url720p)}, 
        url_480p = ${escapeQuot(files.url480p)},
        thumbnail = ${escapeQuot(files.thumbnails[4])}
      WHERE video_no = ${escapeQuot(videoNo)}`,
      {
        type: Sequelize.QueryTypes.UPDATE,
      }
    );
  }

  return {
    selectVideoById,
    selectVideoOriginByJobId,
    createVideo,
    uploadVideo,
    updateStatusVideoById,
    updateStatusVideoByJobId,
    updateStatusAndFlagVideoByJobId,
    addTranscoder,
  };
})();
