import Image from "next/image";
import { useRouter } from "next/navigation";

import { PropertyType } from "./PropertyList";
import FavoriteButton from "../FavoriteButton";
import useUser from "../hooks/useUser";

interface PropertyProps {
    property: PropertyType;
    markFavorite?: (is_favorite: boolean) => void;
}

const PropertyListItem: React.FC<PropertyProps> = ({
    property,
    markFavorite
}) => {
    const { user } = useUser();
    const router = useRouter();
    
    return (
        <div
            onClick={() => router.push(`/properties/${property.id}`)}
            className="cursor-pointer"
        >
            <div className="relative overflow-hidden aspect-square border rounded-xl">
                <Image
                    fill
                    src={property.image}
                    sizes="(max-width: 768px): 768px, (max-width: 1200px): 768px, 768px"
                    className="hover:scale-110 object-cover transition h-full w-full"
                    alt="House"
                />

                {user && markFavorite &&(
                    <FavoriteButton
                        id={property.id}
                        is_favorite={property.is_favorite}
                        markFavorite={markFavorite}
                    />
                )}
            </div>

            <div className="mt-2">
                <p className="text-lg font-bold">{property.title}</p>
            </div>

            <div className="mt-2">
                <p className="text-sm text-gray-400">
                    <strong>${property.price_per_night}</strong> per night
                </p>
            </div>
        </div>
    );
};

export default PropertyListItem;