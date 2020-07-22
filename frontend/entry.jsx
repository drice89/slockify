//NOTES FOR FUTURE DILLON - most important component is client.jsx go there

import React from "react";
import ReactDOM from "react-dom";
import configureStore from "./store/store";
import Root from "./components/root";

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");
  let store;
  if (window.currentUser) {
    const preloadedState = {
      entities: { conversations: window.currentUser.conversations, users: window.currentUser.users },
      session: {id: window.currentUser.session.id }
    };
    store = configureStore(preloadedState)
    delete window.currentUser;
  } else {
    store = configureStore();
  }

  // window.getState = store.getState;
  // window.dispatch = store.dispatch;
  ReactDOM.render(<Root store={store} />, root);
});