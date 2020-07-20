import { USER_ID } from '../Constants.js';
import { EMAIL_ID } from '../Constants.js';
import { DISPLAY_NAME } from '../Constants.js';
import { PHOTO_URL } from '../Constants.js';

const initialState = {
    userId: "",
    emailId: "",
    displayName: "",
    photoURL: ""
}

const SetUserData = ( state = initialState, action ) => {

    switch(action.type)
    {
        case USER_ID:
        {
            return {...state,userId: action.payload.userId };
        };

        case EMAIL_ID:
        {
            return {...state,emailId: action.payload.emailId };
        };

        case DISPLAY_NAME:
        {
            return {...state,displayName: action.payload.displayName };
        };

        case PHOTO_URL:
        {
            return {...state,photoURL: action.payload.photoURL};
        };

        default:
        {
            return { state };
        }
    }
}

export default SetUserData;