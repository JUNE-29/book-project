import { signIn, useSession } from 'next-auth/react';

import MainContent from '@/components/main/main-content';
import { useRouter } from 'next/router';

export default function Home() {
    const { data: session } = useSession();
    const router = useRouter();

    async function logIn() {
        return signIn();
    }

    if (session) {
        router.push('/readBookList', undefined, { shallow: true });
    } else {
        return <MainContent logIn={logIn} />;
    }
}
