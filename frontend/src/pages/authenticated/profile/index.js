
import { useState, useEffect } from "react";

// @mui material components
import Grid from "@mui/material/Grid";


// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";

// Soft UI Dashboard React components
import DashboardLayout from "components/LayoutContainers/DashboardLayout";
import ProfileInfoCard from "components/Cards/InfoCards/ProfileInfoCard";

// Overview page components
import Header from "./components/Header";
import PasswordChange from "././components/PasswordChange"

import useAuth from "context/useAuth";

function Overview() {
  const { user } = useAuth()

  return (
    <DashboardLayout>
      <Header user={user} />
      <SuiBox mt={5} mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <ProfileInfoCard
              title="Suas informações"
              info={{
                nome: user?.nome,
                telefone: user?.telefone,
                email: user?.email,
                estado: user?.estado,
                cidade: user?.cidade,
              }}
              action={{ route: `/usuarios/edit?id=${user.id}`, tooltip: "Edit Profile" }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <PasswordChange user={user} />
          </Grid>
        </Grid>
      </SuiBox>
    </DashboardLayout>
  );
}

export default Overview;
