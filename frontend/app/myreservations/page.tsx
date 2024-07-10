import Image from "next/image";

const MyReservationsPage = () => {
    return (
        <main className="max-width-[1500px] mx-auto px-6 pb-6">
            <h1 className="my-6 text-2xl">My reservations</h1>

            <div className="space-y-4">
                <div className="p-5 grid grid-cols-1 md:grid-cols-4 gap-4 shadow-md border border-gray-300 rounded-xl">
                    <div className="col-span-1">
                        <div className="relative overflow-hidden aspect-square rounded-xl">
                            <Image
                                fill
                                src="/house_1.jpg"
                                className="hover:scale-110 object-cover transition h-full w-full"
                                alt="House"
                            />
                        </div>
                    </div>

                    <div className="col-span-1 md:col-span-3">
                        <h2 className="mb-4 text-xl">Property name</h2>

                        <p className="mb-2"><strong>Check in date:</strong> 28/02/2000</p>
                        <p className="mb-2"><strong>Check out date:</strong> 28/03/2000</p>
                        <p className="mb-2"><strong>Number of nights:</strong> 29</p>
                        <p className="mb-2"><strong>Total price:</strong> $200</p>

                        <div className="mt-10 cursor-pointer py-4 px-6 bg-helio text-white rounded-xl inline-block">
                            Go to property
                        </div>
                    </div>
                </div>

                <div className="p-5 grid grid-cols-1 md:grid-cols-4 gap-4 shadow-md border border-gray-300 rounded-xl">
                    <div className="col-span-1">
                        <div className="relative overflow-hidden aspect-square rounded-xl">
                            <Image
                                fill
                                src="/house_1.jpg"
                                className="hover:scale-110 object-cover transition h-full w-full"
                                alt="House"
                            />
                        </div>
                    </div>

                    <div className="col-span-1 md:col-span-3">
                        <h2 className="mb-4 text-xl">Property name</h2>

                        <p className="mb-2"><strong>Check in date:</strong> 28/02/2000</p>
                        <p className="mb-2"><strong>Check out date:</strong> 28/03/2000</p>
                        <p className="mb-2"><strong>Number of nights:</strong> 29</p>
                        <p className="mb-2"><strong>Total price:</strong> $200</p>

                        <div className="mt-10 cursor-pointer py-4 px-6 bg-helio text-white rounded-xl inline-block">
                            Go to property
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default MyReservationsPage;
