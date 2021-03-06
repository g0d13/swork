import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  IconButton,
} from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import React, { useState } from "react";
import { useNavigate } from "@reach/router";
import { makeStyles } from "@material-ui/core/styles";
import { Edit, Delete } from "@material-ui/icons";
import ConfirmDialog from "./ConfirmDialog";
import { deleteLog } from "../api/logsAPI";
import Permission from "./Permission";
import { useAuth } from "../hooks/useAuth";
import { useMutation, useQueryClient } from "react-query";

const useStyles = makeStyles({
  chips: {
    display: "flex",
    gap: "2px",
    marginTop: "10px",
  },
});

const LogItem = ({ log }) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState();
  const userData = useAuth("user");

  const handleClickCard = () => {
    if (JSON.parse(userData).role === "SUPERVISOR") {
      navigate(`/log/request/${log.id}`);
    }
  };
  const queryClient = useQueryClient();

  const onSuccess = () => queryClient.invalidateQueries("logs");
  const deleteMutation = useMutation("logs", (id) => deleteLog(id), {
    onSuccess,
  });

  const handleClickEdit = (event) => {
    event.stopPropagation();
    navigate(`/log/${log.id}`);
  };

  const handleClickDelete = (event) => {
    event.stopPropagation();
    setOpenDialog(true);
  };

  const handleClose = (value) => {
    if (value) {
      deleteMutation.mutate(log.id);
    }
    setOpenDialog(false);
  };

  const actions = (hovered) => (
    <React.Fragment>
      <Permission permission="log:update">
        <IconButton
          color="primary"
          aria-label="settings"
          size="small"
          onClick={handleClickEdit}
        >
          <Edit fontSize="small" />
        </IconButton>
      </Permission>
      <Permission permission="log:delete">
        <IconButton
          color="secondary"
          size="small"
          aria-label="delete"
          onClick={handleClickDelete}
        >
          <Delete fontSize="small" />
        </IconButton>
      </Permission>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <Card onClick={() => handleClickCard()} variant="outlined">
        <CardActionArea component="div">
          <CardHeader
            title={log.name}
            subheader={log?.mechanic?.firstName || "Sin mecanico encargado"}
            action={actions()}
          />
          <CardContent>
            <Box className={classes.chips}>
              {log.categories.length === 0 ? (
                <Chip label={"Sin categorias definidas"} size="small" />
              ) : (
                log.categories.map((el) => (
                  <Chip
                    label={el.name}
                    size="small"
                    variant="outlined"
                    key={el.id}
                  />
                ))
              )}
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
      <ConfirmDialog open={openDialog} onClose={handleClose} />
    </React.Fragment>
  );
};

export default LogItem;
