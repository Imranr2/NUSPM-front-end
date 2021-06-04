import { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { ThemeProvider, ListItemIcon, ListItemText } from "@material-ui/core";
import { theme, useStyles } from "./theme";
import { useHistory } from "react-router-dom";
import Logo from "../../assets/nuspmlogo.png";
import {
  Storefront,
  AddBox,
  LocalOffer,
  AccountCircle,
  ExitToApp,
  ArrowDropDown,
} from "@material-ui/icons";
import { Link as RouterLink } from "react-router-dom";

<<<<<<< Updated upstream
export default function NavBar(props) {
=======
export default function NavBar() {
  const history = useHistory();
>>>>>>> Stashed changes
  const classes = useStyles();
  const [anchorEl1, setAnchorEl1] = useState(null);
  const [homeClicked, setHomeClicked] = useState(props.arr[0]);
  const [swapClicked, setSwapClicked] = useState(props.arr[1]);
  const [profileClicked, setProfileClicked] = useState(props.arr[2]);
  const [anchorEl2, setAnchorEl2] = useState(null);

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

  const goToCreateSwap = () => {
    setClicked1(!clicked1);
    setAnchorEl1(null);
    history.push("/createSwap");
  };

  const goToMarketplace = () => {
    setClicked1(!clicked1);
    setAnchorEl1(null);
    history.push("/viewSwap");
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <AppBar className="classes.appbar" position="fixed" color="default">
          <Toolbar>
            <div className={classes.container}>
              <img src={Logo} width="150" alt="NUSPM" />
            </div>
            <Button
              className={classes.button}
              component={RouterLink}
              to="/home"
              variant="text"
              color={homeClicked ? "primary" : "secondary"}
            >
              Home
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
<<<<<<< Updated upstream
              <MenuItem className={classes.menu} onClick={handleSwapClosed}>
=======
              <MenuItem className={classes.menu} onClick={goToMarketplace}>
>>>>>>> Stashed changes
                <ListItemIcon>
                  <Storefront />
                </ListItemIcon>
                <ListItemText primary="Marketplace" />
              </MenuItem>
<<<<<<< Updated upstream
              <MenuItem
                component={RouterLink}
                to="/create"
                className={classes.menu}
              >
=======
              <MenuItem className={classes.menu} onClick={goToCreateSwap}>
>>>>>>> Stashed changes
                <ListItemIcon>
                  <AddBox />
                </ListItemIcon>
                <ListItemText primary="Create Swap" />
              </MenuItem>
              <MenuItem className={classes.menu} onClick={handleSwapClosed}>
                <ListItemIcon>
                  <LocalOffer />
                </ListItemIcon>
                <ListItemText primary="Offers" />
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
              <MenuItem className={classes.menu} onClick={handleProfileClosed}>
                <ListItemIcon>
                  <AccountCircle />
                </ListItemIcon>
                <ListItemText primary="My Account" />
              </MenuItem>
              <MenuItem className={classes.menu} onClick={handleProfileClosed}>
                <ListItemIcon>
                  <ExitToApp />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </div>
    </ThemeProvider>
  );
}
