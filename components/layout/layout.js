import { Fragment } from 'react';
import Header from './header';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { AuthContextProvider } from '@/context/authContext';

const queryClient = new QueryClient();

export default function Layout(props) {
    return (
        <Fragment>
            <QueryClientProvider client={queryClient}>
                {/* <AuthContextProvider> */}
                <Header />
                <main>{props.children}</main>
                {/* </AuthContextProvider> */}
            </QueryClientProvider>
        </Fragment>
    );
}
