import ThreadCard from '@/components/cards/ThreadCard';
import { currentUser } from '@clerk/nextjs';
import { fetchUser } from '@/lib/actions/user.actions';
import { redirect } from 'next/navigation';
import { fetchThreadById } from '@/lib/actions/thread.actions';
import Comment from '@/components/forms/Comment';

const Page = async ({ params }: { params: { id: string } }) => {
	// fetch params id
	if (!params.id) return null;
	// fetch current user
	const user = await currentUser();
	if (!user) return null;

	const userInfo = await fetchUser(user.id);
	const userData = JSON.parse(JSON.stringify(userInfo));
	if (!userInfo?.onboarded) redirect('/onboarding');

	const thread = await fetchThreadById(params.id);

	return (
		<section className='relative'>
			<div>
				<ThreadCard
					key={thread._id}
					id={thread._id}
					currentUserId={user.id || ''}
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
					currentUserImg={user.imageUrl}
					currentUserId={userData._id}
				/>
			</div>
		</section>
	);
};

export default Page;
