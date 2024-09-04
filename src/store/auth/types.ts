import { APIResponse } from '@/store/types';
import { RequestCodeRequest } from '@proto/auth';

namespace Auth {
    export namespace API {
        export namespace DOT {
            export namespace Get {
                export type Response = APIResponse<{
                    status_code: number;
                    carrier: {
                        active: boolean;
                        dot: number;
                        name: string;
                        address_line_1: string;
                        address_city: string;
                        address_state: string;
                        address_postal_code: string;
                        ein: number;
                        address: string;
                    };
                }>;

                export type Request = number;
            }
        }
    }

    export namespace Redux {
        export namespace Login {
            export type Data = RequestCodeRequest;

            export type InitialState = {
                step: number;
                data: Data;
                loading: boolean;
            };
        }
    }
}

export default Auth;
