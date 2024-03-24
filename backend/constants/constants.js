const competitionStatus = {
  active: "active",
  pending: "pending",
  closed: "closed",
  published: "published",
};

const transactionStatus = {
  pending: "PENDING",
  canceled: "CANCELED",
  completed: "COMPLETED",
  failed: "FAILED",
};

const subscriptionLevel = {
  gold: "Gold",
  silver: "Silver",
  bronze: "Bronze",
};

module.exports = {
  transactionStatus,
  competitionStatus,
  subscriptionLevel,
};
