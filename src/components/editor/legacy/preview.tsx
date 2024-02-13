import { Fragment, ReactNode, } from "react";
import rehypeReact from "rehype-react";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { inter } from "@/lib/fonts";
import { useEditor } from ".";
import * as prod from 'react/jsx-runtime'

// @ts-expect-error: the react types are missing.
const production = {Fragment: prod.Fragment, jsx: prod.jsx, jsxs: prod.jsxs}
interface PreviewProps {
	previewRef: React.MutableRefObject<HTMLDivElement | null>;
}

export function Preview({ previewRef }: PreviewProps) {
	const { content } = useEditor();

	const md = unified()
		.use(remarkParse)
		.use(remarkGfm)
		.use(remarkRehype)
		.use(rehypeReact, production)
		.processSync(content);

	const Content = md.result as ReactNode;

	return (
		<article
			ref={previewRef}
			className={`prose h-full shrink-0 grow-0 basis-1/2 overflow-y-auto overflow-x-hidden pl-3 dark:prose-invert ${inter.className}`}
			role="region"
			aria-label="Preview"
		>
			{Content}
		</article>
	);
}
