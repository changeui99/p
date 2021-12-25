import { combineReducers } from 'redux';
import filter from './filter_reducer';

const rootReducer = combineReducers({
    filter
})

export default rootReducer

export type RootState = ReturnType<typeof rootReducer>