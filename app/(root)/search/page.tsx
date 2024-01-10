import dynamic from 'next/dynamic';
import { fetchUser, fetchUsers } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { Loading } from '@/components/shared/Loading';
import React from 'react';

// lazy load
const UserCard = dynamic(() => import('@/components/cards/UserCard'), {
	loading: () => null,
});
const Searchbar = dynamic(() => import('@/components/shared/Searchbar'), {
	loading: () => null,
});
const Pagination = dynamic(() => import('@/components/shared/Pagination'), {
	loading: () => null,
});

const Page = async ({
	searchParams,
}: {
	searchParams: { [key: string]: string | undefined };
}) => {
	// fetch current user
	const user = await currentUser();
	if (!user) return null;

	const userInfo = await fetchUser(user.id);

	if (!userInfo?.onboarded) redirect('/onboarding');

	// fetch users
	const result = await fetchUsers({
		userId: user.id,
		searchString: searchParams.q,
		pageNumber: searchParams?.page ? +searchParams.page : 1,
		pageSize: 25,
	});

	return (
		<section>
			<h1 className='head-text mb-5'>Search</h1>
			<React.Suspense fallback={<Loading />}>
				<Searchbar routeType='search' />

				<div className='mt-14 flex flex-col gap-9'>
					{result.users.length === 0 ? (
						<p className='no-result'>No Result</p>
					) : (
						<>
							{result.users.map((person) => (
								<UserCard
									key={person.id}
									id={person.id}
									name={person.name}
									username={person.username}
									imgUrl={person.image}
									personType={'User'}
								/>
							))}
						</>
					)}
				</div>

				<Pagination
					path='search'
					pageNumber={searchParams?.page ? +searchParams.page : 1}
					isNext={result.isNext}
				/>
			</React.Suspense>
		</section>
	);
};

export default Page;
