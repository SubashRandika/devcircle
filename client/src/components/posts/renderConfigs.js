import {
	Alert,
	Code,
	Divider,
	Heading,
	Image,
	Link,
	ListItem,
	OrderedList,
	UnorderedList
} from '@chakra-ui/react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

const color = {
	linkColor: '#008cdd'
};

const headerSizes = {
	1: '2xl',
	2: 'xl',
	3: 'lg',
	4: 'md',
	5: 'sm',
	6: 'xs'
};

const renderers = {
	code: ({ language, value }) => (
		<SyntaxHighlighter style={tomorrow} language={language} children={value} />
	),
	heading: ({ level, node, children }) => (
		<Heading
			as={`h${level}`}
			size={headerSizes[`${level}`]}
			children={children}
		/>
	),
	blockquote: ({ node, children }) => (
		<Alert
			variant='left-accent'
			children={children}
			colorScheme='blackAlpha'
			height='2.25rem'
		/>
	),
	link: ({ href, node, children }) => (
		<Link
			children={children}
			href={href}
			isExternal='true'
			color={`${color.linkColor} !important`}
		/>
	),
	linkReference: ({ href, node, children }) => (
		<Link
			children={children}
			href={href}
			isExternal='true'
			color={`${color.linkColor} !important`}
		/>
	),
	inlineCode: ({ node, children }) => <Code children={children} />,
	thematicBreak: () => <Divider orientation='horizontal' />,
	list: ({ children, depth, node, ordered, spread, start }) =>
		ordered ? (
			<OrderedList>{children}</OrderedList>
		) : (
			<UnorderedList>{children}</UnorderedList>
		),
	listItem: ({ children }) => <ListItem>{children}</ListItem>,
	image: ({ src, alt, node, children }) => {
		return (
			<Image
				w='10rem'
				fit='cover'
				src={src}
				fallbackSrc='https://via.placeholder.com/160'
				alt={alt}
			/>
		);
	}
};

export default renderers;
