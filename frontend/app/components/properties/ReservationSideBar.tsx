'use client';

import { useEffect, useState } from 'react';
import {Range} from 'react-date-range'
import { differenceInDays, eachDayOfInterval, format} from 'date-fns'

import DatePicker from '../forms/Calendar';
import apiService from '@/app/services/apiService';
import useUser from '../hooks/useUser';
import useLoginModal from '../hooks/useLoginModal';
import { useRouter } from 'next/navigation';

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
}

export type Property = {
    id: string;
    guests: number;
    price_per_night:number;
}

interface ReservationSideBarProps {
    property: Property;
}

const ReservationSideBar: React.FC<ReservationSideBarProps> = ({
    property
}) => {
    const router = useRouter();
    const { user } = useUser();
    const loginModal = useLoginModal();
    const [fee, setFee] = useState<number>(0);
    const [nights, setNights] = useState<number>(1);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [dateRange, setDateRange] = useState<Range>(initialDateRange);
    const [bookedDates, setBookedDates] = useState<Date[]>([]);
    const [guests, setGuests] = useState<string>('1');
    const guestsRange = Array.from({ length: property.guests }, (_, index) => index + 1)

    const performBooking = async () => {
        if (user) {
            if (dateRange.startDate && dateRange.endDate) {
                const formData = new FormData();
                formData.append('guests', guests);
                formData.append('date_in', format(dateRange.startDate, 'yyy-MM-dd'));
                formData.append('date_out', format(dateRange.endDate, 'yyy-MM-dd'));
                
                const response = await apiService.post(`/api/properties/${property.id}/book/`, formData)

                if (response.id) {
                    console.log('SUCCESS', response);
                    router.push('/myreservations');
                } else {
                    console.log('ERROR', response);
                }
            }
        } else {
            loginModal.open();
        }
    }

    const _setDateRange = (selection: any) => {
        const newStartDate = new Date(selection.startDate);
        const newEndDate = new Date(selection.endDate);

        if (newEndDate <= newStartDate) {
            newEndDate.setDate(newStartDate.getDate() + 1);
        }

        setDateRange({
            ...dateRange,
            startDate: newStartDate,
            endDate: newEndDate
        })
    }

    const getReservations = async () => {
        const reservations = await apiService.get(`/api/properties/${property.id}/reservations/`)

        let dates: Date[] = [];
        reservations.forEach((reservation: any) => {
            const range = eachDayOfInterval({
                start: new Date(reservation.date_in),
                end: new Date(reservation.date_out)
            });

            dates = [...dates, ...range];
        })

        setBookedDates(dates);
    }

    useEffect(() => {
        getReservations();
        
        if (dateRange.startDate && dateRange.endDate) {
            const dayCount = differenceInDays(
                dateRange.endDate,
                dateRange.startDate
            );

            if (dayCount && property.price_per_night) {
                const _fee = ((dayCount * property.price_per_night) / 100) * 5;

                setFee(_fee);
                setTotalPrice((dayCount * property.price_per_night) + _fee);
                setNights(dayCount);
            } else {
                const _fee = property.price_per_night / 100 * 5

                setFee(_fee);
                setTotalPrice(property.price_per_night + _fee);
                setNights(1);
            }
        }
    }, [dateRange])
    
    return (
        <aside className="p-6 mt-6 col-span-2 rounded-xl border border-gray-300 shadow-xl">
            <h2 className="mb-5 text-2xl">${property.price_per_night} per night</h2>

            <DatePicker
                value={dateRange}
                bookedDates={bookedDates}
                onChange={(value) => _setDateRange(value.selection)}
            />

            <div className="mb-6 p-3 border border-gray-400 rounded-xl">
                <label className="mb-2 block font-bold text-sm">Guests</label>
                <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full -ml-1 text-sm bg-white hover:bg-gray-100 transition"
                >
                    {guestsRange.map(number => {
                        return (
                            <option key={number} value={number}>
                                {number}
                            </option>
                        )
                    })}
                </select>
            </div>

            <div
                onClick={performBooking}
                className="w-full mb-6 py-6 text-center text-white bg-helio rounded-xl hover:bg-helio-dark transition"
            >
                Book
            </div>

            <div className="mb-4 flex justify-between align-center">
                <p>${property.price_per_night} * {nights} nights</p>
                <p>${property.price_per_night * nights}</p>
            </div>

            <div className="mb-4 flex justify-between align-center">
                <p>HomeAway fee</p>
                <p>${fee}</p>
            </div>

            <hr />

            <div className="mt-4 flex justify-between align-center font-bold">
                <p>Total</p>
                <p>${totalPrice}</p>
            </div>
        </aside>
    );
};

export default ReservationSideBar;
