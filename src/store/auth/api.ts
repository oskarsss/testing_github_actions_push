import { AppActions } from '@/store/app/slice';
import { Dispatch } from 'redux';

const AUTHORIZED_USER = {
    ID_TOKEN  : 'id_token',
    COMPANY_ID: 'company_id'
};

export const onSuccessLogin = (token: string) => (dispatch: Dispatch) => {
    dispatch(AppActions.SetToken(token));

    // eslint-disable-next-line max-len
    // This check will set secure to false when app running not from https. This needs to test app in some browsers like iPad safari
    // const secure = process.env.NODE_ENV !== 'development' && process.env.NODE_ENV !== 'test';
    localStorage.setItem(AUTHORIZED_USER.ID_TOKEN, token);
};

export { AUTHORIZED_USER };
