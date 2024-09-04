import LoadsTypes from '@/store/dispatch/loads/types';
import {
    IP_Quickbooks_GetCustomersReply_Customer,
    IP_Quickbooks_GetItemsReply_Item,
    IP_Quickbooks_GetVendorsReply_Vendor
} from '@proto/integration_provider_quickbooks';
import SettlementsTypes from '@/store/accounting/settlements/types';
import { BankAccount } from '@proto/bank_accounts';
import { VendorModel_Vendor } from '@proto/models/model_vendor';
import { SettlementTransactionCategoryModel_Category } from '@proto/models/model_settlement.transaction_category';
import { CustomerModel_Customer } from '@proto/models/model_customer';
import { BrokerGetReply_Broker } from '@proto/brokers';
import { TruckModel_Truck } from '@proto/models/model_truck';
import { DriverModel_Driver } from '@proto/models/model_driver';

export interface InvoiceTabData extends LoadsTypes.InvoiceItemCategory {
    quickbooks_id: IP_Quickbooks_GetItemsReply_Item['quickbooksItemId'];
    quickbooks_name: IP_Quickbooks_GetItemsReply_Item['name'];
    quickbooks_desc: IP_Quickbooks_GetItemsReply_Item['description'];
}

export interface CustomerTabData extends CustomerModel_Customer {
    quickbooks_id: IP_Quickbooks_GetCustomersReply_Customer['quickbooksCustomerId'];
    quickbooks_company_name: IP_Quickbooks_GetCustomersReply_Customer['companyName'];
    quickbooks_name: IP_Quickbooks_GetCustomersReply_Customer['displayName'];
}

export interface BrokerTabData extends BrokerGetReply_Broker {
    quickbooks_id: IP_Quickbooks_GetCustomersReply_Customer['quickbooksCustomerId'];
    quickbooks_company_name: IP_Quickbooks_GetCustomersReply_Customer['companyName'];
    quickbooks_name: IP_Quickbooks_GetCustomersReply_Customer['displayName'];
}

export interface VendorTabData extends VendorModel_Vendor {
    quickbooks_id: IP_Quickbooks_GetVendorsReply_Vendor['quickbooksVendorId'];
    quickbooks_company_name: IP_Quickbooks_GetVendorsReply_Vendor['companyName'];
    quickbooks_name: IP_Quickbooks_GetVendorsReply_Vendor['displayName'];
}

export interface DriverTabData extends DriverModel_Driver {
    quickbooks_id: IP_Quickbooks_GetVendorsReply_Vendor['quickbooksVendorId'];
    quickbooks_company_name: IP_Quickbooks_GetVendorsReply_Vendor['companyName'];
    quickbooks_name: IP_Quickbooks_GetVendorsReply_Vendor['displayName'];
}

export interface SettlementTabData extends SettlementTransactionCategoryModel_Category {
    quickbooks_id: IP_Quickbooks_GetItemsReply_Item['quickbooksItemId'];
    quickbooks_name: IP_Quickbooks_GetItemsReply_Item['name'];
}

export type linkedRevenueType = {
    quickbooks_id: string;
    quickbooks_name: string;
};

export interface SettlementRevenueTabData extends SettlementsTypes.RevenueTypes.RevenueType {
    linkedToTotalLoadsAmount: linkedRevenueType | null;
    linkedToFuelAmount: linkedRevenueType | null;
    linkedToTollsAmount: linkedRevenueType | null;
}

export interface BankAccountTabData extends BankAccount {
    quickbooks_id: string;
    quickbooks_name: string;
}

export interface TruckTabData extends TruckModel_Truck {
    quickbooksId: string;
    fullyQualifiedName: string;
    quickbooksName: string;
}
