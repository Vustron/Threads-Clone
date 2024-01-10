import dynamic from 'next/dynamic';
import { fetchUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import { Loading } from '@/components/shared/Loading';
import React from 'react';

const PostThread = dynamic(() => import('@/components/forms/PostThread'), {
	loading: () => null,
});

async function Page() {
	// fetch current user
	const user = await currentUser();
	if (!user) return null;

	const userInfo = await fetchUser(user.id);
	const userData = JSON.parse(JSON.stringify(userInfo));

	if (!userInfo?.onboarded) redirect('/onboarding');

	return (
		<>
			<h1 className='head-text'>Create Thread</h1>;
			<React.Suspense fallback={<Loading />}>
				<PostThread userId={userData._id} />
			</React.Suspense>
		</>
	);
}

export default Page;
