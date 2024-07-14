'use client';

import Image from "next/image";

import Modal from "./Modal";
import useAddPropertyModal from "../hooks/useAddPropertyModal";
import CustomButton from "../forms/CustomButton";
import { ChangeEvent, useState } from "react";
import Categories from "../addproperty/Categories";
import SelectCountry, { SelectCountryValue } from "../forms/SelectCountry";
import apiService from "@/app/services/apiService";
import { useRouter } from "next/navigation";

const AddPropertyModal = () => {
    const router = useRouter();
    const addPropertyModal = useAddPropertyModal();
    const [currentStep, setCurrentStep] = useState(1);
    const [dataCategory, setDataCategory] = useState('');
    const [dataTitle, setDataTitle] = useState('');
    const [dataDescription, setDataDescription] = useState('');
    const [dataPrice, setDataPrice] = useState('');
    const [dataBedrooms, setDataBedrooms] = useState('');
    const [dataBathrooms, setDataBathrooms] = useState('');
    const [dataGuests, setDataGuests] = useState('');
    const [dataCountry, setDataCountry] = useState<SelectCountryValue>();
    const [dataImage, setDataImage] = useState<File | null>(null);


    const setCategory = (category: string) => {
        setDataCategory(category);
    }

    const setImage = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const tmpImage = event.target.files[0];

            setDataImage(tmpImage);
        }
    }

    const submitForm = async () => {
        console.log(
            dataTitle,
            dataDescription, 
            dataPrice,
            dataBedrooms,
            dataBathrooms,
            dataGuests,
            dataCountry,
            dataImage,
            dataCategory
        )
        if (
            dataCategory &&
            dataTitle &&
            dataDescription &&
            dataPrice &&
            dataBedrooms &&
            dataBathrooms &&
            dataGuests &&
            dataCountry &&
            dataImage
        ) {
            const formData = new FormData();
            formData.append('title', dataTitle);
            formData.append('description', dataDescription);
            formData.append('price_per_night', dataPrice);
            formData.append('bedrooms', dataBedrooms);
            formData.append('bathrooms', dataBathrooms);
            formData.append('guests', dataGuests);
            formData.append('country', dataCountry.label);
            formData.append('country_code', dataCountry.value);
            formData.append('category', dataCategory);
            formData.append('image', dataImage);

            const response = await apiService.post('/api/properties/', formData);

            if (response.success) {
                console.log('SUCCESS', response);

                router.push('/');
                addPropertyModal.close();
            } else {
                console.log('NOT SUCCESS', response);
            }
        }
    }

    const content = (
        <>
            {currentStep == 1 ? (
                <>
                    <h2 className="mb-6 text-2xl">Choose category</h2>

                    <Categories
                        dataCategory={dataCategory}
                        setCategory={(category) => {setCategory(category)}}
                    />
        
                    <CustomButton 
                        label='Next'
                        type='button'
                        onClick={() => setCurrentStep(2)}
                    />
                </>
            ) : currentStep == 2 ? (
                <>
                    <h2 className="mb-6 text-2xl">Describe your place</h2>

                    <div className="pt-3 pb-6 space-y-4">
                        <div className="flex flex-col space-y-2">
                            <label>Title</label>
                            <input
                                type="text"
                                value={dataTitle}
                                onChange={(e) => setDataTitle(e.target.value)}
                                className="w-full p-4 border border-gray-600 rounded-xl"
                            />
                        </div>

                        <div className="flex flex-col space-y-2">
                            <label>Description</label>
                            <textarea
                                value={dataDescription}
                                onChange={(e) => setDataDescription(e.target.value)}
                                className="w-full h-[200px] p-4 border border-gray-600 rounded-xl"
                            ></textarea>
                        </div>
                    </div>

                    <CustomButton
                        label='Previous'
                        type='button'
                        className='mb-2 bg-black hover:bg-gray-800'
                        onClick={() => setCurrentStep(1)}
                    />

                    <CustomButton
                        label='Next'
                        type='button'
                        onClick={() => setCurrentStep(3)}
                    />
                </>
            ) : currentStep == 3 ? (
                <>
                    <h2 className="mb-2 text-2xl">Details</h2>

                    <div className="pt-3 pb-6 space-y-4">
                        <div className="flex flex-col space-y-2">
                            <label>Price per night</label>
                            <input
                                type="number"
                                value={dataPrice}
                                onChange={(e) => setDataPrice(e.target.value)}
                                className="w-full p-4 border border-gray-600 rounded-xl"
                            />
                        </div>

                        <div className="flex flex-col space-y-2">
                            <label>Bedrooms</label>
                            <input
                                type="number"
                                value={dataBedrooms}
                                onChange={(e) => setDataBedrooms(e.target.value)}
                                className="w-full p-4 border border-gray-600 rounded-xl"
                            />
                        </div>

                        <div className="flex flex-col space-y-2">
                            <label>Bathrooms</label>
                            <input
                                type="number"
                                value={dataBathrooms}
                                onChange={(e) => setDataBathrooms(e.target.value)}
                                className="w-full p-4 border border-gray-600 rounded-xl"
                            />
                        </div>

                        <div className="flex flex-col space-y-2">
                            <label>Guests</label>
                            <input
                                type="number"
                                value={dataGuests}
                                onChange={(e) => setDataGuests(e.target.value)}
                                className="w-full p-4 border border-gray-600 rounded-xl"
                            />
                        </div>
                    </div>

                    <CustomButton
                        label='Previous'
                        type='button'
                        className='mb-2 bg-black hover:bg-gray-800'
                        onClick={() => setCurrentStep(2)}
                    />

                    <CustomButton
                        label='Next'
                        type='button'
                        onClick={() => setCurrentStep(4)}
                    />
                </>
            ) : currentStep == 4 ? (
                <>
                    <h2 className="mb-2 text-2xl">Location</h2>

                    <div className="pt-3 pb-6 space-y-4">
                        <SelectCountry 
                            value={dataCountry}
                            onChange={(value) => setDataCountry(value as SelectCountryValue)}
                        />
                    </div>

                    <CustomButton
                        label='Previous'
                        type='button'
                        className='mb-2 bg-black hover:bg-gray-800'
                        onClick={() => setCurrentStep(3)}
                    />

                    <CustomButton
                        label='Next'
                        type='button'
                        onClick={() => setCurrentStep(5)}
                    />
                </>
            ) : (
                <>
                    <h2 className="mb-2 text-2xl">Image</h2>

                    <div className="pt-3 pb-6 space-y-4">
                        <div className="py-4 px-6 bg-gray-600 rounded-xl text-white">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={setImage}
                            />
                        </div>

                        {dataImage && (
                            <div className="w-[200px] h-[150px] relative">
                                <Image
                                    fill
                                    alt='Uploaded image'
                                    src={URL.createObjectURL(dataImage)}
                                    className='w-full h-full object-cover rounded-xl'
                                />
                            </div>
                        )}
                    </div>

                    <CustomButton
                        label='Previous'
                        type='button'
                        className='mb-2 bg-black hover:bg-gray-800'
                        onClick={() => setCurrentStep(4)}
                    />

                    <CustomButton
                        label='Submit'
                        type='button'
                        onClick={() => submitForm()}
                    />
                </>
            )}
        </>
    )
    
    return (
        <Modal
            isOpen={addPropertyModal.isOpen}
            close={addPropertyModal.close}
            label='Add property'
            content={content}
        />
    )
}

export default AddPropertyModal;