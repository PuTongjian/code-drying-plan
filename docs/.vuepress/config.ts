import { defaultTheme, defineUserConfig } from 'vuepress'
import AutoNavPlugin from '@magicpocket/vuepress-plugin-auto-navbar'

export default defineUserConfig({
	lang: 'zh-CN',
	title: '代码干燥计划',
	description: 'rather do my code',
	head: [
		[
			'link',
			{
				rel: 'icon',
				sizes: '16x16',
				type: 'image/png',
				href: '/images/icon.png',
			}
		]
	],
	theme: defaultTheme({
		repo: 'putongjian',
		docsDir: 'docs',
		locales: {
			'/': {
				navbar: AutoNavPlugin({
					ignoreFolders: ['.vuepress'],
					depth: 2,
					useREADME: true
				}),
				sidebar: 'auto'
			}
		}
	})
})

