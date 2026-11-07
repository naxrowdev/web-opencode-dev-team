import { Section } from '../components/Section'
import { copy, memoryBlocks } from '../content/site'

export function Memory() {
  return (
    <Section id="memoria" title={copy.memory.title} lede={copy.memory.lede}>
      <p className="font-mono text-micro text-faint">{copy.memory.flow}</p>
      <div className="mt-6 grid gap-8 sm:grid-cols-2">
        {memoryBlocks.map((block) => (
          <div key={block.title} className="border-t border-border pt-4">
            <h3 className="text-h3 text-foreground">{block.title}</h3>
            <p className="mt-2 font-mono text-micro text-faint">{block.ref}</p>
            <p className="mt-3 max-w-[52ch] text-small text-muted-foreground">{block.body}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}
