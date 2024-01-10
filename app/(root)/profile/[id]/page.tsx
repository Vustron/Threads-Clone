
import { Tabs, TabsList, TabsContent, TabsTrigger } from '@/components/ui/tabs';
import { profileTabs } from '@/constants';
import { fetchUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { Loading } from '@/components/shared/Loading';
import React from 'react';
import dynamic from 'next/dynamic';

// lazy load
const ProfileHeader = dynamic(
	() => import('@/components/shared/ProfileHeader'),
	{
		loading: () => null,
	}
);
const ThreadsTab = dynamic(() => import('@/components/shared/ThreadsTab'), {
	loading: () => null,
});

const Page = async ({ params }: { params: { id: string } }) => {
	// fetch current user
	const user = await currentUser();
	if (!user) return null;

	const userInfo = await fetchUser(params.id);
	const userData = JSON.parse(JSON.stringify(userInfo));

	if (!userInfo?.onboarded) redirect('/onboarding');

	return (
		<React.Suspense fallback={<Loading />}>
		<section>
			<ProfileHeader
				accountId={userData.id}
				authUserId={user.id}
				name={userData.name}
				username={userData.username}
				imgUrl={userData.image}
				bio={userData.bio}
			/>

			<div className='mt-9'>
				<Tabs defaultValue='threads' className='w-full'>
					<TabsList className='tab'>
						{profileTabs.map((tab) => (
							<TabsTrigger key={tab.label} value={tab.value} className='tab'>
								<Image
									src={tab.icon}
									alt={tab.label}
									width={24}
									height={24}
									className='object-contain'
								/>
								<p className='max-sm:hidden'>{tab.label}</p>

								{tab.label === 'Threads' && (
									<p className='ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2'>
										{userData?.threads?.length}
									</p>
								)}
							</TabsTrigger>
						))}
					</TabsList>
					{profileTabs.map((tab) => (
						<TabsContent
							key={`content-${tab.label}`}
							value={tab.value}
							className='w-full text-light-1'
						>
							<ThreadsTab
								currentUserId={user.id}
								accountId={userData.id}
								accountType='User'
							/>
						</TabsContent>
					))}
				</Tabs>
			</div>
		</section>
		</React.Suspense>
	);
};

export default Page;
