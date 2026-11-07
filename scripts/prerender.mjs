import { readFile, writeFile } from 'node:fs/promises'

const templateUrl = new URL('../dist/index.html', import.meta.url)
const serverEntryUrl = new URL('../dist-ssr/entry-server.js', import.meta.url)
const marker = '<div id="root"></div>'

const template = await readFile(templateUrl, 'utf8')

if (!template.includes(marker)) {
  console.error('[prerender] marker <div id="root"></div> not found in dist/index.html')
  process.exit(1)
}

const { render } = await import(serverEntryUrl.href)
const html = render()

if (typeof html !== 'string' || html.length === 0) {
  console.error('[prerender] render() did not return markup')
  process.exit(1)
}

await writeFile(templateUrl, template.replace(marker, `<div id="root">${html}</div>`), 'utf8')

console.log(`[prerender] injected ${html.length} chars into dist/index.html`)
