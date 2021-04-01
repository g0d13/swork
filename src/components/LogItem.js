import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import React from "react";
import { useNavigate } from "@reach/router";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  cardRoot: {},
  chips: {
    display: "flex",
    gap: "2px",
    marginTop: "10px",
  },
});

const LogItem = ({ log }) => {
  const navigate = useNavigate();
  const classes = useStyles();
  console.log(log);

  return (
    <Card className={classes.cardRoot} variant="outlined">
      <CardActionArea
        onClick={(ev) => {
          navigate(`/log/request/${log.logId}`);
        }}
      >
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            {log.mechanic}
          </Typography>
          <Typography variant="h5">{log.name}</Typography>
          <Box className={classes.chips}>
            {log.categories.map((el) => {
              return (
                <Chip label={el} size="small" variant="outlined" key={el[0]} />
              );
            })}
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default LogItem;