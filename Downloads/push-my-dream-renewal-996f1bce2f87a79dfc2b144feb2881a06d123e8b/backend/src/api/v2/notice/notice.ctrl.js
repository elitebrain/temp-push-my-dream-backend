const os = require("os");
const { Container } = require("typedi");

const NoticeQuery = require("queries/NoticeQuery");

const noticeQuery = Container.get(NoticeQuery);

// 게시글 조회
exports.getNotice = async (req, res, next) => {
  try {
    const { offset = 0, limit = 3, type } = req.query;
    const noticeList = await noticeQuery.getNotice(type, offset, limit);
    const serverIp = getServerIp();
    console.log("getServerIp", serverIp);
    res.status(200).send(noticeList);
  } catch (error) {
    next(error);
  }
};

function getServerIp() {
  var ifaces = os.networkInterfaces();
  var result = "";
  for (var dev in ifaces) {
    var alias = 0;
    ifaces[dev].forEach(function (details) {
      if (details.family == "IPv4" && details.internal === false) {
        result = details.mac;
        ++alias;
      }
    });
  }

  return result;
}
