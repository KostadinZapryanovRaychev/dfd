const UserCompetition = require("../../database/models/UserCompetitionModel");
const Competition = require("../../database/models/CompetitionModel");
const User = require("../../database/models/UserModel");
const competitionStatus = require("../../../../constants/constants");
const errorMessages = require("../../../../constants/errors");

const applyToCompetition = async (userId, competitionId, grade, solutionUrl) => {
  try {
    const user = await User.findByPk(userId);

    if (user.isBlocked) {
      throw new Error("User can't apply because it is blocked");
    }

    const existingApplication = await UserCompetition.findOne({
      where: { userId, competitionId },
    });
    if (existingApplication) {
      throw new Error("User already applied to this competition");
    }

    const application = await UserCompetition.create({
      userId,
      competitionId,
      grade,
      solutionUrl: solutionUrl || null,
      appliedAt: new Date(),
    });

    return application;
  } catch (error) {
    console.log("Error creating application:", error);
    throw new Error(errorMessages.unsuccessfull);
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
      console.log("UnAuthorized access");
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
    console.log("Error fetching applications for competition:", error);
    throw new Error(errorMessages.unsuccessfull);
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
    console.log("Error fetching competitions for user:", error);
    throw new Error(errorMessages.unsuccessfull);
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
    throw new Error(errorMessages.unsuccessfull);
  }
};

const getAllApplications = async () => {
  try {
    const applications = await UserCompetition.findAll();
    return applications;
  } catch (error) {
    console.log("Error fetching competitions for user:", error);
    throw new Error(errorMessages.unsuccessfull);
  }
};

const findApplication = async (userId, competitionId) => {
  try {
    return await UserCompetition.findOne({
      where: { userId, competitionId },
    });
  } catch (error) {
    console.log("Error in service for finding application", error);
    throw new Error(errorMessages.unsuccessfull);
  }
};

const updateApplicationGrade = async (application, grade) => {
  try {
    application.grade = grade;
    await application.save();
    return application;
  } catch (error) {
    console.log("Error during updating application grade", error);
    throw new Error(errorMessages.unsuccessfull);
  }
};

const updateApplicationGradeById = async (applicationId, grade) => {
  try {
    const application = await UserCompetition.findByPk(applicationId);
    application.grade = grade;
    await application.save();
    return application;
  } catch (error) {
    console.log("Error during updating application grade by id", error);
    throw new Error(errorMessages.unsuccessfull);
  }
};

const getApplicationById = async (applicationId) => {
  try {
    const application = await UserCompetition.findByPk(applicationId);
    return application;
  } catch (error) {
    console.log("Error gettin application by ID", error);
    throw new Error(errorMessages.unsuccessfull);
  }
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
