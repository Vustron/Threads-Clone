import { fetchUser, fetchUsers, getActivity } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

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
		<section>
			<h1 className='head-text mb-10'>Activity</h1>

			<section className='mt-10 flex flex-col gap-5'>
				{activity.length > 0 ? (
					<>
						{activity.map((activity) => (
							<Link key={activity._id} href={`/thread/${activity.parentId}`}>
								<article className='activity-card'>
									<Image
										src={activity.author.image}
										alt='Profile picture'
										width={20}
										height={20}
										className='rounded-full object-cover'
									/>
								</article>
							</Link>
						))}
					</>
				) : (
					<p>No activity yet</p>
				)}
			</section>
		</section>
	);
};

export default Page;
