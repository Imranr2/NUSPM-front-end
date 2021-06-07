import React from "react";
import { useState, useEffect } from "react";
import NavBar from "../../components/NavBar";
import {
  ThemeProvider,
  Container,
  Grid,
  Button,
  TextField,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { theme } from "./theme";
import { useStyles } from "./theme";
import useSwap from "../../hooks/useSwap";

export default function Marketplace() {
  const classes = useStyles();
  const { moduleList, modDets, getAllModules, getModuleDetails, createSwap } =
    useSwap();

  const [moduleCode, setModuleCode] = useState("");
  const [slotType, setSlotType] = useState("");
  const [currentSlot, setCurrentSlot] = useState("");
  const [desiredSlots, setDesiredSlots] = useState([]);

  const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <ThemeProvider theme={theme}>
      <NavBar arr={[false, true, false]} />
      <Container className={classes.main}>
        <div>
          <form>
            <Grid className={classes.search} container spacing={2}>
              <Grid item>
                <Autocomplete
                  classes={{
                    root: classes.fields,
                    paper: classes.paper,
                  }}
                  options={moduleList}
                  onChange={(event, value) => {
                    setModuleCode(value);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      label="Module Code"
                      variant="outlined"
                    />
                  )}
                />
              </Grid>
              <Grid item>
                <Autocomplete
                  classes={{
                    root: classes.fields,
                    paper: classes.paper,
                  }}
                  options={Array.from(
                    new Set(
                      modDets
                        .map((element) => element.lessonType)
                        .filter((lessonType) => lessonType !== "Lecture")
                    )
                  )}
                  onChange={(event, value) => setSlotType(value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      label="Type"
                      variant="outlined"
                    />
                  )}
                />
              </Grid>
              <Grid item>
                <Autocomplete
                  classes={{
                    root: classes.fields,
                    paper: classes.paper,
                  }}
                  options={modDets
                    .filter((element) => element.lessonType === slotType)
                    .map((lesson) => lesson.classNo)
                    .sort()}
                  onChange={(event, value) => setCurrentSlot(value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      label="Current Slot"
                      variant="outlined"
                    />
                  )}
                />
              </Grid>
              <Grid item>
                <Button
                  className={classes.button}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Search
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
      <Container>
        <Grid container spacing={4}>
          {cards.map((card) => (
            <Grid item key={card} xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image="https://source.unsplash.com/random"
                  title="Image title"
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Heading
                  </Typography>
                  <Typography>
                    This is a media card. You can use this section to describe
                    the content.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    View
                  </Button>
                  <Button size="small" color="primary">
                    Edit
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
