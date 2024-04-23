import { WarningQuote } from '@/components/mdx/BlockQuote'
import { InternalLink } from '@/components/mdx/Links'
import { SupportedLanguages } from '@/types/languages'

export function ScoutInitialisationWarning({
	language,
}: {
	language: SupportedLanguages
}) {
	const link = `/sdks/${language.toLowerCase()}/overview`

	return (
		<WarningQuote>
			The examples in this section assume that you already know how to
			initialise Scout in your {language} applications. If you do not know
			how, or if you would like a refresher, click{' '}
			<InternalLink href={link}>here</InternalLink>.
		</WarningQuote>
	)
}
