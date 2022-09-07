import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../Context/AuthContext";

const pages = [
  { label: "Accueil", link: "/" },
  { label: "Projet", link: "/projet" },
  { label: "Actualités", link: "/actualites" },
];
const connexion = [{ label: "Connexion", link: "/connexion" }];
const membres = [
  { label: "Actualite des membres", link: "/membre-actualites" },
  { label: "Recherche", link: "/membre-recherche" },
];
const settings = ["Profil", "Compte", "Tableau de bord", "Déconnexion"];

const AppLayout = ({ children }) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();
  const { auth } = useAuthContext();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleRedirection = (setting) => {
    switch (setting) {
      case "Compte":
        navigate("/userDetail/1");
        break;
      case "Tableau de bord":
        navigate("/tableauDeBord");
        break;
      case "Déconnexion":
        navigate("/connexion");
        break;
      case "Profil":
        navigate("/userProfil/1");
        break;
      default:
        navigate("/");
    }
  };

  return (
    <Box>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem
                    key={page.label}
                    onClick={() => navigate(page.link)}
                  >
                    <Typography textAlign="center">{page.label}</Typography>
                  </MenuItem>
                ))}
                {!auth &&
                  connexion.map((page) => (
                    <MenuItem
                      key={page.label}
                      onClick={() => navigate(page.link)}
                    >
                      <Typography textAlign="center">{page.label}</Typography>
                    </MenuItem>
                  ))}
                {auth &&
                  membres.map((page) => (
                    <MenuItem
                      key={page.label}
                      onClick={() => navigate(page.link)}
                    >
                      <Typography textAlign="center">{page.label}</Typography>
                    </MenuItem>
                  ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page.label}
                  onClick={() => navigate(page.link)}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page.label}
                </Button>
              ))}
              {!auth &&
                connexion.map((page) => (
                  <Button
                    key={page.label}
                    onClick={() => navigate(page.link)}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {page.label}
                  </Button>
                ))}
              {auth &&
                membres.map((page) => (
                  <Button
                    key={page.label}
                    onClick={() => navigate(page.link)}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {page.label}
                  </Button>
                ))}
            </Box>
            {auth && (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting}
                      onClick={() => {
                        handleCloseUserMenu();
                        handleRedirection(setting);
                      }}
                    >
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Box sx={{ mt: 2, ml: 2, mr: 2, mb: 2 }}>{children}</Box>
    </Box>
  );
};
export default AppLayout;
