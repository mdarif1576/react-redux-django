import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import LandingPage from "./LandingPage";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import UserBlog from "./UserBlog";

function StagingArea(props) {
  useEffect(() => {
    props.authInitiate();
  }, []);

  return (
    <div>
      <Switch>
        <Route exact path="/" component={SignUp} />
        <Route exact path="/login" component={SignIn} />
        <Route exact path="/landing" component={LandingPage} />
        <Route exact path="/userblog" component={UserBlog} />
      </Switch>
    </div>
  );
}

const mapStateToProps = (state) => ({
  state,
});

const mapDispatchToProps = (dispatch) => ({
  authInitiate: () => dispatch({ type: "AUTH_INITIATE" }),
});

export default connect(mapStateToProps, mapDispatchToProps)(StagingArea);
