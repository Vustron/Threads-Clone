import AccountProfile from '@/components/forms/AccountProfile';
import { currentUser } from '@clerk/nextjs';

async function Page() {
	// init user
	const user = await currentUser();

	// init user info
	const userInfo = {};

	// init user data
	const userData = {
		id: user?.id,
		objectId: userInfo?._id,
		username: userInfo?.username || user?.username,
		name: userInfo?.name || user?.firstName || '',
		bio: userInfo?.bio || '',
		image: userInfo?.image || user.imageURL,
	};

	return (
		<main className='mx-auto flex max-w-3xl flex-col justify-start px-10 py-20'>
			<h1 className='head-text'>Onboarding</h1>
			<p className='mt-3 text-base-regular text-light-2'>
				Complete your profile now to use threads
			</p>

			<section className='mt-9 bg-dark-2 p-10'>
				<AccountProfile user={userData} btnTitle='Continue' />
			</section>
		</main>
	);
}

export default Page;
