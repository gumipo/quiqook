import React from "react";
import Router from "./Router";
import "./assets/sanitize.css";
import "./assets/global.css";
import { Header, SiteNavigation } from "./Componets";

const App: React.FC = () => {
  return (
    <React.Fragment>
      <main>
        <Header />
        <SiteNavigation />
        <Router />
      </main>
    </React.Fragment>
  );
};
export default App;
