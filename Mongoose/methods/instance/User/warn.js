function warn(issuer, reason) {
  return new Promise((resolve, reject) => {
    let user = this;

    function userFindOneCallback(err, issuer) {
      if (err) {
        return reject(err);
      }

      db.model("Warn").create({
        user: user._id,
        issuer: issuer._id,
        reason
      }, warnCreateCallback);
    }

    function warnCreateCallback(err, warning) {
      if (err) {
        return reject(err);
      }

      resolve(warning);
    }

    db.model("User").findOne({userId: issuer.id || issuer}, "_id", userFindOneCallback);
  });
}

module.exports = warn;
