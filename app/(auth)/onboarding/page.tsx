import { fetchUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { Loading } from '@/components/shared/Loading';
import React from 'react';
import dynamic from 'next/dynamic';

const AccountProfile = dynamic(
	() => import('@/components/forms/AccountProfile'),
	{
		loading: () => null,
	}
);

async function Page() {
	// init user
	const user = await currentUser();
	if (!user) return null;

	// init user info
	const userInfo = await fetchUser(user.id);
	if (userInfo?.onboarded) redirect('/');

	// init user data
	const userData = {
		id: user.id,
		objectId: userInfo?._id,
		username: userInfo ? userInfo?.username : user.username,
		name: userInfo ? userInfo?.name : user.firstName ?? '',
		bio: userInfo ? userInfo?.bio : '',
		image: userInfo ? userInfo?.image : user.imageUrl,
	};

	return (
		<main className='mx-auto flex max-w-3xl flex-col justify-start px-10 py-20'>
			<h1 className='head-text'>Onboarding</h1>
			<React.Suspense fallback={<Loading />}>
				<p className='mt-3 text-base-regular text-light-2'>
					Complete your profile now to use threads
				</p>

				<section className='mt-9 bg-dark-2 p-10'>
					<AccountProfile user={userData} btnTitle='Continue' />
				</section>
			</React.Suspense>
		</main>
	);
}

export default Page;
