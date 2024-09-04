type Props = {
    icon: React.ElementType;
    iconProps?: Record<string, unknown>;
};

const UserIcon = ({
    icon,
    iconProps = {}
}: Props) => {
    const IconTag = icon;

    return <IconTag {...iconProps} />;
};

export default UserIcon;
