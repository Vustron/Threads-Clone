import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from 'next/font/google';

import '../globals.css';
import Bottombar from '@/components/shared/Bottombar';
import LeftSidebar from '@/components/shared/LeftSidebar';
import Topbar from '@/components/shared/Topbar';
import RightSidebar from '@/components/shared/RightSidebar';

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
		<ClerkProvider>
			<html lang='en'>
				<body className={`${inter.className}`}>
					<Topbar />

					<main>
						<LeftSidebar />

						<section className='main-container'>
							<div className='w-full max-w-4xl'>{children}</div>
						</section>

						<RightSidebar />
					</main>

					<Bottombar />
				</body>
			</html>
		</ClerkProvider>
	);
}
