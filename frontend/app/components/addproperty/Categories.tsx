import Image from "next/image";
import { useState, useEffect } from "react";

import apiService from "@/app/services/apiService";

interface CategoriesProps {
    dataCategory: string;
    setCategory: (category: string) => void;
}

export type CategoryType = {
    id: string;
    name: string;
    image: string;
}

const Categories: React.FC<CategoriesProps> = ({
    dataCategory,
    setCategory
}) => {
    const [categories, setCategories] = useState<CategoryType[]>([]);

    const getCategories = async () => {
        const tmpCategories = await apiService.get('/api/categories/');

        setCategories(tmpCategories);
    }

    useEffect(() => {
        getCategories();
    }, []);
    
    return (
        <>
            <div className="pt-3 cursor-pointer pb-6 flex items-center space-x-12">
                {categories.map((category) => {
                    return (
                        <div
                            key={category.id}
                            onClick={() => setCategory(category.id)}
                            className={`pb-2 flex flex-col items-center space-y-2 border-b-2 ${dataCategory == category.id ? 'border-gray-800' : 'border-white hover:opacity-100 hover:border-gray-200'} opacity-60`}
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
        </>
    )
}

export default Categories;
