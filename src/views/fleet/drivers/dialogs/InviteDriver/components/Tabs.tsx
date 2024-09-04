import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import EmailIcon from '@mui/icons-material/Email';
import CommonTabs, { Options } from '@/@core/ui-kits/basic/common-tabs/CommonTabs';

type Props = {
    value: 1 | 2;
    changeInviteType: (value: 1 | 2) => void;
};

const options: Options[] = [
    {
        label: 'fields:phone_number.label',
        icon : <PhoneIphoneIcon color="primary" />,
        value: 2
    },
    {
        label: 'fields:email.label',
        icon : <EmailIcon color="primary" />,
        value: 1
    }
];

export default function Tabs({
    value,
    changeInviteType
}: Props) {
    return (
        <CommonTabs
            value={value}
            onChange={(event, value) => changeInviteType(value)}
            options={options}
            aria_label="invite driver tabs"
            slots={{
                tabsSx: { marginBottom: '20px' }
            }}
        />
    );
}
