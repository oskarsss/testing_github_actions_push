/* eslint-disable max-len */
import { useCallback, useEffect, useMemo } from 'react';
import { useForm, useFormContext } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FullDialog from '@/@core/ui-kits/full-dialog';
import Documents from '@/@core/components/documents/Documents';
import { DocumentModel_DocumentEntityType } from '@proto/models/model_document';
import { VendorModel_Type, VendorModel_Vendor } from '@proto/models/model_vendor';
import VendorsGrpcService from '@/@grpcServices/services/vendors.service';
import EditVendorHeaderContent from './components/EditVendorHeader';
import EditVendorFields from './components/EditVendorFields';
import edit_vendor_schema, { FormValues } from './schema';
import { useEditVendorDialog } from './EditVendor';

const defaultValues: FormValues = {
    name              : '',
    type              : VendorModel_Type.COMPANY,
    friendlyName      : '',
    email             : '',
    addressLine1      : '',
    addressLine2      : '',
    addressCity       : '',
    addressState      : '',
    addressPostalCode : '',
    taxId             : '',
    contactName       : '',
    contactEmail      : '',
    contactPhoneNumber: ''
};

export const useEditVendorForm = () => useFormContext<FormValues>();

type Props = {
    vendor: VendorModel_Vendor;
    document_id?: string;
    refetch: () => void;
};

export default function EditVendorForm({
    vendor,
    document_id,
    refetch
}: Props) {
    const editVendorDialog = useEditVendorDialog(true);
    const [updateVendor, { isLoading }] = VendorsGrpcService.useUpdateVendorMutation();

    const dataValues = useMemo(
        () => ({
            name              : vendor.name,
            type              : vendor.type,
            friendlyName      : vendor.friendlyName,
            email             : vendor.email,
            addressLine1      : vendor.addressLine1,
            addressLine2      : vendor.addressLine2,
            addressCity       : vendor.addressCity,
            addressState      : vendor.addressState,
            addressPostalCode : vendor.addressPostalCode,
            taxId             : vendor.taxId,
            contactName       : vendor.contactName,
            contactEmail      : vendor.contactEmail,
            contactPhoneNumber: vendor.contactPhoneNumber
        }),
        [
            vendor.name,
            vendor.type,
            vendor.friendlyName,
            vendor.email,
            vendor.addressLine1,
            vendor.addressLine2,
            vendor.addressCity,
            vendor.addressState,
            vendor.addressPostalCode,
            vendor.taxId,
            vendor.contactName,
            vendor.contactEmail,
            vendor.contactPhoneNumber
        ]
    );

    const save = useCallback(
        (data: FormValues) =>
            updateVendor({
                vendorId: vendor.vendorId,
                ...data
            }),
        [updateVendor, vendor?.vendorId]
    );

    const methods = useForm<FormValues>({
        defaultValues,
        values  : dataValues,
        resolver: yupResolver(edit_vendor_schema)
    });

    const {
        handleSubmit,
        formState: { isDirty }
    } = methods;

    useEffect(() => {
        editVendorDialog.confirmDialog.setDirty(isDirty, {
            confirm_text    : 'common:button.save_and_close',
            delete_text     : 'common:button.close',
            max_width_dialog: '500px',
            onConfirm       : handleSubmit(save),
            onDelete        : () => {}
        });
    }, [isDirty, save]);

    return (
        <FullDialog.Form
            methods={methods}
            save={save}
        >
            <EditVendorHeaderContent
                vendor={vendor}
                isMutationLoading={isLoading}
                onClose={editVendorDialog.close}
            />

            <FullDialog.RowContent>
                <FullDialog.ColumnContent>
                    <EditVendorFields />
                </FullDialog.ColumnContent>

                <Documents
                    entityId={vendor.vendorId}
                    entityType={DocumentModel_DocumentEntityType.VENDOR}
                    title={`${vendor.name}-${vendor.taxId}`}
                    documentId={document_id}

                    // testOptions={{
                    //     documentDropzoneTestId : TestIDs.pages.editVendor.fields.dropDocument,
                    //     addDocumentTestId      : TestIDs.pages.editVendor.buttons.addDocument,
                    //     addDocumentCenterTestId: TestIDs.pages.editVendor.buttons.addDocumentCenter,
                    //     deleteDocumentTestId   : TestIDs.pages.editVendor.buttons.deleteDocumentIcon,
                    //     confirmDeleteDocumentTestId:
                    //         TestIDs.pages.editVendor.buttons.confirmDeleteDocument
                    // }}
                />
            </FullDialog.RowContent>
        </FullDialog.Form>
    );
}
