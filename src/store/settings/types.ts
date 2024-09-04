import { APIRequestBody, APIResponse } from '@/store/types';
import { ValidationRule } from 'react-hook-form';
import React from 'react';
import TableTypes from '@/@core/components/table/types';
import EntityFilters from '@/@core/components/filters/filter-button/types';
import { GetInvoicesReply_Invoice, GetSubscriptionReply } from '@proto/settings_billing';
import {
    GetIntegrationProvidersReply,
    IntegrationProvider_Drivers_Driver,
    IntegrationProvider_Vehicles_Vehicle
} from '@proto/integrations';
import { IntlMessageKey } from '@/@types/next-intl';
import Documents from '../documents/types';

namespace Settings {
    export type FieldType = {
        label: IntlMessageKey;
        name: string;
        placeholder: IntlMessageKey;
        required: boolean;
        type: string;
        validation: string;
        value: string | string[] | number;
        maxLength?: ValidationRule<number>;
    };

    export type Section = {
        columns: number;
        fields: FieldType[];
        gridArea: string;
        title: IntlMessageKey;
        width: string;
    };

    export type InvoiceItem = GetInvoicesReply_Invoice;

    type Driver = IntegrationProvider_Drivers_Driver;

    export interface ProviderDriverRow extends TableTypes.Row, Driver {
        friendlyEntityId: string;
    }

    type Vehicle = IntegrationProvider_Vehicles_Vehicle;
    export interface ProviderVehicleRow extends Omit<TableTypes.Row, 'entityId'>, Vehicle {
        friendlyEntityId: string;
    }

    export type Provider = GetIntegrationProvidersReply['integrationProviders'][0];

    export type RolesState = {
        filter: {
            page: number;
            per_page: number;
            search: string;
            orderBy: string;
            order: string;
        };
        selected_view_id: string;
        views: Array<{
            columns: unknown[];
        }>;
    };

    export type FilterType = {
        page?: number;
        per_page?: number;
        search?: string;
        orderBy?: string;
        order?: string;
        statuses?: string[];
    };
}

export default Settings;
