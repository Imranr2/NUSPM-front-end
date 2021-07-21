/* eslint-disable */
import { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {
  ThemeProvider,
  ListItemIcon,
  ListItemText,
  Badge,
  ButtonBase,
} from "@material-ui/core";
import { theme, useStyles } from "./theme";
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
import useNotification from "../../hooks/useNotification";
import Alert from "@material-ui/lab/Alert";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { connect } from "react-redux";

function NavBar({
  arr,
  loggedIn,
  createSwap,
  deleteSwap,
  updateSwap,
  createOffer,
  deleteOffer,
  withdrawOffer,
  updateOffer,
}) {
  const classes = useStyles();
  const [anchorEl1, setAnchorEl1] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [anchorEl3, setAnchorEl3] = useState(null);
  const [homeClicked, setHomeClicked] = useState(arr[0]);
  const [swapClicked, setSwapClicked] = useState(arr[1]);
  const [profileClicked, setProfileClicked] = useState(arr[2]);
  const [notifClicked, setNotifClicked] = useState(false);

  const { signOut } = useAuth();
  const { getAllNotifications, markNotificationAsRead, notifications } =
    useNotification();

  const isSmallScreen = useMediaQuery({ query: "(max-width:700px)" });

  const handleSwapClicked = (event) => {
    if (!swapClicked) {
      setHomeClicked(false);
      setProfileClicked(false);
      setNotifClicked(false);
    }
    setSwapClicked(!swapClicked);
    setAnchorEl1(event.currentTarget);
  };

  const handleProfileClicked = (event) => {
    if (!profileClicked) {
      setHomeClicked(false);
      setSwapClicked(false);
      setNotifClicked(false);
    }
    setProfileClicked(!profileClicked);
    setAnchorEl2(event.currentTarget);
  };

  const handleSwapClosed = () => {
    setAnchorEl1(null);
    setHomeClicked(arr[0]);
    setSwapClicked(arr[1]);
    setProfileClicked(arr[2]);
    setNotifClicked(false);
  };

  const handleProfileClosed = () => {
    setAnchorEl2(null);
    setHomeClicked(arr[0]);
    setSwapClicked(arr[1]);
    setProfileClicked(arr[2]);
    setNotifClicked(false);
  };

  const handleNotifClicked = (event) => {
    if (!notifClicked) {
      setHomeClicked(false);
      setSwapClicked(false);
      setProfileClicked(false);
    }
    markNotificationAsRead();
    setNotifClicked(!notifClicked);
    setAnchorEl3(event.currentTarget);
  };

  const handleNotifClosed = (event) => {
    setAnchorEl3(null);
    setHomeClicked(arr[0]);
    setSwapClicked(arr[1]);
    setProfileClicked(arr[2]);
    setNotifClicked(false);
  };

  const logOut = () => {
    signOut();
  };

  useEffect(() => {
    if (
      loggedIn ||
      createSwap ||
      deleteSwap ||
      updateSwap ||
      createOffer ||
      deleteOffer ||
      withdrawOffer ||
      updateOffer
    )
      getAllNotifications();
  }, [
    loggedIn,
    createSwap,
    deleteSwap,
    updateSwap,
    createOffer,
    deleteOffer,
    withdrawOffer,
    updateOffer,
  ]);

  const success = ["accept"];
  const info = ["create", "sent", "receive", "edit"];
  const error = ["reject", "delete", "withdraw"];

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
              <ButtonBase disableRipple component={RouterLink} to="/home">
                <Logo width="150" />
              </ButtonBase>
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
                  <HomeIcon className={classes.icon} />
                  Home
                </Button>
                <Button
                  className={classes.button}
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  variant="text"
                  onClick={handleNotifClicked}
                  color={notifClicked ? "primary" : "secondary"}
                >
                  <Badge
                    className={classes.icon}
                    badgeContent={
                      notifications.filter(
                        (notification) => notification.read_at === null
                      ).length
                    }
                    color="primary"
                  >
                    <NotificationsIcon />
                  </Badge>
                  Notifications
                </Button>
                <Menu
                  id="simple-menu"
                  getContentAnchorEl={null}
                  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                  transformOrigin={{ vertical: "top", horizontal: "center" }}
                  anchorEl={anchorEl3}
                  keepMounted
                  open={Boolean(anchorEl3)}
                  onClose={handleNotifClosed}
                >
                  {notifications.length === 0 && (
                    <Alert className={classes.alert} severity="info">
                      You have no notifications
                    </Alert>
                  )}
                  {notifications.map((notification, index) => (
                    <MenuItem
                      key={index}
                      disableRipple
                      onClose={handleNotifClosed}
                      className={classes.menuItem}
                    >
                      {error.some((element) =>
                        notification.content.includes(element)
                      ) && (
                        <Alert className={classes.alert} severity="error">
                          {notification.content}
                        </Alert>
                      )}
                      {success.some((element) =>
                        notification.content.includes(element)
                      ) && (
                        <Alert className={classes.alert} severity="success">
                          {notification.content}
                        </Alert>
                      )}
                      {info.some((element) =>
                        notification.content.includes(element)
                      ) && (
                        <Alert className={classes.alert} severity="info">
                          {notification.content}
                        </Alert>
                      )}
                    </MenuItem>
                  ))}
                </Menu>
                <Button
                  className={classes.button}
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  variant="text"
                  onClick={handleSwapClicked}
                  color={swapClicked ? "primary" : "secondary"}
                  endIcon={<ArrowDropDown />}
                >
                  <SwapHorizIcon className={classes.icon} />
                  Swap
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
                    className={classes.menuItem}
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
                    className={classes.menuItem}
                  >
                    <ListItemIcon>
                      <AddBox />
                    </ListItemIcon>
                    <ListItemText primary="Create Swap" />
                  </MenuItem>
                  <MenuItem
                    component={RouterLink}
                    to="/yourSwap"
                    className={classes.menuItem}
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
                  <PersonIcon className={classes.icon} />
                  Profile
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
                    className={classes.menuItem}
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
            >
              <Toolbar>
                <Button
                  className={classes.buttonStandard}
                  component={RouterLink}
                  to="/home"
                  variant="text"
                  color={homeClicked ? "primary" : "secondary"}
                >
                  <HomeIcon />
                </Button>
                <Button
                  className={classes.buttonStandard}
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  variant="text"
                  onClick={handleNotifClicked}
                  color={notifClicked ? "primary" : "secondary"}
                >
                  <NotificationsIcon />
                </Button>
                <Menu
                  id="simple-menu"
                  getContentAnchorEl={null}
                  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                  transformOrigin={{ vertical: "top", horizontal: "center" }}
                  anchorEl={anchorEl3}
                  keepMounted
                  open={Boolean(anchorEl3)}
                  onClose={handleNotifClosed}
                >
                  {notifications.map((notification, index) => (
                    <MenuItem
                      key={index}
                      className={classes.menuItem}
                      onClose={handleNotifClosed}
                    >
                      {error.some((element) =>
                        notification.content.includes(element)
                      ) && (
                        <Alert className={classes.alert} severity="error">
                          {notification.content}
                        </Alert>
                      )}
                      {success.some((element) =>
                        notification.content.includes(element)
                      ) && (
                        <Alert className={classes.alert} severity="success">
                          {notification.content}
                        </Alert>
                      )}
                      {info.some((element) =>
                        notification.content.includes(element)
                      ) && (
                        <Alert className={classes.alert} severity="info">
                          {notification.content}
                        </Alert>
                      )}
                    </MenuItem>
                  ))}
                </Menu>
                <Button
                  className={classes.buttonStandard}
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  variant="text"
                  onClick={handleSwapClicked}
                  color={swapClicked ? "primary" : "secondary"}
                  endIcon={<ArrowDropDown />}
                >
                  <SwapHorizIcon />
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
                    className={classes.menuItem}
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
                    className={classes.menuItem}
                  >
                    <ListItemIcon>
                      <AddBox />
                    </ListItemIcon>
                    <ListItemText primary="Create Swap" />
                  </MenuItem>
                  <MenuItem
                    component={RouterLink}
                    to="/yourSwap"
                    className={classes.menuItem}
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
                  <PersonIcon />
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
                    className={classes.menuItem}
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

const mapStateToProps = (state) => {
  return {
    createSwap: state.swap.createSuccess,
    deleteSwap: state.swap.deleteSuccess,
    updateSwap: state.swap.updateSuccess,
    createOffer: state.offer.createSuccess,
    deleteOffer: state.offer.deleteSuccess,
    withdrawOffer: state.offer.withdrawSuccess,
    updateOffer: state.offer.updateSuccess,
    loggedIn: state.auth.loginSuccess,
  };
};
export default connect(mapStateToProps)(NavBar);
