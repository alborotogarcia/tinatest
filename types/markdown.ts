type MarkdownBody = string

type MarkdownData = {
	title?: string
	date?: string
	author?: string
	excerpt?: string
}

type MarkdownType = MarkdownData & {
	slug: string
	content?: MarkdownBody
}

export type { MarkdownType, MarkdownData, MarkdownBody }
