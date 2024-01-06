'use client';

import React, { ChangeEvent, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { Input } from '../ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
// import { updateUser } from '@/lib/actions/user.actions';
import { CommentValidation } from '@/lib/validations/thread';
import { usePathname, useRouter } from 'next/navigation';

interface Props {
	threadId: string;
	currentUserImg: string;
	currentUserId: string;
}

const Comment = ({ threadId, currentUserImg, currentUserId }: Props) => {
	// init router
	const router = useRouter();
	// init pathname
	const pathname = usePathname();

	// init data
	const form = useForm<z.infer<typeof CommentValidation>>({
		resolver: zodResolver(CommentValidation),
		defaultValues: {
			thread: '',
		},
	});

	// submit handler
	const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
		console.log(values);
	};

	return (
		<Form {...form}>
			<form
				className='mt-10 flex flex-col justify-start gap-10'
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<FormField
					control={form.control}
					name='thread'
					render={({ field }) => (
						<FormItem className='flex w-full flex-col gap-3'>
							<FormLabel className='text-base-semibold text-light-2'>
								Comment
							</FormLabel>
							<FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1'>
								<Input
									type={'text'}
									placeholder='Comment...'
									className='no-focus text-light-1 outline-none'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type='submit' className='bg-primary-500'>
					Post Thread
				</Button>
			</form>
		</Form>
	);
};

export default Comment;
