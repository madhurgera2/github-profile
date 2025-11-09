import "./App.css";
import "./styles/themes.css";
import Header from "./components/Header";
import ProfileHeader from "./components/ProfileHeader";
import { ThemeProvider } from "./context/ThemeContext";
import UserProfile from "./components/UserProfile";
import GitHubCalendarHeatmap from "./components/GitHubCalendarHeatmap";
import Repositories from "./components/Repositories";

function App() {
  return (
    <ThemeProvider>
      <div className="App bg-primary min-h-screen">
        <Header />
        <div className="flex">
          <main className="flex-1">
            <ProfileHeader />
            <div className="flex justify-evenly max-md:flex-col">
              <UserProfile />
              <Repositories />
            </div>

            <GitHubCalendarHeatmap />
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
