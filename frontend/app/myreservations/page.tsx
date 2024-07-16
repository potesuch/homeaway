'use client';

import useUser from "../components/hooks/useUser";
import ReservationList from "../components/reservations/ReservationList";

const MyReservationsPage = () => {
    const { user } = useUser();
    
    return (
        <main className="max-width-[1500px] mx-auto px-6 pb-6">
            <h1 className="my-6 text-2xl">My reservations</h1>

            {user && 
                <ReservationList />
            }
        </main>
    );
};

export default MyReservationsPage;
