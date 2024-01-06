'use client';

import React, { ChangeEvent, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { Input } from '../ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
// import { updateUser } from '@/lib/actions/user.actions';
import { CommentValidation } from '@/lib/validations/thread';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';

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
			<form className='comment-form' onSubmit={form.handleSubmit(onSubmit)}>
				<FormField
					control={form.control}
					name='thread'
					render={({ field }) => (
						<FormItem className='flex w-full items-center gap-3'>
							<FormLabel>
								<Image
									src={currentUserImg}
									alt='Profile Image'
									width={48}
									height={48}
									className='rounded-full object-cover'
								/>
							</FormLabel>
							<FormControl className='border-none bg-transparent'>
								<Input
									type={'text'}
									placeholder='Comment...'
									className='no-focus text-light-1 outline-none'
									{...field}
								/>
							</FormControl>
						</FormItem>
					)}
				/>

				<Button type='submit' className='comment-form_btn'>
					Reply
				</Button>
			</form>
		</Form>
	);
};

export default Comment;
