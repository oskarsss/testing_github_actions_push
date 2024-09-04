import { hookFabric } from '@/utils/dialog-hook-fabric';
import DialogComponents from '@/@core/ui-kits/common-dialog';

export const useWatchFullDemoDialog = hookFabric(WatchFullDemoDialog, (props) => (
    <DialogComponents.DialogWrapper
        {...props}
        DialogProps={{
            sx: {
                '.MuiPaper-root': {
                    padding        : 0,
                    width          : '575px',
                    height         : '330px',
                    backgroundColor: 'transparent',
                    maxWidth       : 'unset',
                    boxShadow      : 'none',
                    overflow       : 'hidden',
                    justifyContent : 'flex-end',

                    '.MuiButtonBase-root.MuiIconButton-root': {
                        top            : '0px !important',
                        right          : '0px !important',
                        transition     : 'background-color 0.3s',
                        backgroundColor: 'transparent',
                        svg            : {
                            transition: 'color 0.3s',
                            color     : 'transparent'
                        }
                    },

                    '&:hover': {
                        '.MuiButtonBase-root.MuiIconButton-root': {
                            backgroundColor: 'white',
                            svg            : {
                                color: 'black'
                            }
                        }
                    }
                }
            }
        }}
    />
));

type Props = {
    link: string;
};

function WatchFullDemoDialog({ link }: Props) {
    return (
        <iframe
            width="560"
            height="315"
            src={link}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
        />
    );
}
