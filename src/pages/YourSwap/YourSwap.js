import NavBar from "../../components/NavBar";
import { ThemeProvider, Container, Tabs, Tab, setRef } from "@material-ui/core";
import { theme } from "../../Theme";
import { useState, useEffect } from "react";
import { useStyles } from "./theme";
import useSwap from "../../hooks/useSwap";
import SwapList from "../../components/SwapList/SwapList";
import { connect } from "react-redux";

function YourSwap({ success, loading }) {
  const [value, setValue] = useState(0);
  const [refresh, setRefresh] = useState(true);

  const classes = useStyles();

  const changeStatus = () => {
    setRefresh(!refresh);
  };

  const handleChange = (event, newValue) => {
    event.preventDefault();
    setValue(newValue);
  };

  const { userSwaps, viewSwaps } = useSwap();

  useEffect(() => {
    if (refresh) {
      viewSwaps();
      setRefresh(false);
    }
  }, [refresh]);

  return (
    <ThemeProvider theme={theme}>
      <NavBar arr={[false, false, true]} />
      <Container className={classes.main}>
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          className={classes.tabs}
          onChange={handleChange}
        >
          <Tab label="Open" />
          <Tab label="Reserved" />
          <Tab label="Completed" />
        </Tabs>
        {value === 0 && (
          <SwapList
            arr={userSwaps.filter(
              (swap) => !swap.isReserved && !swap.isCompleted
            )}
            panel="open"
            status={changeStatus}
          />
        )}
        {value === 1 && (
          <SwapList
            arr={userSwaps.filter((swap) => swap.isReserved)}
            panel="reserved"
            status={changeStatus}
          />
        )}
        {value === 2 && (
          <SwapList
            arr={userSwaps.filter((swap) => swap.isCompleted)}
            panel="completed"
            status={changeStatus}
          />
        )}
      </Container>
    </ThemeProvider>
  );
}

const mapStateToProps = (state) => {
  return {
    success: state.swap.success,
    loading: state.swap.isLoading,
  };
};
export default connect(mapStateToProps)(YourSwap);
