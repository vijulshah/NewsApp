import { USER_ID } from '../Constants.js';
import { EMAIL_ID } from '../Constants.js';
import { DISPLAY_NAME } from '../Constants.js';
import { PHOTO_URL } from '../Constants.js';

export function setUserId(userId) {

    return {
        type: USER_ID,
        payload: {userId}
    }
}

export function setEmailId(emailId) {
    return {
        type: EMAIL_ID,
        payload: {emailId}
    }
}

export function setDisplayName(displayName) {
    return {
        type: DISPLAY_NAME,
        payload: {displayName}
    }
}

export function setPhotoURL(photoURL) {
    return {
        type: PHOTO_URL,
        payload: {photoURL}
    }
}