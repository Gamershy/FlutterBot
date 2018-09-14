function allForUser(userId, {
  active = true,
  grabAll = false,
  lean = false,
  limit = 0,
  sort = {}
} = {}) {
  return new Promise((resolve, reject) => {
    let warnFind;
    let warnFindCount;

    function userFindOneCallback(err, user) {
      if (err) return reject(err);

      if (!user) {
        return resolve(0, []);
      }

      let find = {user:user._id};

      if (!grabAll) find.active = active;

      warnFind = db.model("Warn")
        .find(find, "issuer reason date")
        .sort(sort)
        .limit(limit)
        .lean(lean);

      db.model("Warn")
        .countDocuments(find)
        .exec(warnFindCountCallback);
    }

    function warnFindCountCallback(err, count) {
      if (err) return reject(err);

      warnFindCount = count;
      warnFind.exec(warnFindCallback);
    }

    function warnFindCallback(err, warnings) {
      if (err) reject(err); else resolve({count:warnFindCount, warnings});
    }

    db.model("User").findOne({userId}, "_id", userFindOneCallback);
  });
}

module.exports = allForUser;
