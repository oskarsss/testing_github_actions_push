import { api } from '@/store/api';
import { Dispatch } from 'redux';

export function InvalidateFuels() {
    return function (dispatch: Dispatch) {
        dispatch(
            api.util.invalidateTags([
                {
                    type: 'fuel',
                    id  : 'LIST'
                }
            ])
        );
    };
}
