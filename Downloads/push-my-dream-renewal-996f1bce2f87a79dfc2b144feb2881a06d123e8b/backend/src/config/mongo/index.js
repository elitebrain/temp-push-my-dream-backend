const mongoose = require("mongoose");

const ActiveLog = require("./Model/ActiveLog");
const CheckplusLog = require("./Model/CheckplusLog");
const FlagLog = require("./Model/FlagLog");
const PgLog = require("./Model/PgLog");
const PointLog = require("./Model/PointLog");
const PushLog = require("./Model/PushLog");
const RankLog = require("./Model/RankLog");

module.exports = (function () {
  let db = mongoose.connection;
  let errorCount = 0;

  const { MONGO_URI } = process.env;

  function connect() {
    if (errorCount < 3) {
      mongoose.connect(MONGO_URI, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      db.once("open", function () {
        console.log(`mongodb connected : ${MONGO_URI}`);
      });

      db.once("error", () => {
        ++errorCount;
        console.log(`${errorCount} mongodb connect error : ${MONGO_URI}`);
        setTimeout(() => {
          this.connect();
        }, 1000);
      });
    }
  }

  return {
    connection: db,
    connect,
    models: {
      ActiveLog,
      CheckplusLog,
      FlagLog,
      PgLog,
      PointLog,
      PushLog,
      RankLog,
    },
  };
})();
