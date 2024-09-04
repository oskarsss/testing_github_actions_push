/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    DocumentEntitiesGetReply_DocumentEntities_TypesByEntityID,
    DocumentEntitiesGetRequest
} from '@proto/documents';
import { DocumentModel_DocumentEntityType } from '@proto/models/model_document';
import { DocumentsGrpcClient } from '@/@grpcServices/services/app-sevices/documents-services/documents.service';
import { RootState } from '../types';
import { api } from '../api';

export const DOCUMENT_ENTITY_TYPE_MAP: Record<DocumentModel_DocumentEntityType, string> = {
    [DocumentModel_DocumentEntityType.DRIVER]          : 'driver',
    [DocumentModel_DocumentEntityType.TRAILER]         : 'trailer',
    [DocumentModel_DocumentEntityType.TRUCK]           : 'truck',
    [DocumentModel_DocumentEntityType.COMPANY]         : 'company',
    [DocumentModel_DocumentEntityType.CUSTOMER]        : 'customer',
    [DocumentModel_DocumentEntityType.BROKER]          : 'broker',
    [DocumentModel_DocumentEntityType.LOAD]            : 'load',
    [DocumentModel_DocumentEntityType.LOAN]            : 'loan',
    [DocumentModel_DocumentEntityType.VENDOR]          : 'vendor',
    [DocumentModel_DocumentEntityType.PLATE]           : 'plate',
    [DocumentModel_DocumentEntityType.PLATE_COMPANY]   : 'plate_company',
    [DocumentModel_DocumentEntityType.TRAILER_COMPANY] : 'trailer_company',
    [DocumentModel_DocumentEntityType.VEHICLE_WARRANTY]: 'vehicle_warranty',
    [DocumentModel_DocumentEntityType.SERVICE_LOG]     : 'service_log',
    [DocumentModel_DocumentEntityType.UNSPECIFIED]     : ''
};

type DocumentsByEntity = DocumentEntitiesGetReply_DocumentEntities_TypesByEntityID['byEntityId'];

export const getEntitiesDocumentsThunk = createAsyncThunk(
    'document/getEntitiesDocuments',
    async (args: DocumentEntitiesGetRequest, api) => {
        const state = api.getState() as RootState;

        const meta = {
            Authorization: `Bearer ${state.app.token}`,
            company_id   : state.app.company_id
        };

        const data = await DocumentsGrpcClient.documentEntitiesGet(args, { meta });

        return data.response.documentEntities;
    }
);

export const getEntitiesDocumentsByTypeThunk = createAsyncThunk(
    'document/getEntitiesDocumentsByType',
    async (args: { ids: string[]; type: DocumentModel_DocumentEntityType }, api) => {
        api.dispatch(
            getEntitiesDocumentsThunk({
                entities: [
                    {
                        entityIds : args.ids,
                        entityType: args.type
                    }
                ]
            })
        );
    }
);

type InitialState = {
    trailer: string;
    driver: string;
    truck: string;
    broker: string;
    customer: string;
    documentsMap: Record<string, DocumentsByEntity>;
};

const initialState: InitialState = {
    trailer     : '',
    driver      : '',
    broker      : '',
    customer    : '',
    truck       : '',
    documentsMap: {} as Record<string, DocumentsByEntity>
};

const documentsSlice = createSlice({
    name    : 'document',
    initialState,
    reducers: {
        selectDocumentTrailer(state, action) {
            state.trailer = action.payload;
        },
        selectDocumentDriver(state, action) {
            state.driver = action.payload;
        },
        selectDocumentTruck(state, action) {
            state.truck = action.payload;
        },
        selectDocumentBroker: (state, action) => {
            state.broker = action.payload;
        },
        selectDocumentCustomer: (state, action) => {
            state.customer = action.payload;
        }
    },
    extraReducers(builder) {
        builder.addCase(api.util.resetApiState, () => ({ ...initialState }));
        builder.addCase(getEntitiesDocumentsThunk.fulfilled, (state, action) => {
            state.documentsMap = action.payload.reduce(
                (acc, item) => {
                    if (!item.entityDocuments?.byEntityId) return acc;

                    acc[DOCUMENT_ENTITY_TYPE_MAP[item.entityType]] = {
                        ...acc[DOCUMENT_ENTITY_TYPE_MAP[item.entityType]],
                        ...item.entityDocuments.byEntityId
                    };

                    return acc;
                },
                { ...state.documentsMap }
            );
        });
    }
});

export const DocumentsReducer = documentsSlice.reducer;

export const DocumentsActions = documentsSlice.actions;
