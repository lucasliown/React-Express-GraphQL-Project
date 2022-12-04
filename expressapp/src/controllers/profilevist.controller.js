const db = require("../database");

// add visit count in the database.
exports.addVisitCount = async (req, res) => {
  const dateNow = new Date();
  const day = dateNow.getDate();
  const month = dateNow.getMonth()+1;
  const year = dateNow.getFullYear();
  const date = `${day}/${month}/${year}`;
  const allvisitCountData = await db.profilevisit.findAll({
    include: {
      model: db.user,
    },
    where: { user_id: req.params.user_id },
    order: [["visitDate", "DESC"]],
  });
  if (allvisitCountData.length === 0) {
    await db.profilevisit.create({
      user_id: req.params.user_id,
      visitcount: 1,
    });
    res.json(true);
  } else {
    const dayPervious = allvisitCountData[0].visitDate.getDate();
    const monthPervious = allvisitCountData[0].visitDate.getMonth()+1;
    const yearPervious = allvisitCountData[0].visitDate.getFullYear();
    const dataPervious = `${dayPervious}/${monthPervious}/${yearPervious}`;
    if (dataPervious === date) {
      const increaseCount = allvisitCountData[0].visitcount + 1;
      await db.profilevisit.update(
        { visitcount: increaseCount },
        {
          where: {
            visit_id: allvisitCountData[0].visit_id,
          },
        }
      );
      res.json(true);
    } else {
      await db.profilevisit.create({
        user_id: req.params.user_id,
        visitcount: 1,
      });
      res.json(true);
    }
  }
};
