import React, { useState, useEffect, useCallback } from "react";
import GitHubAPI from "../../api/github";
import { ReactComponent as LocationIcon } from "../../assets/location.svg";
import { ReactComponent as OrgIcon } from "../../assets/org-icon.svg";
import { ReactComponent as PeopleIcon } from "../../assets/people.svg";

const UserProfile = () => {
  const username = window.location.pathname.split("/").pop();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const userData = await GitHubAPI.getUserProfile(username);
      setUser(userData);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching user data:", err);
    } finally {
      setLoading(false);
    }
  }, [username]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    }
    return num?.toString() || "0";
  };

  if (loading) {
    return (
      <div className="bg-primary p-6 rounded-lg border border-default">
        <div className="animate-pulse">
          <div className="w-24 h-24 bg-secondary rounded-full mx-auto mb-4"></div>
          <div className="h-4 bg-secondary rounded mb-2"></div>
          <div className="h-3 bg-secondary rounded mb-4 w-3/4 mx-auto"></div>
          <div className="space-y-2">
            <div className="h-3 bg-secondary rounded"></div>
            <div className="h-3 bg-secondary rounded"></div>
            <div className="h-3 bg-secondary rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-primary p-6 rounded-lg border border-default">
        <div className="text-center">
          <div className="text-danger mb-2">⚠️ Error loading profile</div>
          <p className="text-secondary text-sm">{error}</p>
          <button
            onClick={fetchUserData}
            className="btn-secondary mt-3 text-sm"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="max-w-[300px] text-left">
      {/* Profile Header */}
      <div className="p-6">
        <img
          src={user.avatar_url}
          alt={user.name}
          className="w-48 h-48 rounded-full mx-auto mb-4 border-2 border-secondary"
        />

        <h2 className="text-xl font-bold text-primary mb-1">{user.name}</h2>

        <p className="text-secondary text-sm mb-3">{user.login}</p>

        <button className="btn-secondary w-full mb-4">Follow</button>

        {user.bio && (
          <p className="text-secondary text-sm leading-relaxed mb-4">
            {user.bio}
          </p>
        )}

        {/* Stats */}
        <div className="flex gap-1 text-sm">
          <PeopleIcon className="w-4 h-4" />
          <div className="text-center">
            <span className="text-primary flex gap-1 font-semibold">
              {formatNumber(user.followers)} followers .
            </span>
          </div>
          <div className="text-center">
            <span className="text-primary flex gap-1 font-semibold">
              {formatNumber(user.following)} following.
            </span>
          </div>
        </div>
      </div>

      {/* Profile Details */}
      <div className="px-6 pb-6 space-y-3">
        {user.company && (
          <div className="flex items-center text-sm text-secondary">
            <OrgIcon className="w-4 h-4 mr-2" />
            {user.company}
          </div>
        )}

        {user.location && (
          <div className="flex items-center text-sm text-secondary">
            <LocationIcon className="w-4 h-4 mr-2" />
            {user.location}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
