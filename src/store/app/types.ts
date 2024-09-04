import { APIResponse } from '@/store/types';
import { GetAccountReply } from '@proto/account';

namespace App {
    export type UserTypes = {
        email: string;
        first_name: string;
        id: string;
        last_name: string;
        phone_number: string;
        second_step_auth_enabled: boolean;
        selfie_thumb_url: string | null;
        selfie_url: string | null;
        status: string | null;
    };

    export type Company = GetAccountReply['companies'][0];

    export type PermissionName =
        | 'HOME_PERMISSION'
        | 'LOADS_PERMISSION'
        | 'SCHEDULING_PERMISSION'
        | 'STATS_PERMISSION'
        | 'BROKERS_PERMISSION'
        | 'CUSTOMERS_PERMISSION'
        | 'PLATES_PERMISSION'
        | 'TRUCKS_PERMISSION'
        | 'TRAILERS_PERMISSION'
        | 'DRIVERS_PERMISSION'
        | 'VENDORS_PERMISSION'
        | 'INVOICES_PERMISSION'
        | 'SETTLEMENTS_PERMISSION'
        | 'RECURRING_TRANSACTIONS_PERMISSION'
        | 'TOLLS_PERMISSION'
        | 'FUEL_PERMISSION'
        | 'IFTA_PERMISSION'
        | 'SETTINGS_PERMISSION';

    export namespace API {
        export namespace GetAccount {
            type ChatPilotType = {
                chatpilot_user_id: string;
                chatpilot_token: string;
            };

            export type Response = APIResponse<{
                user: UserTypes;
                companies: Company[];
                chatpilot: ChatPilotType;
                token: string;
            }>;

            export type Request = null;
        }

        export namespace Ping {
            export type Response = APIResponse;

            export type Request = null;
        }
    }

    export namespace Redux {
        export namespace Actions {
            export type SetTokenPayload = string;
        }
    }
}

export default App;
