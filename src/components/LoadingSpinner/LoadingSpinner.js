import { PacmanLoader } from "react-spinners";
import { Container } from "@material-ui/core";

function LoadingSpinner() {
  return (
    <Container maxWidth={false} disableGutters={true}>
      <PacmanLoader />
    </Container>
  );
}

export default LoadingSpinner;
