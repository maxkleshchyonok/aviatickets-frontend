import { Grid, Typography, styled } from "@mui/material";
import React from "react";

type Props = {};

const StyledTypography = styled(Typography)({
  paddingTop: "15vh",
  color: "white",
  fontWeight: "200",
});

const StyledGrid = styled(Grid)(({ theme }) => ({
  backgroundImage:
    "url(https://wallpapersmug.com/download/3840x2400/72108f/aircraft-sky-trail.jpg)",
  backgroundRepeat: "no-repeat",
  backgroundColor:
    theme.palette.mode === "light"
      ? theme.palette.grey[50]
      : theme.palette.grey[900],
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  justifyContent: "center",
}));

const MainImage = (props: Props) => {
  return (
    <StyledGrid item xs={false} sm={4} md={7}>
      <StyledTypography variant="h1">Avia Finder</StyledTypography>
    </StyledGrid>
  );
};

export default MainImage;
