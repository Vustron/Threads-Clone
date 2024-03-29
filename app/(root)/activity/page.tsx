import { fetchUser, getActivity } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Loading } from '@/components/shared/Loading';
import React from 'react';

const Page = async () => {
	// fetch current user
	const user = await currentUser();
	if (!user) return null;

	const userInfo = await fetchUser(user.id);
	const userData = JSON.parse(JSON.stringify(userInfo));

	if (!userInfo?.onboarded) redirect('/onboarding');

	// fetch activities
	const activity = await getActivity(userData._id);

	return (
		<>
			<h1 className='head-text mb-10'>Activity</h1>

			<React.Suspense fallback={<Loading />}>
				<section className='mt-10 flex flex-col gap-5'>
					{activity.length > 0 ? (
						<>
							{activity.map((activity) => (
								<Link key={activity._id} href={`/thread/${activity.parentId}`}>
									<article className='activity-card'>
										<Image
											src={activity.author.image}
											alt='user_logo'
											width={20}
											height={20}
											className='rounded-full object-cover'
										/>
										<p className='!text-small-regular text-light-1'>
											<span className='mr-1 text-primary-500'>
												{activity.author.name}
											</span>{' '}
											replied to your thread
										</p>
									</article>
								</Link>
							))}
						</>
					) : (
						<p className='!text-base-regular text-light-3'>No activity yet</p>
					)}
				</section>
			</React.Suspense>
		</>
	);
};

export default Page;
