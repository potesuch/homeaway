'use client';

import { useEffect, useState } from "react";

import PropertyListItem from "./PropertyListItem";
import apiService from "@/app/services/apiService";

export type PropertyType = {
    id: string;
    title: string;
    price_per_night: number;
    image: string;
    is_favorite: boolean;
};

interface PropertyListProps {
    host_id?: string;
}

const PropertyList: React.FC<PropertyListProps> = ({
    host_id
}) => {
    const [properties, setProperties] = useState<PropertyType[]>([]);

    const markFavorite = (id: string, is_favorite: boolean) => {
        const tmpProperties = properties.map((property: PropertyType) => {
            if (property.id == id) {
                property.is_favorite = is_favorite;

                if (is_favorite) {
                    console.log('Added to list of favorited properties');
                } else {
                    console.log('Removed from list of favorited properties');
                }
            }

            return property;
        })

        setProperties(tmpProperties)
    }

    const getProperties = async () => {
        let url = '/api/properties/';
    
        if (host_id) {
            url += `?host=${host_id}`;
        }

        const tmpProperties = await apiService.get(url);

        setProperties(tmpProperties);
    };
    
    useEffect(() => {
        getProperties();
    }, []);
    
    return (
        <>
            {properties.map((property) => {
                return (
                    <PropertyListItem 
                        key={property.id}
                        property={property}
                        markFavorite={(is_favorite: boolean) => markFavorite(property.id, is_favorite)}
                    />
                )
            })}
        </>
    );
};

export default PropertyList;
