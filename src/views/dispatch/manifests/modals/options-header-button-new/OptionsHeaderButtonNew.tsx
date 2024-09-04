import { menuHookFabric } from '@/utils/menu-hook-fabric';
import MenuComponents from '@/@core/ui-kits/menus';
import LoadDraftsGrpcService from '@/@grpcServices/services/loads-drafts-service/load-drafts.service';
import { useNewLoadsDialog } from '@/views/new-loads/NewLoads';
import { useCreateBlankManifest } from '@/views/dispatch/manifests/modals/create-blank-manifest';
import { ManifestsIcon, OrderIcon } from '@/@core/icons/custom-nav-icons/icons';
import React from 'react';

export const useOptionsHeaderButtonNew = menuHookFabric(OptionsHeaderButtonNew);

function OptionsHeaderButtonNew() {
    const menu = useOptionsHeaderButtonNew(true);
    const [createDraft] = LoadDraftsGrpcService.useCreateDraftMutation();

    const createManifestDialog = useCreateBlankManifest();
    const newLoadsDialog = useNewLoadsDialog();

    const createLoad = () => {
        createDraft(true);
        newLoadsDialog.open({});
        menu.close();
    };

    const createManifest = () => {
        createManifestDialog.open({});
        menu.close();
    };

    return (
        <>
            <MenuComponents.Item
                Icon={<ManifestsIcon />}
                text="common:button.new_manifest"
                onClick={createManifest}
                sxMenuItem={{
                    svg: {
                        width : '24px',
                        height: '24px',
                        path  : {
                            fill: (theme) => theme.palette.semantic.foreground.brand.primary
                        }
                    }
                }}
            />
            <MenuComponents.Item
                Icon={<OrderIcon />}
                text="core:basic.page_headers.buttons.new_load"
                onClick={createLoad}
                sxMenuItem={{
                    svg: {
                        width : '24px',
                        height: '24px',
                        path  : {
                            fill: (theme) => theme.palette.semantic.foreground.brand.primary
                        }
                    }
                }}
            />
        </>
    );
}
