import React from "react";
import { ReactComponent as GitHubLogo } from "../../assets/github.svg";


const Header = () => {
  return (
    <header className="bg-secondary py-2 border-b border-default shadow-small">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4">
          <GitHubLogo className="w-8 h-8 text-primary" alt="GitHub Logo" />
          <h1 className="text-xl font-semibold text-primary hidden sm:block">
            GitHub UI
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
