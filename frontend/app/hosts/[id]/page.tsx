'use client';

import Image from "next/image";

import ContactButton from "@/app/components/ContactButton";
import PropertyList from "@/app/components/properties/PropertyList";
import apiService from "@/app/services/apiService";
import useUser from "@/app/components/hooks/useUser";

const HostDetailPage = async ({params}: {params: {id: string}}) => {
    const { user } = useUser();
    const host = await apiService.get(`/api/auth/users/${params.id}`);
    
    return (
        <main className="max-w-[1500px] mx-auto px-6 pb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <aside className="col-span-1 mb-4">
                    <div className="flex flex-col items-center p-6 rounded-xl border border-gray-300 shadow-xl">
                        <Image
                            src={host.avatar ? host.avatar: '/profile_pic.png'}
                            width={200}
                            height={200}
                            alt={host.name}
                            className="rounded-full"
                        />

                        <h1 className="mt-6 text-2xl">{host.name}</h1>
                        { user &&
                            <ContactButton />
                        }
                    </div>
                </aside>

                <div className="col-span-1 md:col-span-3 pl-0 md:pl-6">
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <PropertyList
                            host_id={host.id}
                        />
                    </div>
                </div>
            </div>
        </main>
    );
};

export default HostDetailPage;
