import { Item } from '@/views/dispatch/orders/main/analytics/utils';
import { renderToString } from 'react-dom/server';

const tooltip = (item: Item, color: string, total: number) =>
    renderToString(
        <div
            style={{
                display: 'flex',
                padding: '8px',
                gap    : '8px'
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div
                    style={{
                        width       : '16px',
                        height      : '16px',
                        borderRadius: '2px',
                        background  : color
                    }}
                />
                <span style={{ fontSize: '11px', color: '#BDBDBD' }}>{item.label}</span>
                <span style={{ fontSize: '12px', fontWeight: 500, color: '#fff' }}>
                    {item.count}
                </span>
            </div>
            <div
                style={{
                    borderRadius  : '16px',
                    padding       : '2px 8px',
                    background    : 'rgba(255, 255, 255, 0.12)',
                    display       : 'flex',
                    alignItems    : 'center',
                    justifyContent: 'center',
                    height        : '20px'
                }}
            >
                <span style={{ fontSize: '9px', fontWeight: 500 }}>
                    {((item.count / total) * 100).toFixed()}%
                </span>
            </div>
        </div>
    );

export default tooltip;
