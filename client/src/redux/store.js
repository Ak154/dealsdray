import { configureStore} from '@reduxjs/toolkit'
import {combineReducers} from 'redux';
import { userSlice } from './userSlice';
import { alertsSlice } from './alertSlice';

const rootReducer = combineReducers({
    alerts: alertsSlice.reducer,
    user : userSlice.reducer,
});

const store = configureStore({
    reducer: rootReducer,
})
export default store