import React from "react";
import { Switch, Route } from "react-router-dom";

// components

import AdminNavbar from "../components/Navbars/AdminNavbar.js";
import Sidebar from "../components/Sidebar/Sidebar.js";
import FooterAdmin from "../components/Footers/FooterAdmin.js";

// views

import TopicCategory from "../views/admin/TopicCategory.js";
import HeaderStats from "../components/Headers/HeaderStats.js";
import AddCategory from "./Categories/AddCategory.js";
import Topic from "../views/admin/Topic.js";
import AddTopic from "./Topic/AddTopic";

export default function Setting() {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar title={"Topic setting"} />
        {/* Header */}
        <HeaderStats showCard={true} />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Switch>
            <Route path="/settings/category" exact component={TopicCategory} />
            <Route
              path="/settings/add/category"
              exact
              component={AddCategory}
            />
            <Route path="/settings/topic" exact component={Topic} />
            <Route path="/settings/topic/add" exact component={AddTopic} />
          </Switch>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
