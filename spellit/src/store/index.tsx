import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth';
import useReducer from './user';
import matchingReducer from './matching';
import costReducer from './cost';
import attackReducer from './attack';
import playerReducer from './player';
import roomReducer from './room';
import defenseReducere from './defense'

const store = configureStore({
  reducer: {
    auth: authReducer, 
    user: useReducer, 
    matching: matchingReducer,
    player: playerReducer,
    cost: costReducer,
    attack: attackReducer,
    room: roomReducer,
    defense: defenseReducere,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>

