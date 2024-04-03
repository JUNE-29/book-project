import { getSession, useSession } from 'next-auth/react';

import SearchBar from '@/components/search/search-bar';

export default function Search({ session }) {
    if (session) {
        return (
            <>
                <SearchBar />
            </>
        );
    }
}

export async function getServerSideProps(context) {
    const session = await getSession(context);
    if (!session) {
        return {
            redirect: {
                destination: '/',
            },
        };
    }

    return {
        props: {
            session: session,
        },
    };
}
