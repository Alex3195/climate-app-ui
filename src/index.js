import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

// layouts

import Admin from "./layouts/Admin.js";
import Auth from "./layouts/Auth.js";

// views without layouts

import Landing from "./views/Landing.js";
import Profile from "./views/Profile.js";
import Index from "./views/Index.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store } from "./app/store";
import persistStore from "redux-persist/es/persistStore";
import Setting from "./layouts/Setting";
import References from "./views/mainView/References.js";
import PdfViewPage from "./views/mainView/PdfViewPage.js";
import UserRouter from "./layouts/UserRouter.js";

let persistor = persistStore(store);
ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Switch>
          {/* add routes with layouts */}
          <Route path="/admin" component={Admin} />
          <Route path="/settings" component={Setting} />
          <Route path="/researcher" component={UserRouter} />
          <Route path="/auth" component={Auth} />
          {/* add routes without layouts */}
          <Route path="/landing" exact component={Landing} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/" exact component={Index} />
          <Route path="/references" exact component={References} />
          <Route path="/viewDoc" exact component={PdfViewPage} />
          {/* add redirect for first page */}
          <Redirect from="*" to="/" />
        </Switch>
      </PersistGate>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
