import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createForms} from 'react-redux-form';
import {Dishes} from './dishes';
import {Leaders} from './leaders';
import {Comments} from './comments';
import {Promotions} from './promotions';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { iniitialFeedback } from './files';

export const ConfigureStore = () => {
    const store = createStore(
         combineReducers({
                dishes:Dishes,
                promotions:Promotions,
                comments:Comments,
                leaders:Leaders, 
                ...createForms({
                    feedback: iniitialFeedback
                })
         }),
         applyMiddleware(thunk, logger)
    );

    return store;
}