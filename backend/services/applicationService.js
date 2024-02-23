const UserCompetition = require("../models/UserCompetitionModel");
const Competition = require("../models/CompetitionModel");
const User = require("../models/UserModel");
const competitionStatus = require("../constants/constants");

const applyToCompetition = async (userId, competitionId, grade, file, req, res) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error("No user found");
    }

    if (user.isBlocked) {
      throw new Error("User can't apply because it is blocked");
    }

    const existingApplication = await UserCompetition.findOne({ where: { userId, competitionId } });
    if (existingApplication) {
      throw new Error("User already applied to this competition");
    }

    const application = await UserCompetition.create({
      userId,
      competitionId,
      grade,
      solutionUrl: file ? `/solutions/${file.filename}` : null,
      appliedAt: new Date(),
    });

    return application;
  } catch (error) {
    console.error("Error creating application:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

const getApplicationsForCompetition = async (competitionId, userId, isAdmin, userLevel) => {
  try {
    const applications = await UserCompetition.findAll({
      where: { competitionId },
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName"],
        },
        {
          model: Competition,
          attributes: ["id", "name", "status"],
        },
      ],
    });

    if (!applications.length) {
      return { applications: [] };
    }

    if (!isAdmin || userLevel < 1) {
      return { applications: [] };
    }

    const formattedApplications = applications.map((application) => ({
      id: application.id,
      grade: application.grade,
      user: {
        id: application.User.id,
        firstName: userLevel > 1 || isAdmin ? application.User.firstName : "",
        lastName: userLevel > 1 || isAdmin ? application.User.lastName : "",
      },
      competition: {
        id: application.Competition.id,
        name: application.Competition.name,
        status: application.Competition.status,
      },
      solutionUrl: userLevel || isAdmin > 0 ? application.solutionUrl : "",
      appliedAt: isAdmin ? application.appliedAt : "",
    }));

    return formattedApplications;
  } catch (error) {
    console.error("Error fetching applications for competition:", error);
    throw new Error("Internal server error", error);
  }
};

const getCompetitionsForUser = async (userId, isPublished) => {
  if (typeof isPublished === "string" && isPublished === "false") {
    isPublished = false;
  } else if (typeof isPublished === "string" && isPublished === "true") {
    isPublished = true;
  } else {
    isPublished = null;
  }

  try {
    const applications = await UserCompetition.findAll({
      where: { userId },
      include: [
        {
          model: Competition,
          attributes: ["name", "status"],
          required: true,
        },
      ],
    });

    let formattedApplications;
    if (isPublished) {
      formattedApplications = applications
        .map((application) => ({
          id: application.id,
          grade: application.grade,
          userId: application.userId,
          competitionId: application.competitionId,
          competitionName: application.Competition.name,
          status: application.Competition.status,
          appliedAt: application.appliedAt,
        }))
        .filter((application) => application.status === competitionStatus.published);
    } else {
      formattedApplications = applications.map((application) => ({
        id: application.id,
        grade: application.grade,
        userId: application.userId,
        competitionId: application.competitionId,
        competitionName: application.Competition.name,
        status: application.Competition.status,
        appliedAt: application.appliedAt,
      }));
    }

    return formattedApplications;
  } catch (error) {
    console.error("Error fetching competitions for user:", error);
    throw new Error("Internal server error", error);
  }
};

const removeApplication = async (userId, competitionId) => {
  try {
    const existingApplication = await UserCompetition.findOne({
      where: { userId, competitionId },
    });

    if (existingApplication) {
      await existingApplication.destroy();
    }
  } catch (error) {
    console.error("Error removing application:", error);
  }
};

const getAllApplications = async () => {
  try {
    const applications = await UserCompetition.findAll();
    return applications;
  } catch (error) {
    console.error("Error fetching competitions for user:", error);
    throw new Error("Internal server error");
  }
};

const findApplication = async (userId, competitionId) => {
  if (!userId) {
    throw new Error("No Id of the User");
  }

  if (!competitionId) {
    throw new Error("No competitionId of the Competition");
  }
  return await UserCompetition.findOne({
    where: { userId, competitionId },
  });
};

const updateApplicationGrade = async (application, grade) => {
  application.grade = grade;
  await application.save();
  return application;
};

const updateApplicationGradeById = async (applicationId, grade) => {
  const application = await UserCompetition.findByPk(applicationId);

  if (!application) {
    throw new Error("No application found");
  }

  application.grade = grade;
  await application.save();
  return application;
};

const getApplicationById = async (applicationId) => {
  if (!applicationId) {
    throw new Error("No ApplicationId provided");
  }
  const application = await UserCompetition.findByPk(applicationId);
  if (!application) {
    throw new Error("Application not found");
  }
  return application;
};

module.exports = {
  applyToCompetition,
  getApplicationsForCompetition,
  getCompetitionsForUser,
  removeApplication,
  getAllApplications,
  findApplication,
  updateApplicationGrade,
  updateApplicationGradeById,
  getApplicationById,
};
