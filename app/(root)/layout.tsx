import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from 'next/font/google';

import '../globals.css';
import dynamic from 'next/dynamic';
import { dark } from '@clerk/themes';
import React from 'react';
import { Loading } from '@/components/shared/Loading';
import { Toaster } from 'sonner';

// lazy load
const Bottombar = dynamic(() => import('@/components/shared/Bottombar'), {
	loading: () => null,
});
const LeftSidebar = dynamic(() => import('@/components/shared/LeftSidebar'), {
	loading: () => null,
});
const Topbar = dynamic(() => import('@/components/shared/Topbar'), {
	loading: () => null,
});
const RightSidebar = dynamic(() => import('@/components/shared/RightSidebar'), {
	loading: () => null,
});

export const metadata = {
	title: 'Threads',
	description: 'A next.js 13 Meta Threads Application',
};

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ClerkProvider
			appearance={{
				baseTheme: dark,
			}}
		>
			<html lang='en'>
				<body className={`${inter.className} custom-scrollbar`}>
					<React.Suspense fallback={<Loading />}>
						<Topbar />

						<main className='flex flex-row'>
							<LeftSidebar />

							<section className='main-container'>
								<Toaster position='top-center' expand={true} richColors />
								<div className='w-full max-w-4xl'>{children}</div>
							</section>

							<RightSidebar />
						</main>

						<Bottombar />
					</React.Suspense>
				</body>
			</html>
		</ClerkProvider>
	);
}
