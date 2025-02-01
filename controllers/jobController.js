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
  res.render("index", { jobs: jobs, activePage: "home", user: req.user });
};

exports.getCreateJob = (req, res, next) => {
  res.render("addJob", { activePage: "addJob", user: req.user });
};
exports.postCreateJob = (req, res, next) => {
  const title = req.title;
  const company = req.compnay;
  const location = req.location;
  const description = req.description;
  const status = req.status;
  const postedDate = req.postedDate || new Date();
  const jobType = req.jobType;
  const salary = req.salary;

  const job = new Job({
    title: title,
    company: company,
    location: location,
    description: description,
    status: status,
    postedDate: postedDate,
    jobType: jobType,
    salary: salary,
    userId: req.user._id,
  });
  job
    .save()
    .then((result) => {
      console.log("created the job");
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

const getProgress = (status) => {
  switch (status) {
    case "applied":
      return 20;
    case "interview":
      return 50;
    case "offer":
      return 80;
    case "accepted":
      return 100;
    case "rejected":
      return 0;
    default:
      return 0;
  }
};

exports.getDashboard = (req, res, next) => {
  const userId = req.user._id;

  // Fetch the user's jobs
  Job.find({ userId: userId })
    .then((jobs) => {
      // Calculate job summary
      const jobSummary = {
        applied: jobs.filter((job) => job.status === "applied").length,
        interview: jobs.filter((job) => job.status === "interview").length,
        offer: jobs.filter((job) => job.status === "offer").length,
        rejected: jobs.filter((job) => job.status === "rejected").length,
      };

      // Get upcoming deadlines (jobs with deadlines in the future)
      const deadlines = jobs
        .filter(
          (job) =>
            job.applicationDeadline && job.applicationDeadline > new Date()
        )
        .map((job) => ({
          title: job.title,
          company: job.company,
          deadline: job.applicationDeadline,
        }));

      // Mock recent activity (you can replace this with actual activity tracking logic)
      const activity = [
        {
          action: "Applied",
          details: "Software Engineer at Tech Corp",
          date: new Date(),
        },
        {
          action: "Interview Scheduled",
          details: "Software Engineer at Tech Corp",
          date: new Date(),
        },
      ];

      // Add progress to each job
      const jobsWithProgress = jobs.map((job) => ({
        ...job.toObject(),
        progress: getProgress(job.status), // Calculate progress here
      }));

      // Render the dashboard with the fetched data
      res.render("dashboard", {
        user: req.user,
        jobSummary: jobSummary,
        jobs: jobsWithProgress, // Pass jobs with progress
        deadlines: deadlines,
        activity: activity,
        activePage: "dashboard",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Internal Server Error");
    });
};
