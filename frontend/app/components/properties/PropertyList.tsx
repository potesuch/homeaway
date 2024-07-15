'use client';

import { useEffect, useState } from "react";

import PropertyListItem from "./PropertyListItem";
import apiService from "@/app/services/apiService";

export type PropertyType = {
    id: string;
    title: string;
    price_per_night: number;
    image: string;
};

interface PropertyListProps {
    host_id?: string;
}

const PropertyList: React.FC<PropertyListProps> = ({
    host_id
}) => {
    const [properties, setProperties] = useState<PropertyType[]>([]);

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
                    />
                )
            })}
        </>
    );
};

export default PropertyList;
