function removeWarnings() {
  // You will not believe how much time it took me to write this —Zuris @ 00:54 A.M.
  const aggregation = [{$match: {userId: this.userId}},
    {$lookup: {from: 'warnings', localField: '_id', foreignField: 'user', as: 'warnings'}},
    {$unwind: {path: "$warnings"}},
    {$match: {"warnings.active": true}},
    {$group: {_id: "$userId", warnings: {$push: "$warnings"}}}];

  return new Promise((resolve, reject) => {
    db.model("User")
      .aggregate(aggregation)
      .then(result => {
        let deactivate = Fawn.Task();
        result = result[0];

        for (let warning of result.warnings) {
          deactivate.update(db.model("Warn"), {_id:warning._id}, {$set: {active: false}});
        }

        return deactivate;
      })
      .then(task => task.run({useMongoose: true}))
      .then(resolve)
      .catch(reject);
  });
}

module.exports = removeWarnings;
