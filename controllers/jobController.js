const Job = require("../models/job");

exports.getIndex = (req, res, next) => {
  const jobs = [
    {
      title: "Software Engineer",
      company: "Tech Corp",
      description: "We are looking for a Software Engineer to join our team.",
      status: "applied",
    },
  ];

  res.render("index", { jobs: jobs });
};
