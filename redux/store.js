import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
// import userReducer from './userSlice';
import { UserReducer } from './reducer/userReducer';
import { CartReducer } from './reducer/cartReducer';
import { OrderReducer } from './reducer/orderReducer';
import { ProductReducer } from './reducer/productReducer';
import { WishListReducer } from './reducer/wishlistReducer';
import { homePageReducer } from './reducer/homePageReducer';
import { commonReducer } from './reducer/commonReducer';

const persistConfig = {
    key: 'root',
    storage,
};

const rootReducer = combineReducers({
   // user: userReducer,
    User: UserReducer,
    Cart: CartReducer,
    Order: OrderReducer,
    Product: ProductReducer,
    WishList: WishListReducer,
    Home: homePageReducer,
    Common: commonReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk],
});

export const persistor = persistStore(store);

