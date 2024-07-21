'use client';

import Image from "next/image";
import { useState, useEffect } from "react";

import ReservationSideBar from "@/app/components/properties/ReservationSideBar";
import apiService from "@/app/services/apiService";
import Link from "next/link";
import { PropertyType } from "@/app/components/properties/PropertyList";
import imageLoader from "@/app/lib/image";

const PropertyDetailPage = ({params}: {params: {id: string}}) => {
    const [property, setProperty] = useState<PropertyType>();

    const getProperty = async () => {
        const tmpProperty = await apiService.get(`/api/properties/${params.id}/`);

        setProperty(tmpProperty);
    }

    useEffect(() => {
        getProperty();
    }, [])
    
    return (
        <main className="max-w-[1500px] mx-auto px-6 pb-6">
            {property?.id &&
                <> 
                    <div className="relative mb-4 w-full h-[64vh] overflow-hidden rounded-xl">
                        <Image
                            loader={imageLoader}
                            fill
                            src={property.image}
                            className="object-cover w-full h-full"
                            alt="House"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        <div className="py-6 pr-6 col-span-3">
                            <h1 className="mb-4 text-4xl">{property.name}</h1>

                            <span className="mb-6 block text-lg text-gray-600">
                                {property.guests} guests - {property.bedrooms} bedrooms - {property.bathrooms} bathrooms
                            </span>

                            <hr />

                            <Link
                                href={`/hosts/${property.host.id}`}
                                className="py-6 flex items-center space-x-4"
                            >
                                <Image
                                    loader={imageLoader}
                                    src={property.host.avatar ? property.host.avatar : '/profile_pic.png'}
                                    width={50}
                                    height={50}
                                    className="rounded-full"
                                    alt={property.host.name}
                                />
                                <p><strong>{property.host.name}</strong> is your host</p>
                            </Link>

                            <hr />

                            <p className="mt-6 text-lg break-words">
                                {property.description}
                            </p>
                        </div>
                        
                        <ReservationSideBar
                            property={property}
                        />
                    </div>
                </>
            }
        </main>
    );
};

export default PropertyDetailPage;
