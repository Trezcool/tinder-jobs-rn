import { AsyncStorage } from 'react-native';
import { applyMiddleware, compose, createStore } from 'redux';
import { autoRehydrate, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

import reducers from '../reducers';

const store = createStore(
  reducers,
  {},
  compose(
    applyMiddleware(thunk),
    autoRehydrate())
);

persistStore(store, {storage: AsyncStorage, whitelist: ['likedJobs']});

export default store;