

import { useState, useEffect } from "react";

import useAuth from "context/useAuth";

// react-router components
import { useLocation, Link } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @material-ui core components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiInput from "components/SuiInput";

// Soft UI Dashboard React components
import Breadcrumbs from "components/Breadcrumbs";
import NotificationItem from "components/Items/NotificationItem";

// Custom styles for DashboardNavbar
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarMobileMenu,
  navbarPageTitle,
} from "components/Navbars/DashboardNavbar/styles";

// Soft UI Dashboard React context
import {
  useSoftUIController,
  setTransparentNavbar,
  setMiniSidenav,
  setOpenConfigurator,
} from "context";

// Images
import team2 from "assets/images/team-2.jpg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";

function DashboardNavbar({ absolute, light, isMini, showTitle, title = '', order }) {
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, transparentNavbar } = controller;
  const [openMenu, setOpenMenu] = useState(false);
  const route = useLocation().pathname.split("/").slice(1);
  const { logout } = useAuth()

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleLogOut = () => logout();
  const handleCloseMenu = () => setOpenMenu(false);

  return (
    <AppBar
      position={absolute ? "absolute" : 'static'}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light, showTitle })}
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        <SuiTypography
          variant="h4"
          fontWeight="medium"
          color={light ? "white" : "dark"}
          sx={navbarPageTitle()}
        >
          {title}
        </SuiTypography>
        {isMini ? null : (
          <SuiBox sx={(theme) => navbarRow(theme, { isMini })}>
           {order ? null : (
              <SuiBox color={light ? "white" : "inherit"}>
                <Link to="/perfil">
                  <IconButton sx={navbarIconButton} size="small">
                    <Icon
                      sx={({ palette: { dark, white } }) => ({
                        color: light ? white.main : dark.main,
                      })}
                    >
                      account_circle
                    </Icon>
                    <SuiTypography
                      variant="button"
                      fontWeight="medium"
                      color={light ? "white" : "dark"}
                    >
                      Perfil
                    </SuiTypography>
                  </IconButton>
                </Link>
                <IconButton
                  size="small"
                  color="inherit"
                  sx={navbarMobileMenu}
                  onClick={handleMiniSidenav}
                >
                  <Icon className={light ? "text-white" : "text-dark"}>
                    {miniSidenav ? "menu_open" : "menu"}
                  </Icon>
                </IconButton>
                <IconButton
                  size="small"
                  color="inherit"
                  sx={navbarIconButton}
                  aria-controls="logoff"
                  variant="contained"
                  onClick={handleLogOut}
                  title="Sair"
                >
                  <Icon className={light ? "text-white" : "text-dark"}>logoutIcon</Icon>
                </IconButton>
              </SuiBox>
           )}
          </SuiBox>
        )}
      </Toolbar>
    </AppBar>
  );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;
