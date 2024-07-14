import Image from "next/image";

interface CategoriesProps {
    dataCategory: string;
    setCategory: (category: string) => void;
}

const Categories: React.FC<CategoriesProps> = ({
    dataCategory,
    setCategory
}) => {
    return (
        <>
            <div className="pt-3 cursor-pointer pb-6 flex items-center space-x-12">
                <div
                    onClick={() => setCategory('Beach')}
                    className={`pb-2 flex flex-col items-center space-y-2 border-b-2 ${dataCategory == 'Beach' ? 'border-gray-800' : 'border-white'} opacity-60 hover:opacity-100 hover:border-gray-200`}
                >
                    <Image 
                        src="/category_beach.svg"
                        alt="Category - beach"
                        width={25}
                        height={25}
                    />
                    <span className="text-sm">Beach</span>
                </div>

                <div
                    onClick={() => setCategory('Villas')}
                    className={`pb-2 flex flex-col items-center space-y-2 border-b-2 ${dataCategory == 'Villas' ? 'border-gray-800' : 'border-white'} opacity-60 hover:opacity-100 hover:border-gray-200`}
                >
                    <Image 
                        src="/category_villas.svg"
                        alt="Category - villas"
                        width={25}
                        height={25}
                    />
                    <span className="text-sm">Villas</span>
                </div>

                <div
                    onClick={() => setCategory('Cabins')}
                    className={`pb-2 flex flex-col items-center space-y-2 border-b-2 ${dataCategory == 'Cabins' ? 'border-gray-800' : 'border-white'} opacity-60 hover:opacity-100 hover:border-gray-200`}
                >
                    <Image 
                        src="/category_cabins.svg"
                        alt="Category - cabins"
                        width={25}
                        height={25}
                    />
                    <span className="text-sm">Cabins</span>
                </div>

                <div
                    onClick={() => setCategory('Tiny homes')}
                    className={`pb-2 flex flex-col items-center space-y-2 border-b-2 ${dataCategory == 'Tiny homes' ? 'border-gray-800' : 'border-white'} opacity-60 hover:opacity-100 hover:border-gray-200`}
                >
                    <Image 
                        src="/category_tiny_homes.svg"
                        alt="Category - tiny homes"
                        width={25}
                        height={25}
                    />
                    <span className="text-sm">Tiny homes</span>
                </div>
            </div>
        </>
    )
}

export default Categories;
