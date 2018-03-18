import { applyMiddleware, createStore } from 'redux';
import { autoRehydrate, persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'  // defaults to localStorage for web and AsyncStorage for react-native
import thunk from 'redux-thunk';

import rootReducer from '../reducers';

const persistConfig = {
    storage,
    key: 'root',
    whitelist: ['likedJobs'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export let store = createStore(persistedReducer, {}, applyMiddleware(thunk));
export let persistor = persistStore(store);

// const store = createStore(
//   rootReducer,
//   {},
//   compose(
//     applyMiddleware(thunk),
//     autoRehydrate())
// );

// persistStore(store, {storage: AsyncStorage, whitelist: ['likedJobs']});
//
// export default store;