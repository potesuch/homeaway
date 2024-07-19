'use client';

import { useEffect, useState } from "react";
import format from "date-fns/format";

import PropertyListItem from "./PropertyListItem";
import apiService from "@/app/services/apiService";
import useSearchModal from "../hooks/useSearchModal";

export type PropertyType = {
    id: string;
    title: string;
    price_per_night: number;
    image: string;
    is_favorite: boolean;
};

interface PropertyListProps {
    hostId?: string;
    favorites?: boolean;
}

const PropertyList: React.FC<PropertyListProps> = ({
    hostId,
    favorites
}) => {
    const searchModal = useSearchModal();
    const country = searchModal.query.country
    const checkIn = searchModal.query.checkIn
    const checkOut = searchModal.query.checkOut
    const guests = searchModal.query.guests
    const bedrooms = searchModal.query.bedrooms
    const bathrooms = searchModal.query.bathrooms
    const category = searchModal.query.category
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
        console.log('HOST', hostId);
        let url = '/api/properties/';
    
        if (hostId) {
            url += `?host=${hostId}`;
        } else if (favorites) {
            url += `?is_favorite=true`;
        } else {
            let urlQuery = ''

            if (country) {
                urlQuery += '&country=' + country;
            }
            if (checkIn) {
                urlQuery += '&check_in=' + format(checkIn, 'yyyy-MM-dd');
            }
            if (checkOut) {
                urlQuery += '&check_out=' + format(checkOut, 'yyyy-MM-dd');
            }
            if (guests) {
                urlQuery += '&guests=' + guests;
            }
            if (bedrooms) {
                urlQuery += '&bedrooms=' + bedrooms;
            }
            if (bathrooms) {
                urlQuery += '&bathrooms=' + bathrooms;
            }
            if (category) {
                urlQuery += '&category=' + category;
            }

            if (urlQuery.length) {
                url += '?' + urlQuery.substring(1);
            }
        }

        const tmpProperties = await apiService.get(url);

        setProperties(tmpProperties);
    };
    
    useEffect(() => {
        getProperties();
    }, [searchModal.query]);
    
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
