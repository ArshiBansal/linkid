import { ProfileLinkItem } from "./ProfileLinkItem";
import { EmptyProfileState } from "./EmptyProfileState";
import { ProfileLinksProps } from "./types/type";

export function ProfileLinks({
    links,
    username,
    isOwner,
    layoutStyle,
}: ProfileLinksProps) {
    const safeLinks = links ?? [];

    if (safeLinks.length === 0) {
        return <EmptyProfileState isOwner={isOwner} />;
    }

    const isGrid = layoutStyle === "GRID";
    const containerClass = isGrid 
        ? "grid grid-cols-2 md:grid-cols-4 gap-4"
        : "space-y-3";

    return (
        <div className={containerClass}>
            {safeLinks.map((link) => (
                <ProfileLinkItem
                    key={link.id}
                    link={link}
                    username={username}
                    layoutStyle={layoutStyle}
                />
            ))}
        </div>
    );
}
