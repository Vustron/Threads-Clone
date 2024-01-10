'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

import { deleteThread } from '@/lib/actions/thread.actions';
import { toast } from 'sonner';

interface Props {
	threadId: string;
	currentUserId: string;
	authorId: string;
	parentId: string | null;
	isComment?: boolean;
}

function DeleteThread({
	threadId,
	currentUserId,
	authorId,
	parentId,
	isComment,
}: Props) {
	const pathname = usePathname();
	const router = useRouter();

	if (currentUserId !== authorId || pathname === '/') return null;

	return (
		<Image
			src='/assets/delete.svg'
			alt='delete'
			width={18}
			height={18}
			className='cursor-pointer object-contain'
			onClick={async () => {
				try {
					await deleteThread(JSON.parse(threadId), pathname);
					if (!parentId || !isComment) {
						router.push('/');
					}
					toast.success('Deleted successfully');
				} catch (error: any) {
					console.log(error);
					toast.error(`Error on deleting thread: ${error.message}`);
				}
			}}
		/>
	);
}

export default DeleteThread;
