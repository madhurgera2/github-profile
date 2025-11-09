import TabItem from "../TabItem";

import { ReactComponent as OverviewIcon } from "../../assets/overview.svg";
import { ReactComponent as RepoIcon } from "../../assets/repo.svg";
import { ReactComponent as ProjectsIcon } from "../../assets/projects.svg";
import { ReactComponent as PackagesIcon } from "../../assets/packages.svg";
import { ReactComponent as StarIcon } from "../../assets/star.svg";

const ProfileHeader = () => {
  const activeTab = "Overview";
  const userStats = {
    public_repos: 42,
    projects: 5,
    packages: 2,
    starred: 10,
  };

  const navigationItems = [
    {
      id: "overview",
      name: "Overview",
      icon: OverviewIcon,
      count: null,
    },
    {
      id: "repositories",
      name: "Repositories",
      icon: RepoIcon,
      count: userStats.public_repos || 25,
    },
    {
      id: "projects",
      name: "Projects",
      icon: ProjectsIcon,
      count: userStats.projects || null,
    },
    {
      id: "packages",
      name: "Packages",
      icon: PackagesIcon,
      count: userStats.packages || null,
    },
    {
      id: "stars",
      name: "Stars",
      icon: StarIcon,
      count: userStats.starred || 3,
    },
  ];

  return (
    <div className="bg-primary border-b border-default">
      <div className="mx-auto w-full max-md:overflow-x-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-center space-x-1 overflow-x-auto">
          {navigationItems.map((item) => (
            <TabItem
              key={item.id}
              icon={item.icon}
              name={item.name}
              count={item.count}
              isActive={activeTab === item.name}
              onClick={() => {}}
            />
          ))}
        </nav>
      </div>
    </div>
  );
};

export default ProfileHeader;
