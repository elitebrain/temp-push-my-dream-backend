const { getAll, getOne, set, modify, remove } = require("shared/Query");
const { escapeQuot } = require("shared/functions");

class VideoCacheQuery {
  async deleteBeforePublicPeroid({ publicPeriod }, config) {
    return remove(
      `
        DELETE VC FROM VIDEO_CACHE AS VC INNER JOIN VIDEO ON VIDEO.video_no = VC.video_no
        WHERE VIDEO.created_at < ${escapeQuot(publicPeriod)}
      `,
      config
    );
  }
}

module.exports = VideoCacheQuery;
