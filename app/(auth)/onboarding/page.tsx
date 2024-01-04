import { UserButton } from '@clerk/nextjs';

async function Page() {
	return (
		<main>
			<h1 className='head-text'>Onboarding</h1>
			<UserButton afterSignOutUrl='/' />
		</main>
	);
}

export default Page;
