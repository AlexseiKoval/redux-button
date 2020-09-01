import React from 'react';
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";

import DraggableDialog from './component/DraggableDialog'
import ButtonAppBar from './component/ButtonAppBar'
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

let rootReducer = combineReducers({
  obj1: (state = {}, action) => {
    switch (action.type) {
      case 'dispath1':
        return action.data
      default:
        return state
    }
  },
  obj2: (state = {}, action) => {
    switch (action.type) {
      case 'dispath2':
        return action.data
      default:
        return state
    }
  }
});

let store = createStore(rootReducer);

function App() {
  return (

    <Provider store={store}>
      <ButtonAppBar />
      <React.Fragment>
        <CssBaseline />
        <Container fixed>
          <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }}  >
            <div style={{ textAlign: 'center' }}>
              <br />
              <DraggableDialog formDataList={[
                { name: "email", label: "Email", validators: ["required", "isEmail"] },
              ]} namedialog="dialog 1" />
              <br />
              <DraggableDialog formDataList={[
                { name: "email", label: "Email", validators: ["required", "isEmail"] },
                { name: "name", label: "Name", validators: ["required"] },
                { name: "fulname", label: "Full name", validators: ["required"] },
              ]} namedialog="dialog 2" />
              <br />
              <DraggableDialog formDataList={[
                { name: "name", label: "Name", validators: ["required"] },
                { name: "fulname", label: "Full name", validators: ["required"] },
              ]} namedialog="dialog 3" />
              <br />
              <DraggableDialog formDataList={[
                { name: "email", label: "Email", validators: ["required", "isEmail"] },
                { name: "name", label: "Name", validators: ["required"] },
                { name: "fulname", label: "Full name", validators: ["required"] },
                { name: "text", label: "text", validators: ["required"] },
              ]} namedialog="dialog 4" />
            </div>
          </Typography>
        </Container>
      </React.Fragment>
    </Provider>
  );
}

export default App;
