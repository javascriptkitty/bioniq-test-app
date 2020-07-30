import React from "react";
import {
  TextField,
  Button,
  FormGroup,
  FormControl,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";

const emptyBoxes = {
  lessThan: false,
  moreThan: false,
  byName: false,
};

export default function DeleteTask(props) {
  const [selected, setSelected] = React.useState(emptyBoxes);
  const [paramName, setParamName] = React.useState(null);

  const handleChange = (event) => {
    setSelected({ ...emptyBoxes, [event.target.name]: event.target.checked });
  };

  const handleInputChange = (event) => {
    setParamName(event.target.value);
  };

  const { lessThan, moreThan, byName } = selected;

  const deleteSelected = () => {
    let param;
    for (let key in selected) {
      if (selected[key] === true) {
        param = key;
      }
    }
    param = param !== "byName" ? param : paramName;

    props.deleteSelected(param);
    props.closeAddTask();
  };

  const isDisabled =
    (!lessThan && !moreThan && !byName) || (byName && !paramName);

  return (
    <>
      <FormControl component="fieldset">
        <FormGroup>
          {renderBoxes(lessThan, "lessThan", "приоритет < 5", handleChange)}
          {renderBoxes(moreThan, "moreThan", "приоритет > 5", handleChange)}
          <div className="deleteByName">
            {renderBoxes(byName, "byName", "по названию:", handleChange)}

            <TextField onChange={handleInputChange} />
          </div>
        </FormGroup>
      </FormControl>
      <Button
        color="secondary"
        className="deleteBtn"
        variant="contained"
        onClick={deleteSelected}
        disabled={isDisabled}
      >
        удалить
      </Button>
    </>
  );
}
function renderBoxes(checked, name, label, handleChange) {
  return (
    <FormControlLabel
      control={
        <Checkbox checked={checked} onChange={handleChange} name={name} />
      }
      label={label}
    />
  );
}
