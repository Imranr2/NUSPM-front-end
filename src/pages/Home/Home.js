import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { ThemeProvider } from "@material-ui/core";
import { theme } from "../../Theme";
import Logo from "../../assets/nuspmlogo.png";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  title: {
    maxWidth: "100px",
  },
  nav: {
    flexGrow: 1,
  },
  container: {
    display: "flex",
    flexGrow: 6,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const [anchorEl2, setAnchorEl2] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };

  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClose1 = () => {
    setAnchorEl1(null);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <AppBar position="fixed" color="secondary">
          <Toolbar>
            <div className={classes.container}>
              <img src={Logo} width="100" alt="NUSPM" />
            </div>
            <Button className={classes.nav} variant="contained" color="inherit">
              Home
            </Button>
            <Button
              endIcon={<ArrowDropDownIcon />}
              className={classes.nav}
              aria-controls="simple-menu"
              aria-haspopup="true"
              variant="contained"
              onClick={handleClick1}
            >
              Swap
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl1}
              keepMounted
              open={Boolean(anchorEl1)}
              onClose={handleClose1}
            >
              <MenuItem onClick={handleClose1}>Marketplace</MenuItem>
              <MenuItem onClick={handleClose1}>Create Swap</MenuItem>
              <MenuItem onClick={handleClose1}>Offers</MenuItem>
            </Menu>
            <Button
              endIcon={<ArrowDropDownIcon />}
              className={classes.nav}
              aria-controls="simple-menu"
              aria-haspopup="true"
              variant="contained"
              onClick={handleClick2}
            >
              Manage account
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl2}
              keepMounted
              open={Boolean(anchorEl2)}
              onClose={handleClose2}
            >
              <MenuItem onClick={handleClose2}>My Account</MenuItem>
              <MenuItem onClick={handleClose2}>Edit Profile</MenuItem>
              <MenuItem onClick={handleClose2}>Logout</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </div>
    </ThemeProvider>
  );
}
