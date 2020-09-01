import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import { connect } from "react-redux";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

function DraggableDialog(props) {
  const [open, setOpen] = React.useState(false);
  const formDataList = props.formDataList;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    const newFormData = Object.assign({}, props.obj1, {
      [event.target.name]: event.target.value,
    });
    props.dispathObj1(newFormData);
    console.log(props.obj1);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          body: JSON.stringify(props.obj1),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const json = await response.json();
      console.log("Успех:", JSON.stringify(json));
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  return (
    <div>
      <Button
        variant="outlined"
        color={props.color || "primary"}
        onClick={handleClickOpen}
      >
        {props.namedialog}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          {props.namedialog}
        </DialogTitle>
        <DialogContent>
          <ValidatorForm onSubmit={handleSubmit}>
            {formDataList.map((row, index) => (
              <TextValidator
                key={index}
                label={row.label}
                onChange={handleChange}
                name={row.name}
                value={props.obj1[row.name] || ""}
                validators={row.validators}
                errorMessages={[
                  "this field is required",
                  `${row.label} is not valid`,
                ]}
              />
            ))}

            <br />
            <Button autoFocus onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Subscribe
            </Button>
          </ValidatorForm>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default connect(
  (state) => ({
    obj1: state.obj1,
  }),
  (dispath) => ({
    dispathObj1: (obj) => {
      dispath({ type: "dispath1", data: obj });
    },
  })
)(DraggableDialog);
