'use client';

import { useState } from "react";
import { Range } from "react-date-range";

import useLoginModal from "../hooks/useLoginModal";
import useSearchModal from "../hooks/useSearchModal";
import Modal from "./Modal";
import SelectCountry, { SelectCountryValue } from "../forms/SelectCountry";
import CustomButton from "../forms/CustomButton";
import DatePicker from "../forms/Calendar";

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
}

const SearchModal = () => {
    const searchModal = useSearchModal();
    const [dateRange, setDateRange] = useState<Range>(initialDateRange);
    const [country, setCountry] = useState<SelectCountryValue>();
    const [guests, setGuests] = useState('1');
    const [bedrooms, setBedrooms] = useState('0');
    const [bathrooms, setBathrooms] = useState('0');

    const closeAndSearch = () => {
        searchModal.close();
    }

    const _setDateRange = (selection: Range) => {
        if (searchModal.step === 'checkin') {
            searchModal.open('checkout');
        } else if (searchModal.step === 'checkout') {
            searchModal.open('details');
        }

        setDateRange(selection);
    }

    let content = (<></>)
    
    const contentLocation = (
        <>
            <h2 className="mb-6 text-2xl">Where do you want to go?</h2>

            <SelectCountry
                value={country}
                onChange={(value) => setCountry(value as SelectCountryValue)}
            />

            <div className="mt-6 flex flex-row gap-4">
                <CustomButton
                    label='Check in date ->'
                    type='button'
                    onClick={() => searchModal.open('checkin')}
                />
            </div>
        </>
    )

    const contentCheckin = (
        <>
            <h2 className="mb-6 text-2xl">When do you want to check in?</h2>

            <DatePicker
                value={dateRange}
                onChange={(value) => _setDateRange(value.selection)}
            />

            <div className="mt-6 flex flex-row gap-4">
                <CustomButton
                    label='<- Location'
                    type='button'
                    onClick={() => searchModal.open('location')}
                />

                <CustomButton
                    label='Check out date ->'
                    type='button'
                    onClick={() => searchModal.open('checkout')}
                />
            </div>
        </>
    )

    const contentCheckout = (
        <>
            <h2 className="mb-6 text-2xl">When do you want to check in?</h2>

            <DatePicker
                value={dateRange}
                onChange={(value) => _setDateRange(value.selection)}
            />

            <div className="mt-6 flex flex-row gap-4">
                <CustomButton
                    label='<- Check in date'
                    type='button'
                    onClick={() => searchModal.open('location')}
                />

                <CustomButton
                    label='Details ->'
                    type='button'
                    onClick={() => searchModal.open('details')}
                />
            </div>
        </>
    )

    const contentDetails = (
        <>
            <h2 className="mb-6 text-2xl">Details</h2>

            <div className="space-y-4">
                <div className="space-y-4">
                    <label>Number of guests:</label>
                    <input
                        type="number"
                        min="1"
                        value={guests}
                        placeholder="Number of guests..."
                        onChange={(e) => {setGuests(e.target.value)}}
                        className="w-full h-14 px-4 border border-gray-300 rounded-xl"
                    />
                </div>

                <div className="space-y-4">
                    <label>Number of bedrooms:</label>
                    <input
                        type="number"
                        min="1"
                        value={bedrooms}
                        placeholder="Number of bedrooms..."
                        onChange={(e) => {setBedrooms(e.target.value)}}
                        className="w-full h-14 px-4 border border-gray-300 rounded-xl"
                    />
                </div>

                <div className="space-y-4">
                    <label>Number of bathrooms:</label>
                    <input
                        type="number"
                        min="1"
                        value={bathrooms}
                        placeholder="Number of bathrooms..."
                        onChange={(e) => {setBathrooms(e.target.value)}}
                        className="w-full h-14 px-4 border border-gray-300 rounded-xl"
                    />
                </div>
            </div>

            <div className="mt-6 flex flex-row gap-4">
                <CustomButton
                    label='<- Check out date'
                    type='button'
                    onClick={() => searchModal.open('location')}
                />

                <CustomButton
                    label='Search'
                    type='button'
                    onClick={closeAndSearch}
                />
            </div>  
        </>
    )

    if (searchModal.step === 'location') {
        content = contentLocation;
    } else if (searchModal.step === 'checkin') {
        content = contentCheckin;
    } else if (searchModal.step === 'checkout') {
        content = contentCheckout;
    } else if (searchModal.step === 'details') {
        content = contentDetails;
    }

    
    return (
        <Modal
            label='Search'
            isOpen={searchModal.isOpen}
            close={searchModal.close}
            content={content}
        />
    )
}

export default SearchModal;
