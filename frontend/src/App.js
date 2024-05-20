import { useState, useEffect } from "react";

import useAuth from "context/useAuth";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Soft UI Dashboard React components
import Sidenav from "components/Sidenav";

// Soft UI Dashboard React themes
import theme from "assets/theme";

// Soft UI Dashboard React routes
import routes from "routes";

// Soft UI Dashboard React contexts
import { useSoftUIController, setMiniSidenav, setOpenConfigurator } from "context";

// Images
import brand from "assets/images/logo-ct.png";

export default function App() {
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, direction, layout, openConfigurator, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { token, user } = useAuth();
  const { pathname } = useLocation();

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const authComponent = (component) => {
    if (token && user) {
      if (user?.status == "P" && !pathname.includes("/firstLogin")) {
        return <Navigate to="/firstLogin" replace state={{ path: pathname }} />
      }
      return component
    } else if (!token) {
      return <Navigate to="/login" replace state={{ path: pathname }} />
    }
  }

  const unauthComponent = (component) => {
    return token ?
      <Navigate to={"/"} replace state={{ path: pathname }} />
      :
      component
  }


  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={(route.authenticated) ? authComponent(route.component) : unauthComponent(route.component)} key={route.key} />
      }

      return null;
    });

  return <ThemeProvider theme={theme}>
    <CssBaseline />
    {layout === "dashboard" && token && user?.status != "P" && (
      <Sidenav
        color={sidenavColor}
        brand={brand}
        brandName="BAAS"
        routes={routes}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
      />
    )}
    <Routes>
      {getRoutes(routes)}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </ThemeProvider>
}
