import React, { Component } from "react";
import {
    Switch,
  } from "react-router-dom";
import { publicRouteList, privateRouteList } from "./routesList";
import { PrivateRoutes, PublicRoutes } from ".";





class SiteRoutes extends Component {
  render() {
    return (
  <div>
    <Switch>
    {publicRouteList.map((route, i) => (
            <PublicRoutes key={i} {...route} />
          ))}
    {privateRouteList.map((route, i) => (
            <PrivateRoutes key={i} {...route} />
          ))}
    </Switch>
  </div>
    )
  }
}

export default SiteRoutes;


