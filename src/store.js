import { createStore, combineReducers, compose } from "redux";
import firebase from "firebase";
import "firebase/firestore";
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import { reduxFirestore, firestoreReducer } from "redux-firestore";

//Reducers
//@todo

const firebaseConfig = {
  apiKey: "AIzaSyClX9FH7a5lkDk8P_DGrLGkW5Vgi_F8T4g",
  authDomain: "reactmanager-54785.firebaseapp.com",
  databaseURL: "https://reactmanager-54785.firebaseio.com",
  projectId: "reactmanager-54785",
  storageBucket: "reactmanager-54785.appspot.com",
  messagingSenderId: "631603608136"
};

//React-redux firebase config
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true
};

//Init firebase instance
firebase.initializeApp(firebaseConfig);
//Init firestore
const firestore = firebase.firestore();
const settings = { /* your settings... */ timestampsInSnapshots: true };
firestore.settings(settings);

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase) // <- needed if using firestore
)(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer // <- needed if using firestore
});

// Creating inital state
const initalState = {};

// Create store
const store = createStoreWithFirebase(
  rootReducer,
  initalState,
  compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
