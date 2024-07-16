'use client';

import useUser from "../components/hooks/useUser";

const MyFavoritesPage = () => {
    const { user } = useUser();
    
    if (!user) {
        return (
            <main className="max-w-[1500px] max-auto px-6 py-12">
                <p>You need to be authenticated...</p>
            </main>
        )
    }

    return (
        <main className="max-w-[1500px] max-auto px-6 pb-12">
            <h1 className="my-6 text-2xl">My favorites</h1>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
                {user && (
                    <PropertyList
                        favorites={true}
                    />
                )}
            </div>
        </main>
    )
}

export default MyFavoritesPage;
