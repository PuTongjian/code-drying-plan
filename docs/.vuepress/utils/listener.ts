import { watch, WatchOptions } from 'chokidar'
import { exec } from 'child_process'


class Listenr {
	private isReady: boolean = false;
	private options: WatchOptions = {
		ignored: new RegExp('.vuepress')
	}
	
	constructor(options?: WatchOptions) {
		if (options) Object.assign(this.options, options)
	}
	
	private onReady(): void {
		this.isReady = true
	}
	
	private onChange(event: string, path: string): void {
		if (this.isReady) {
			exec('pnpm docs:build')
		}
	}
	
	public listen(path: string): void {
		let that = this
		watch(path, this.options).on('ready', () => {
			this.onReady()
		})
		watch(path, this.options).on('all', (event, path) => {
			this.onChange(event, path)
		})
	}
}

let _listenr =  new Listenr()
_listenr.listen('docs')