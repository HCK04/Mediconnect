import { legacy_createStore } from "redux";
import Adminreducer from "./reducers/AdminReducer";

const store = legacy_createStore(Adminreducer)

export default store