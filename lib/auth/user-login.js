import { signIn, useSession } from 'next-auth/react';
import { checkUser } from '../db-util';

export default async function UserLogin() {
    const { data: session } = useSession();

    if (session) {
        checkUser();
    }
}
