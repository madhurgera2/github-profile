import React from "react";
import Card from "./Card";

const DUMMY_REPOS = [
  {
    id: 1,
    name: "react",
    description: "A JavaScript library for building user interfaces",
    language: "JavaScript",
    stars: 190000,
    forks: 39000,
  },
  {
    id: 2,
    name: "vue",
    description: "The Progressive JavaScript Framework",
    language: "JavaScript",
    stars: 200000,
    forks: 32000,
  },
  {
    id: 3,
    name: "angular",
    description: "One framework. Mobile & desktop.",
    language: "TypeScript",
    stars: 75000,
    forks: 20000,
  },
  {
    id: 4,
    name: "django",
    description: "The Web framework for perfectionists with deadlines.",
    language: "Python",
    stars: 65000,
    forks: 27000,
  },
  {
    id: 5,
    name: "flask",
    description: "A micro web framework written in Python.",
    language: "Python",
    stars: 58000,
    forks: 15000,
  },
];
const Repositories = () => {
  return (
    <div className="py-2 text-left">
      <p className="folt-bold my-2">Popular Repositories</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {DUMMY_REPOS.map((repo) => (
          <Card key={repo.id} {...repo} />
        ))}
      </div>
    </div>
  );
};

export default Repositories;
