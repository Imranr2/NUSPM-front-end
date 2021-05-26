import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { ThemeProvider, ListItemIcon, ListItemText } from "@material-ui/core";
import { theme, useStyles } from "./theme";
import Logo from "../../assets/nuspmlogo.png";
import {
  Storefront,
  AddBox,
  LocalOffer,
  AccountCircle,
  ExitToApp,
  ArrowDropDown,
} from "@material-ui/icons";

export default function NavBar() {
  const classes = useStyles();
  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const [clicked1, setClicked1] = React.useState(false);
  const [clicked2, setClicked2] = React.useState(false);
  const [anchorEl2, setAnchorEl2] = React.useState(null);

  const handleClick1 = (event) => {
    setClicked1(!clicked1);
    setAnchorEl1(event.currentTarget);
  };

  const handleClick2 = (event) => {
    setClicked2(!clicked2);
    setAnchorEl2(event.currentTarget);
  };

  const handleClose1 = () => {
    setClicked1(!clicked1);
    setAnchorEl1(null);
  };

  const handleClose2 = () => {
    setClicked2(!clicked2);
    setAnchorEl2(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <AppBar position="fixed" color="default">
          <Toolbar>
            <div className={classes.container}>
              <img src={Logo} width="150" alt="NUSPM" />
            </div>
            <Button
              className={classes.button}
              variant="text"
              color={clicked1 || clicked2 ? "secondary" : "primary"}
            >
              Home
            </Button>
            <Button
              className={classes.button}
              aria-controls="simple-menu"
              aria-haspopup="true"
              variant="text"
              onClick={handleClick1}
              color={clicked1 ? "primary" : "secondary"}
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
              onClose={handleClose1}
            >
              <MenuItem className={classes.menu} onClick={handleClose1}>
                <ListItemIcon>
                  <Storefront />
                </ListItemIcon>
                <ListItemText primary="Marketplace" />
              </MenuItem>
              <MenuItem className={classes.menu} onClick={handleClose1}>
                <ListItemIcon>
                  <AddBox />
                </ListItemIcon>
                <ListItemText primary="Create Swap" />
              </MenuItem>
              <MenuItem className={classes.menu} onClick={handleClose1}>
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
              onClick={handleClick2}
              color={clicked2 ? "primary" : "secondary"}
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
              onClose={handleClose2}
            >
              <MenuItem className={classes.menu} onClick={handleClose2}>
                <ListItemIcon>
                  <AccountCircle />
                </ListItemIcon>
                <ListItemText primary="My Account" />
              </MenuItem>
              <MenuItem className={classes.menu} onClick={handleClose2}>
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
