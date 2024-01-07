import ProfileHeader from '@/components/shared/ProfileHeader';
import { fetchUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

const Page = async ({ params }: { params: { id: string } }) => {
	// fetch current user
	const user = await currentUser();
	if (!user) return null;

	const userInfo = await fetchUser(params.id);
	const userData = JSON.parse(JSON.stringify(userInfo));

	if (!userInfo?.onboarded) redirect('/onboarding');

	return (
		<section>
			<ProfileHeader
				accountId={userData.id}
				authUserId={user.id}
				name={userData.name}
				username={userData.username}
				imgUrl={userData.image}
				bio={userData.bio}
			/>
		</section>
	);
};

export default Page;
