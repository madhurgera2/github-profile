import React from "react";

const Card = ({ name, description, language, stars, forks }) => {
  return (
    <div className="card text-left">
      <div className="card-header">
        <h4 className="font-medium text-primary">{name}</h4>
      </div>
      <div className="card-body">
        <p className="text-secondary text-sm mb-2">
          {description}
        </p>
        <div className="flex items-center space-x-4 text-sm text-muted">
          <span>{language}</span>
          <span>⭐ {stars}</span>
          <span>🍴 {forks}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
