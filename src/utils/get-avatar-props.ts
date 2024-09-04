import { getPublicURL } from '@/configs/storage';

function stringToColor(userName = '') {
    let hashCode = 0;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < userName.length; i++) {
        // eslint-disable-next-line no-bitwise
        hashCode = userName.charCodeAt(i) + ((hashCode << 5) - hashCode);
    }
    const red = Math.floor((Math.sin(hashCode) + 1) * 127);
    const green = Math.floor((Math.sin(hashCode + 1) + 1) * 127);
    const blue = Math.floor((Math.sin(hashCode + 2) + 1) * 127);
    return `rgb(${red + 128}, ${green + 128}, ${blue + 128})`;
}

export function getAvatarProps(name: string, avatar?: string | null) {
    if (avatar) {
        return {
            alt: name,
            src: getPublicURL(avatar)
        };
    }
    let first_name;
    let last_name;
    if (name && name.includes(' ')) {
        [first_name, last_name] = name.split(' ');
    } else {
        first_name = name ?? '';
        last_name = '';
    }

    return {
        alt: name,
        sx : {
            bgcolor: stringToColor(name),
            color  : '#667085'
        },
        children: `${first_name[0]}${last_name ? last_name[0] : ''}`
    };
}
