/* eslint-disable react/no-array-index-key */
import { renderToString } from 'react-dom/server';
import { formatMinutes } from '@/utils/formatting';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type EtaObjType = {
    eta: number;
    state: string;
    stopType: 'pickup' | 'dropoff' | 'pickup_dropoff';
    city: string;
};

type Props =
    | {
          eta: EtaObjType;
          etas?: undefined;
      }
    | { etas: EtaObjType[]; eta?: undefined };

function ETACirclePopup({
    eta,
    etas
}: Props) {
    const { t } = useAppTranslation();
    if (etas) {
        return (
            <div style={{ overflow: 'auto', width: '100%' }}>
                {etas.map((eta, i) => {
                    if (!eta.eta) return null;
                    return (
                        <div
                            key={`${i}_${eta}`}
                            style={{
                                ...(i !== 0 && {
                                    marginTop: '5px'
                                })
                            }}
                        >
                            {eta.stopType && (
                                <span>
                                    <span
                                        style={{
                                            fontWeight  : 500,
                                            fontSize    : '10px',
                                            color       : '#fff',
                                            padding     : '2px 5px',
                                            borderRadius: '5px',
                                            ...(eta.stopType === 'pickup_dropoff' && {
                                                backgroundColor: '#f8a000'
                                            }),
                                            ...(eta.stopType === 'pickup' && {
                                                backgroundColor: '#12B76A'
                                            }),
                                            ...(eta.stopType === 'dropoff' && {
                                                backgroundColor: '#f80000'
                                            })
                                        }}
                                    >
                                        {t(`state_info:stop.type.${eta.stopType}`)}
                                    </span>
                                    &nbsp; - &nbsp;
                                </span>
                            )}
                            <span
                                style={{
                                    fontWeight: 500
                                }}
                            >
                                {`${t('core:basic.load.map.eta')}: `}
                            </span>
                            {formatMinutes(eta.eta, t)} &nbsp;
                            {eta.state && (
                                <span>
                                    - {eta.city}, {eta.state}
                                </span>
                            )}
                        </div>
                    );
                })}
            </div>
        );
    }

    return (
        <div>
            {eta.stopType && (
                <span>
                    <span
                        style={{
                            fontWeight  : 500,
                            fontSize    : '10px',
                            color       : '#fff',
                            padding     : '2px 5px',
                            borderRadius: '5px',
                            ...(eta.stopType === 'pickup_dropoff' && {
                                backgroundColor: '#f8a000'
                            }),
                            ...(eta.stopType === 'pickup' && {
                                backgroundColor: '#12B76A'
                            }),
                            ...(eta.stopType === 'dropoff' && {
                                backgroundColor: '#f80000'
                            })
                        }}
                    >
                        {t(`state_info:stop.type.${eta.stopType}`)}
                    </span>
                    &nbsp; - &nbsp;
                </span>
            )}
            <span
                style={{
                    fontWeight: 500
                }}
            >
                {`${t('core:basic.load.map.eta')}: `}
            </span>
            {formatMinutes(eta.eta, t)} &nbsp;
            {eta.state && (
                <span>
                    - {eta.city}, {eta.state}
                </span>
            )}
        </div>
    );
}

export const getETACirclePopup = (props: Props) => renderToString(<ETACirclePopup {...props} />);
