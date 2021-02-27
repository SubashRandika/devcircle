import React from 'react';
import {
	Button,
	Heading,
	InputGroup,
	InputRightElement,
	Stack,
	Textarea,
	Tooltip
} from '@chakra-ui/react';
import { FaEye } from 'react-icons/fa';

const color = {
	primaryColor: '#414f7a',
	secondaryColor: '#f06a63',
	secondaryHover: '#fd4b42',
	white: '#ffffff'
};

function CreatePostForm() {
	const handlePreviewMarkdown = () => {};

	return (
		<Stack direction='column' display='flex' w='100%'>
			<Heading as='h2' size='md'>
				Write something here...
			</Heading>
			<InputGroup>
				<Textarea
					placeholder='Write your tech feed here. This is markdown supported.'
					size='sm'
					rows='15'
				/>
				<Tooltip
					hasArrow
					label='Preview Your Feed'
					aria-label='preview your feed'
				>
					<InputRightElement
						cursor='pointer'
						onClick={handlePreviewMarkdown}
						children={
							<FaEye fontSize='1.5rem' color={`${color.primaryColor}`} />
						}
					/>
				</Tooltip>
			</InputGroup>
			<Button
				alignSelf='flex-end'
				size='md'
				w='8rem'
				mt='1.5rem !important'
				bg={color.secondaryColor}
				color={color.white}
				_hover={{
					bg: `${color.secondaryHover}`
				}}
				_active={{
					bg: `${color.secondaryHover}`
				}}
			>
				Create Feed
			</Button>
		</Stack>
	);
}

export default CreatePostForm;
