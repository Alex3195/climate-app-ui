import React from "react";
import { Switch, Route } from "react-router-dom";

// components

import AdminNavbar from "../components/Navbars/AdminNavbar.js";
import FooterAdmin from "../components/Footers/FooterAdmin.js";

// views

import HeaderStats from "../components/Headers/HeaderStats.js";
import UserSidebar from "components/Sidebar/UserSideBar.js";
import Dashboard from "../views/researcher/Dashboard.js";
import ResearcherQueries from "./Researcher/ResearcherQueries.js";
import AddForm from "components/Researcher/AddForm.js";


export default function UserRouter() {
  return (
    <>
      <UserSidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar title={"Researcher layout"} />
        {/* Header */}
        <HeaderStats showCard={true} />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Switch>
            <Route path="/researcher/dashboard" exact component={Dashboard} />
            <Route
              path="/researcher/queries"
              exact
              component={ResearcherQueries}
            />
            <Route path="/researcher/queries/add" exact component={AddForm} />
          </Switch>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
