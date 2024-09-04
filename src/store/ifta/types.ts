import { APIResponse } from '@/store/types';

namespace Ifta {
    export type State = {
        trucks: {
            search: string;
        };
        stops: {
            search: string;
        };
        totals: {
            search: string;
        };
    };

    export interface SearchType {
        search: string;
    }

    export type Period = {
        id: string;
        name: string;
        year: number;
        start: string;
        end: string;
    };

    export interface Year {
        year: number;
        periods: Period[];
    }

    type States = {
        state: string;
        total_distance: string;
        total_fuel: string;
    }[];

    type Driver = {
        id: string;
        first_name: string;
        middle_name: string;
        last_name: string;
        selfie_thumb_url: string;
    };

    export type Truck = {
        id: string;
        reference_id: string;
        type: string;
        total_distance: string;
        total_fuel: string;
        states: States;
        driver: Driver;
    };

    export type Stop = {
        truck_id: string;
        truck_reference_id: string;
        from_load_id: string;
        from_stop_city: string;
        from_stop_state: string;
        from_stop_at: string;
        end_load_id: string;
        end_stop_city: string;
        end_stop_state: string;
        end_stop_at: string;
        state: string;
        distance: string;
    };

    export type Total = {
        state: string;
        total_distance: string;
        total_fuel: string;
    };

    export namespace API {
        export namespace Get {
            export namespace Periods {
                export type Response = APIResponse<{
                    trucks: Truck[];
                    stops: Stop[];
                    totals: Total[];
                }>;

                export type Request = string | number;
            }

            export namespace Years {
                export type Response = APIResponse<{ years: Year[] }>;

                export type Request = null;
            }
        }
    }
}

export default Ifta;
