import Image from "next/image";
import ReservationSideBar from "@/app/components/properties/ReservationSideBar";

const PropertyDetailPage = () => {
    return (
        <main className="max-width-[1500px] mx-auto px-6 pb-6">
            <div className="relative mb-4 w-full h-[64vh] overflow-hidden rounded-xl">
                <Image
                    fill
                    src="/house_1.jpg"
                    className="object-cover w-full h-full"
                    alt="House"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="py-6 pr-6 col-span-3">
                    <h1 className="mb-4 text-4xl">Property name</h1>

                    <span className="mb-6 block text-lg text-gray-600">
                        4 guests - 2 bedrooms - 1 bathroom
                    </span>

                    <hr />

                    <div className="py-6 flex items-center space-x-4">
                        <Image
                            src="/profile_pic.png"
                            width={50}
                            height={50}
                            className="rounded-full"
                            alt="The user name"
                        />
                        <p><strong>John Doe</strong> is your host</p>
                    </div>

                    <hr />

                    <p className="mt-6 text-lg">
                        sdafffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffccvzxczv
                        asdfffffffffffffffffffffcvbxdfbdfgsdgasdg
                    </p>
                </div>
                
                <ReservationSideBar />
            </div>
        </main>
    );
};

export default PropertyDetailPage;
