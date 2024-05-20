

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";

// Soft UI Dashboard React components
import PageLayout from "components/LayoutContainers/PageLayout";

// Authentication layout components
import Footer from "../Footer";

function CoverLayout({ top, children }) {
  return (
    <PageLayout background="#F7F7F7" sx={{ height: '100vw' }}>
      <Grid
        container
        justifyContent="center"
      >
        <Grid item xs={11} sm={8} md={5} xl={3}>
          <SuiBox mt={top}>
            <SuiBox p={3}>{children}</SuiBox>
          </SuiBox>
        </Grid>
      </Grid>
      <Footer />
    </PageLayout>
  );
}

// Setting default values for the props of CoverLayout
CoverLayout.defaultProps = {
  color: "info",
  top: 20,
};

// Typechecking props for the CoverLayout
CoverLayout.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
    "light",
  ]),
  header: PropTypes.node,
  title: PropTypes.string,
  description: PropTypes.string,
  top: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default CoverLayout;
