import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import rootReducer from '../src/components/reducers'


const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};

const cfgStore = () => {
    const middlewares = [thunk];
    const enhancer = applyMiddleware(...middlewares);
    const persistedReducer = persistReducer(persistConfig, rootReducer);

    // create store
    return createStore(persistedReducer, enhancer);
};

export const persistor = persistStore(cfgStore());

export default cfgStore;