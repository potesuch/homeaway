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

const PropertyList = () => {
    const [properties, setProperties] = useState<PropertyType[]>([]);
    
    const getProperties = async () => {
        const tmpProperties = await apiService.get('/api/properties/');

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
