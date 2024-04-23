import slug from 'slug'

// A QuickLink is not visibly rendered on the page.
// It exists in the HTML only to allow navigating to different sections of an article.

export function QuickLink({ id, text }: { id?: string; text: string }) {
	id ??= slug(text)

	return (
		<span
			id={id}
			data-name="quick-link"
			className="invisible !m-0 !h-0 !w-0 absolute"
		>
			{text}
		</span>
	)
}
