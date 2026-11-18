
import { NavLink, Outlet } from "react-router-dom";
import { LayoutDashboard, Users, GraduationCap } from "lucide-react";
import "./DashboardLayout.css";

function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div className="brand">
          <GraduationCap size={30} />
          <h2>CampusIQ</h2>
        </div>

        <p className="nav-heading">MAIN MENU</p>

        <nav>
          <NavLink to="/" end>
            <LayoutDashboard size={19} />
            Overview
          </NavLink>

          <NavLink to="/students">
            <Users size={19} />
            Student Records
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <p>Smart Campus Analytics</p>
          <span>Academic Dashboard</span>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <h3>Smart Campus Analytics</h3>
            <p>Student performance monitoring system</p>
          </div>
          <span className="academic-year">Academic Year 2026–27</span>
        </header>

        <div className="page-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default DashboardLayout;
