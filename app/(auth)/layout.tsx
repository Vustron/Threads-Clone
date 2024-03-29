import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import React from 'react';
import { Loading } from '@/components/shared/Loading';

import '../globals.css';

export const metadata: Metadata = {
	title: 'Auth',
	description: 'Generated by create next app',
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
				<body className={`${inter.className} bg-dark-1`}>
					<React.Suspense fallback={<Loading />}>
						<div className='w-full flex justify-center items-center min-h-screen'>
							{children}
						</div>
					</React.Suspense>
				</body>
			</html>
		</ClerkProvider>
	);
}
