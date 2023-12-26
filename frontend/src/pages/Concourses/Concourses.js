import React from "react";
import ConcourseCard from "../../components/components/Concourses/ConcourseCard";
import "./Concourses.css";

const competitionData = [
  {
    name: "React Challenge",
    logo: "path/to/react-logo.png",
    description: "A competition to showcase React skills.",
    startDate: "2023-12-01",
    endDate: "2023-12-15",
    awardRating: "5 stars",
    requirements: "React expertise",
  },
  {
    name: "CSS Styling Contest",
    logo: "path/to/css-logo.png",
    description: "Show off your CSS styling creativity.",
    startDate: "2023-11-25",
    endDate: "2023-12-10",
    awardRating: "4 stars",
    requirements: "CSS skills",
  },
  {
    name: "JavaScript Hackathon",
    logo: "path/to/js-logo.png",
    description: "An intense coding competition focused on JavaScript.",
    startDate: "2023-12-05",
    endDate: "2023-12-20",
    awardRating: "4.5 stars",
    requirements: "JavaScript proficiency",
  },
  {
    name: "Full Stack Challenge",
    logo: "path/to/fullstack-logo.png",
    description: "Demonstrate your full-stack development skills.",
    startDate: "2023-11-30",
    endDate: "2023-12-15",
    awardRating: "4 stars",
    requirements: "Full-stack expertise",
  },
  {
    name: "UI/UX Design Marathon",
    logo: "path/to/uiux-logo.png",
    description: "Create stunning user interfaces and experiences.",
    startDate: "2023-12-10",
    endDate: "2023-12-25",
    awardRating: "5 stars",
    requirements: "UI/UX design skills",
  },
  {
    name: "Data Science Challenge",
    logo: "path/to/datascience-logo.png",
    description: "Solve complex problems using data science techniques.",
    startDate: "2023-12-08",
    endDate: "2023-12-23",
    awardRating: "4.5 stars",
    requirements: "Data science knowledge",
  },
  {
    name: "Mobile App Development Sprint",
    logo: "path/to/mobile-logo.png",
    description: "Build innovative mobile applications in a short time.",
    startDate: "2023-12-15",
    endDate: "2023-12-30",
    awardRating: "4 stars",
    requirements: "Mobile app development skills",
  },
  {
    name: "Backend Coding Challenge",
    logo: "path/to/backend-logo.png",
    description: "Test your server-side development skills.",
    startDate: "2023-12-03",
    endDate: "2023-12-18",
    awardRating: "3.5 stars",
    requirements: "Backend development expertise",
  },
  {
    name: "AI and Machine Learning Competition",
    logo: "path/to/ai-logo.png",
    description: "Explore the world of AI and machine learning.",
    startDate: "2023-12-12",
    endDate: "2023-12-27",
    awardRating: "4.5 stars",
    requirements: "AI and ML knowledge",
  },
  {
    name: "Cybersecurity Capture The Flag",
    logo: "path/to/cybersecurity-logo.png",
    description: "Test your cybersecurity skills in a simulated environment.",
    startDate: "2023-12-18",
    endDate: "2024-01-02",
    awardRating: "4 stars",
    requirements: "Cybersecurity knowledge",
  },
  {
    name: "Game Development Jam",
    logo: "path/to/game-dev-logo.png",
    description: "Create a game from scratch within a limited time.",
    startDate: "2023-12-22",
    endDate: "2024-01-06",
    awardRating: "4.5 stars",
    requirements: "Game development skills",
  },
  {
    name: "Blockchain Innovation Challenge",
    logo: "path/to/blockchain-logo.png",
    description: "Build innovative solutions using blockchain technology.",
    startDate: "2023-12-28",
    endDate: "2024-01-12",
    awardRating: "4 stars",
    requirements: "Blockchain knowledge",
  },
];

function Concourses() {
  return (
    <div className="grid-container">
      {competitionData.map((competition, index) => (
        <ConcourseCard key={index} {...competition} />
      ))}
    </div>
  );
}

export default Concourses;
