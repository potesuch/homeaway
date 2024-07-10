import Image from "next/image";

const Categories = () => {
    return (
        <div className="cursor-pointer pt-3 pb-6 flex items-center space-x-12">
            <div className="pb-2 flex flex-col items-center space-y-2 border-b-2 border-white opacity-60 hover:opacity-100 hover:border-gray-200">
                <Image 
                    src="/category_beach.svg"
                    alt="Category - beach"
                    width={25}
                    height={25}
                />
                <span className="text-sm">Beach</span>
            </div>

            <div className="pb-2 flex flex-col items-center space-y-2 border-b-2 border-white opacity-60 hover:opacity-100 hover:border-gray-200">
                <Image 
                    src="/category_villas.svg"
                    alt="Category - villas"
                    width={25}
                    height={25}
                />
                <span className="text-sm">Villas</span>
            </div>

            <div className="pb-2 flex flex-col items-center space-y-2 border-b-2 border-white opacity-60 hover:opacity-100 hover:border-gray-200">
                <Image 
                    src="/category_cabins.svg"
                    alt="Category - cabins"
                    width={25}
                    height={25}
                />
                <span className="text-sm">Cabins</span>
            </div>

            <div className="pb-2 flex flex-col items-center space-y-2 border-b-2 border-white opacity-60 hover:opacity-100 hover:border-gray-200">
                <Image 
                    src="/category_tiny_homes.svg"
                    alt="Category - tiny homes"
                    width={25}
                    height={25}
                />
                <span className="text-sm">Tiny homes</span>
            </div>
        </div>
    );
};

export default Categories;
