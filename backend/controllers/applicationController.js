const UserCompetition = require("../models/UserCompetitionModel");

// Apply to a competition
exports.applyToCompetition = async (req, res) => {
  const { userId, competitionId } = req.body;

  try {
    const existingApplication = await UserCompetition.findOne({
      where: { userId, competitionId },
    });

    if (existingApplication) {
      return res
        .status(400)
        .json({ message: "User already applied to this competition" });
    }
    const application = await UserCompetition.create({
      userId,
      competitionId,
      grade: req.body.grade,
    });

    res
      .status(201)
      .json({ message: "Application created successfully", application });
  } catch (error) {
    console.error("Error applying to competition:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getApplicationsForCompetition = async (req, res) => {
  const { competitionId } = req.params;

  try {
    const applications = await UserCompetition.findAll({
      where: { competitionId },
    });

    res.status(200).json({ applications });
  } catch (error) {
    console.error("Error fetching applications for competition:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all competitions applied by a user
exports.getCompetitionsForUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const applications = await UserCompetition.findAll({
      where: { userId },
    });

    res.status(200).json({ applications });
  } catch (error) {
    console.error("Error fetching competitions for user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.removeApplication = async (req, res) => {
  const { userId, competitionId } = req.params;

  try {
    const existingApplication = await UserCompetition.findOne({
      where: { userId, competitionId },
    });

    if (!existingApplication) {
      return res
        .status(404)
        .json({ message: "User has not applied to this competition" });
    }

    await existingApplication.destroy();

    res.status(200).json({ message: "Application removed successfully" });
  } catch (error) {
    console.error("Error removing application:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
