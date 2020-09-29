const mongoose = require("mongoose");
const moment = require("moment");
const createHttpError = require("http-errors");

const { escapeQuot } = require("shared/functions");
const { getAll } = require("shared/Query");

const RankLogSchema = new mongoose.Schema(
  {
    rank_log_no: Number,
    ranking: Number,
    user_no: Number,
    gubun: String,
    sum_like: Number,
    sum_view: Number,
    sum_push: Number,
    point: Number,
    category_level1_no: Number,
    category_level2_no: Number,
    category_level3_no: Number,
    category_level4_no: Number,
    date: Date,
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    strict: false,
  }
);

/**
 * mysql 테이블과 동기화 시킨다.
 * 기존에 mongodb에 저장된 데이터들은 모두 날려버린다.
 * 꼭, 백업 후 사용!
 */
RankLogSchema.statics.initData = async function ({ persist }) {
  if (!persist) {
    throw createHttpError(
      400,
      "기존에 mongodb에 저장된 데이터들은 모두 날려버리고 mysql 테이블의 값들과 동기화 시킨다. 꼭 백업 후 사용하세요."
    );
  }
  const rankLogs = await getAll(`
        SELECT *
        FROM RANK_LOG
    `);
  // console.log(activeLogs);
  await this.deleteMany({});
  await this.create(rankLogs);
};

/*
 * mysql 테이블과 동기화 시킨다.
 * mongodb에서 가장 마지막 값을 기준으로 이후에 생성된 mysql 데이터들은 가져온다.
 */
RankLogSchema.statics.addDataByDB = async function () {
  const lastData = await this.findOne({}, {}, { sort: { created_at: -1 } });

  const rankLogs = await getAll(`
        SELECT *
        FROM RANK_LOG
        WHERE created_at > ${escapeQuot(
          moment(lastData.created_at).format("YYYY-MM-DD HH:mm:ss")
        )}
    `);

  await this.create(rankLogs);
};

// mysql에서 조회한 리스트를 넣는다.
RankLogSchema.statics.createRankList = async function ({ rankList }) {
  return await this.create(rankList);
};

module.exports = mongoose.model("RankLog", RankLogSchema);
