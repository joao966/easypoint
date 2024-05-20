

// @mui material components
import Grid from "@mui/material/Grid";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";

function Footer() {
  return (
    <SuiBox component="footer" my={4} sx={{ position: 'absolute', bottom: 1, width: '100vw' }}>
      <Grid container justifyContent="center">
        <Grid item xs={12} lg={8} sx={{ textAlign: "center" }}>
          <SuiTypography variant="body2" color="secondary">
            Copyright &copy;Galo Véio and Company 2024.
          </SuiTypography>
        </Grid>
      </Grid>
    </SuiBox>
  );
}

export default Footer;
