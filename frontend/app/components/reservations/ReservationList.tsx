import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import apiService from "@/app/services/apiService";
import Image from "next/image";
import { PropertyType } from "../properties/PropertyList";

export type ReservationType = {
    id: string;
    property: PropertyType;
    date_in: string;
    date_out: string;
    nights: number;
    total_price: number;
}

const ReservationList = () => {
    const router = useRouter();
    const [reservations, setReservations ] = useState<ReservationType[]>();

    const getReservations = async () => {
        const tmpReservations = await apiService.get('/api/auth/users/me/reservations/');

        setReservations(tmpReservations);
    }

    useEffect(() => {
        getReservations();
    }, [])
    
    return (
        <div className="space-y-4">
        {reservations?.map((reservation) => {
            return (
                <div
                    key={reservation.id}
                    className="p-5 grid grid-cols-1 md:grid-cols-4 gap-4 shadow-md border border-gray-300 rounded-xl"
                >
                    <div className="col-span-1">
                        <div className="relative overflow-hidden aspect-square rounded-xl">
                            <Image
                                fill
                                src={reservation.property.image}
                                className="hover:scale-110 object-cover transition h-full w-full"
                                alt="House"
                            />
                        </div>
                    </div>

                    <div className="col-span-1 md:col-span-3">
                        <h2 className="mb-4 text-xl">{reservation.property.title}</h2>

                        <p className="mb-2"><strong>Check in date:</strong> {reservation.date_in}</p>
                        <p className="mb-2"><strong>Check out date:</strong> {reservation.date_out}</p>
                        <p className="mb-2"><strong>Number of nights:</strong> {reservation.nights}</p>
                        <p className="mb-2"><strong>Total price:</strong> ${reservation.total_price}</p>

                        <div
                            onClick={() => router.push(`/properties/${reservation.property.id}`)}
                            className="mt-10 cursor-pointer py-4 px-6 bg-helio text-white rounded-xl inline-block"
                        >
                            Go to property
                        </div>
                    </div>
                </div>
            )})}
        </div>
    )
}

export default ReservationList;
