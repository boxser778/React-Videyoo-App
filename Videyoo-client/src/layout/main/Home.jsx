import React from "react";
import ChangesSevice from "../../services/handleChangeService";
import LandingPage from "./LandingPage/LandingPage";

class HomePage extends ChangesSevice {
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <LandingPage />
        </div>
      </React.Fragment>
    );
  }
}

export default HomePage;
