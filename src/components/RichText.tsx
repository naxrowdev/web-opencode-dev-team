interface RichTextProps {
  text: string
}

/**
 * Renders copy that uses backticks as inline-code markers from the copy deck.
 * The text itself is the source of truth; backticks are markup, not content.
 */
export function RichText({ text }: RichTextProps) {
  const parts = text.split('`')

  return (
    <>
      {parts.map((part, index) =>
        index % 2 === 1 ? (
          <code key={index} className="font-mono text-[0.92em] text-foreground">
            {part}
          </code>
        ) : (
          part
        ),
      )}
    </>
  )
}
