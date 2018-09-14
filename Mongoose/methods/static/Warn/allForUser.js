function allForUser(userId, {
  active = true,
  grabAll = false,
  limit = 0,
  sort = {}
} = {}) {
  return new Promise((resolve, reject) => {
    function userFindOneCallback(err, user) {
      if (err) return reject(err);

      if (!user) {
        return resolve(0, []);
      }

      let find = {user:user._id};

      if (!grabAll) find.active = active;

      db.model("Warn")
        .find(find, "issuer reason date")
        .sort(sort)
        .limit(limit)
        .exec(warnFindCallback);
    }

    function warnFindCallback(err, warnings) {
      if (err) return reject(err); else return resolve({count:warnings.length, warnings});
    }

    db.model("User").findOne({userId}, "_id", userFindOneCallback);
  });
}

module.exports = allForUser;
