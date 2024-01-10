import { currentUser } from '@clerk/nextjs';
import { fetchUser } from '@/lib/actions/user.actions';
import { redirect } from 'next/navigation';
import { fetchThreadById } from '@/lib/actions/thread.actions';

import { Loading } from '@/components/shared/Loading';
import React from 'react';
import dynamic from 'next/dynamic';

// lazy load
const ThreadCard = dynamic(() => import('@/components/cards/ThreadCard'), {
	loading: () => null,
});
const Comment = dynamic(() => import('@/components/forms/Comment'), {
	loading: () => null,
});

export const revalidate = 0;

const Page = async ({ params }: { params: { id: string } }) => {
	// fetch params id
	if (!params.id) return null;
	// fetch current user
	const user = await currentUser();
	if (!user) return null;

	const userInfo = await fetchUser(user.id);
	if (!userInfo?.onboarded) redirect('/onboarding');

	const thread = await fetchThreadById(params.id);

	return (
		<section className='relative'>
			<React.Suspense fallback={<Loading />}>
				<div>
					<ThreadCard
						key={thread._id}
						id={thread._id}
						currentUserId={user.id}
						parentId={thread.parentId}
						content={thread.text}
						author={thread.author}
						community={thread.community}
						createdAt={thread.createdAt}
						comments={thread.children}
					/>
				</div>

				<div className='mt-7'>
					<Comment
						threadId={thread.id}
						currentUserImg={userInfo.image}
						currentUserId={JSON.stringify(userInfo._id)}
					/>
				</div>

				<div className='mt-10'>
					{thread.children.map((childItem: any) => (
						<ThreadCard
							key={childItem._id}
							id={childItem._id}
							currentUserId={user.id}
							parentId={childItem.parentId}
							content={childItem.text}
							author={childItem.author}
							community={childItem.community}
							createdAt={childItem.createdAt}
							comments={childItem.children}
							isComment
						/>
					))}
				</div>
			</React.Suspense>
		</section>
	);
};

export default Page;
