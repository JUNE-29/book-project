import { getSession, useSession } from 'next-auth/react';

export default function Test(props) {
    const { data: session, status } = useSession();

    if (status === 'authenticated') {
        return (
            <div>
                <p>Welcome, {session.user.name}</p>
            </div>
        );
    } else {
        return (
            <div>
                <p>You are not signed in.</p>
            </div>
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
        props: { session },
    };
}
