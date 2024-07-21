'use client';

import Image from "next/image";
import { useEffect, useState } from "react";

import { CategoryType } from "./addproperty/Categories";
import apiService from "../services/apiService";
import useSearchModal, { SearchQuery } from "./hooks/useSearchModal";

const Categories = () => {
    const searchModal = useSearchModal();
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [categoryName, setCategoryName] = useState<string>('');

    const getCategories = async () => {
        const tmpCategories = await apiService.get('/api/categories/');

        setCategories(tmpCategories);
    }

    useEffect(() => {
        getCategories();
    }, [])

    const _setCategory = (_category: string) => {
        setCategoryName(_category);
        const query: SearchQuery = {
            country: searchModal.query.country,
            checkIn: searchModal.query.checkIn,
            checkOut: searchModal.query.checkOut,
            guests: searchModal.query.guests,
            bedrooms: searchModal.query.bedrooms,
            bathrooms: searchModal.query.bathrooms,
            category: _category
        }

        searchModal.setQuery(query);
    }
    
    return (
        <div className="cursor-pointer pt-3 pb-6 flex flex-wrap items-center gap-x-12 gap-y-4">
            <div
                onClick={() => _setCategory('')}
                className={`pb-2 flex flex-col items-center space-y-2 border-b-2 ${categoryName === '' ? 'border-gray-800' : 'border-white hover:opacity-100 hover:border-gray-200'} opacity-60`}
            >
                <Image 
                    src='/category_all.svg'
                    alt={`Category - all`}
                    width={25}
                    height={25}
                />
                <span className="text-sm">All</span>
            </div>
            {categories.map((category, index) => {
                return (
                    <div
                        key={index} 
                        onClick={() => _setCategory(category.name)}
                        className={`pb-2 flex flex-col items-center space-y-2 border-b-2 ${category.name == categoryName ? 'border-gray-800' : 'border-white hover:opacity-100 hover:border-gray-200'} opacity-60`}
                    >
                        <Image 
                            src={category.image}
                            alt={`Category - ${category.name}`}
                            width={25}
                            height={25}
                        />
                        <span className="text-sm">{category.name}</span>
                    </div>
                )
            })}
        </div>
    );
};

export default Categories;
