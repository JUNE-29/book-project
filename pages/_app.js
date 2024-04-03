import Layout from '@/components/layout/layout';
import '@/styles/globals.css';
import { SessionProvider } from 'next-auth/react';

// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// const queryClient = new QueryClient();

export default function App({ Component, pageProps, session }) {
    return (
        <SessionProvider session={session}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </SessionProvider>
    );
}
