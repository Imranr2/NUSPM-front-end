import { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {
  ThemeProvider,
  ListItemIcon,
  ListItemText,
  Container,
} from "@material-ui/core";
import { theme, useStyles } from "./theme";
// import Logo from "../../assets/nuspmlogo.svg";
import Logo from "../Logo";
import {
  Storefront,
  AddBox,
  LocalOffer,
  ExitToApp,
  ArrowDropDown,
} from "@material-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useMediaQuery } from "react-responsive";
import HomeIcon from "@material-ui/icons/Home";
import SwapHorizIcon from "@material-ui/icons/SwapHoriz";
import PersonIcon from "@material-ui/icons/Person";

export default function NavBar(props) {
  const classes = useStyles();
  const [anchorEl1, setAnchorEl1] = useState(null);
  const [homeClicked, setHomeClicked] = useState(props.arr[0]);
  const [swapClicked, setSwapClicked] = useState(props.arr[1]);
  const [profileClicked, setProfileClicked] = useState(props.arr[2]);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const { signOut } = useAuth();

  const isSmallScreen = useMediaQuery({ query: "(max-width:700px)" });
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 701px)",
  });

  const handleSwapClicked = (event) => {
    if (!swapClicked) {
      setHomeClicked(false);
      setProfileClicked(false);
    }
    setSwapClicked(!swapClicked);
    setAnchorEl1(event.currentTarget);
  };

  const handleProfileClicked = (event) => {
    if (!profileClicked) {
      setHomeClicked(false);
      setSwapClicked(false);
    }
    setProfileClicked(!profileClicked);
    setAnchorEl2(event.currentTarget);
  };

  const handleSwapClosed = () => {
    // setSwapClicked(!swapClicked);
    setAnchorEl1(null);
    setHomeClicked(props.arr[0]);
    setSwapClicked(props.arr[1]);
    setProfileClicked(props.arr[2]);
  };

  const handleProfileClosed = () => {
    // setProfileClicked(!profileClicked);
    setAnchorEl2(null);
    setHomeClicked(props.arr[0]);
    setSwapClicked(props.arr[1]);
    setProfileClicked(props.arr[2]);
  };

  const logOut = () => {
    signOut();
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <AppBar
          className={isSmallScreen ? classes.appbarSmall : classes.appbar}
          position="sticky"
          color="default"
          elevation={isSmallScreen ? 0 : 5}
        >
          <Toolbar>
            <div className={classes.container}>
              <Logo width="150" />
            </div>
            {!isSmallScreen && (
              <>
                <Button
                  className={classes.button}
                  component={RouterLink}
                  to="/home"
                  variant="text"
                  color={homeClicked ? "primary" : "secondary"}
                >
                  {/* Home */}
                  {isSmallScreen && <HomeIcon />}
                  {isDesktopOrLaptop && "Home"}
                </Button>
                <Button
                  className={classes.button}
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  variant="text"
                  onClick={handleSwapClicked}
                  color={swapClicked ? "primary" : "secondary"}
                  endIcon={<ArrowDropDown />}
                >
                  {isSmallScreen && <SwapHorizIcon />}
                  {isDesktopOrLaptop && "Swap"}
                </Button>
                <Menu
                  id="simple-menu"
                  getContentAnchorEl={null}
                  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                  transformOrigin={{ vertical: "top", horizontal: "center" }}
                  anchorEl={anchorEl1}
                  keepMounted
                  open={Boolean(anchorEl1)}
                  onClose={handleSwapClosed}
                >
                  <MenuItem
                    component={RouterLink}
                    to="/marketplace"
                    className={classes.menu}
                    onClose={handleSwapClosed}
                  >
                    <ListItemIcon>
                      <Storefront />
                    </ListItemIcon>
                    <ListItemText primary="Marketplace" />
                  </MenuItem>
                  <MenuItem
                    component={RouterLink}
                    to="/create"
                    className={classes.menu}
                  >
                    <ListItemIcon>
                      <AddBox />
                    </ListItemIcon>
                    <ListItemText primary="Create Swap" />
                  </MenuItem>
                  <MenuItem
                    component={RouterLink}
                    to="/yourSwap"
                    className={classes.menu}
                  >
                    <ListItemIcon>
                      <LocalOffer />
                    </ListItemIcon>
                    <ListItemText primary="Your Swap and Offers" />
                  </MenuItem>
                </Menu>
                <Button
                  className={classes.button}
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  variant="text"
                  onClick={handleProfileClicked}
                  color={profileClicked ? "primary" : "secondary"}
                  endIcon={<ArrowDropDown />}
                >
                  {isSmallScreen && <PersonIcon />}
                  {isDesktopOrLaptop && "Profile"}
                </Button>
                <Menu
                  id="simple-menu"
                  getContentAnchorEl={null}
                  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                  transformOrigin={{ vertical: "top", horizontal: "center" }}
                  anchorEl={anchorEl2}
                  keepMounted
                  open={Boolean(anchorEl2)}
                  onClose={handleProfileClosed}
                >
                  <MenuItem
                    component={RouterLink}
                    to="/myAccount"
                    className={classes.menu}
                    onClick={logOut}
                  >
                    <ListItemIcon>
                      <ExitToApp />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                  </MenuItem>
                </Menu>
              </>
            )}
          </Toolbar>
        </AppBar>
        {isSmallScreen && (
          <>
            <AppBar
              className={classes.appbarSmall}
              position="relative"
              color="default"
              // elevation={3}
            >
              <Toolbar>
                <Button
                  className={classes.buttonStandard}
                  component={RouterLink}
                  to="/home"
                  variant="text"
                  color={homeClicked ? "primary" : "secondary"}
                >
                  {/* Home */}
                  {isSmallScreen && <HomeIcon />}
                  {isDesktopOrLaptop && "Home"}
                </Button>
                <Button
                  className={classes.buttonStandard}
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  variant="text"
                  onClick={handleSwapClicked}
                  color={swapClicked ? "primary" : "secondary"}
                  endIcon={<ArrowDropDown />}
                >
                  {isSmallScreen && <SwapHorizIcon />}
                  {isDesktopOrLaptop && "Swap"}
                </Button>
                <Menu
                  id="simple-menu"
                  getContentAnchorEl={null}
                  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                  transformOrigin={{ vertical: "top", horizontal: "center" }}
                  anchorEl={anchorEl1}
                  keepMounted
                  open={Boolean(anchorEl1)}
                  onClose={handleSwapClosed}
                >
                  <MenuItem
                    component={RouterLink}
                    to="/marketplace"
                    className={classes.menu}
                    onClose={handleSwapClosed}
                  >
                    <ListItemIcon>
                      <Storefront />
                    </ListItemIcon>
                    <ListItemText primary="Marketplace" />
                  </MenuItem>
                  <MenuItem
                    component={RouterLink}
                    to="/create"
                    className={classes.menu}
                  >
                    <ListItemIcon>
                      <AddBox />
                    </ListItemIcon>
                    <ListItemText primary="Create Swap" />
                  </MenuItem>
                  <MenuItem
                    component={RouterLink}
                    to="/yourSwap"
                    className={classes.menu}
                  >
                    <ListItemIcon>
                      <LocalOffer />
                    </ListItemIcon>
                    <ListItemText primary="Your Swap and Offers" />
                  </MenuItem>
                </Menu>
                <Button
                  className={classes.buttonStandard}
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  variant="text"
                  onClick={handleProfileClicked}
                  color={profileClicked ? "primary" : "secondary"}
                  endIcon={<ArrowDropDown />}
                >
                  {isSmallScreen && <PersonIcon />}
                  {isDesktopOrLaptop && "Profile"}
                </Button>
                <Menu
                  id="simple-menu"
                  getContentAnchorEl={null}
                  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                  transformOrigin={{ vertical: "top", horizontal: "center" }}
                  anchorEl={anchorEl2}
                  keepMounted
                  open={Boolean(anchorEl2)}
                  onClose={handleProfileClosed}
                >
                  <MenuItem
                    component={RouterLink}
                    to="/myAccount"
                    className={classes.menu}
                    onClick={logOut}
                  >
                    <ListItemIcon>
                      <ExitToApp />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                  </MenuItem>
                </Menu>
              </Toolbar>
            </AppBar>
          </>
        )}
      </div>
    </ThemeProvider>
  );
}
