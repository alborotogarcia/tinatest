import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import { getAllGithubPosts, getAllPosts } from '@/lib/blog'
import { PostType } from '@/types/blog'

type Props = {
	posts: PostType[]
}

export default function Index({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
	return (
		<>
			<Link href="/">
				<a className="m-2 bg-accent-primary hover:bg-accent-secondary text-white font-bold py-2 px-4 rounded">Home</a>
			</Link>
			{posts.map((p) => (
				<article key={p.slug}>
					<header>
						<Link href={`/blog/${p.slug}`} as=""><a>{p.title}</a></Link>
						<p>{p.author} - <time dateTime="{p.date}">{p.date}</time></p>
					</header>
					<p>{p.excerpt}</p>
				</article>
			))}
		</>
	)
}

export const getStaticProps: GetStaticProps<Props> = async function({ preview, previewData }) {
	const fields = [ "title", "date", "author", "excerpt" ] as (keyof PostType)[]
	const posts = preview
		? await getAllGithubPosts(fields, previewData)
		: getAllPosts(fields)
	return {
		props: {
			posts
		}
	}
}
