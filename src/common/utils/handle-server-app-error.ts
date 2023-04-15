import {Dispatch} from 'redux';
import {appActions} from 'app/app.reducer';
import {ResponseType} from '../types';

/**
 * This function handles errors that may occur when communicating with the server.
 * @param data - response from the server in ResponseType<D> format
 * @param dispatch - function for sending messages in store Redux
 * @param showError - a flag that specifies whether errors should be displayed in the user interface
 */
export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch, showError: boolean = true) => {
    if (showError) {
        dispatch(appActions.setAppError({
            error: data.messages.length
                ? data.messages[0]
                : 'Some error occurred'
        }))
    }
}
