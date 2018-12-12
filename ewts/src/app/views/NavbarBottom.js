import React from "react";
import AppBar from "@material-ui/core/AppBar";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import AddIcon from "@material-ui/icons/Add";
import SaveIcon from "@material-ui/icons/Save";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";

const styles = theme => ({
  appBar: {
    top: "auto",
    bottom: 0
  },
  toolbar: {
    alignItems: "right",
    justifyContent: "space-between"
  },
  fabButton: {
    position: "absolute",
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: "0 auto"
  }
});

const NavbarBottom = ({
  classes,
  addButton,
  editButton,
  saveButton,
  onEdit,
  history
}) => {
  console.log(history);
  return (
    <AppBar position="fixed" color="primary" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        {addButton && (
          <Button
            variant="fab"
            color="secondary"
            aria-label="Add"
            className={classes.fabButton}
            onClick={e => history.push("/newEvent")}
          >
            <AddIcon />
          </Button>
        )}
        {editButton && (
          <div>
            <IconButton color="inherit">
              <EditIcon onClick={onEdit} />
            </IconButton>
          </div>
        )}
        {saveButton && (
          <div>
            <IconButton color="inherit">
              <SaveIcon onClick={onEdit} />
            </IconButton>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

NavbarBottom.propTypes = {
  addButton: PropTypes.bool,
  editButton: PropTypes.bool,
  saveButton: PropTypes.bool,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NavbarBottom);
