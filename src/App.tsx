import { SiteFooter } from './components/SiteFooter'
import { SiteHeader } from './components/SiteHeader'
import { ClosingCta } from './sections/ClosingCta'
import { Hero } from './sections/Hero'
import { Install } from './sections/Install'
import { Memory } from './sections/Memory'
import { Pipeline } from './sections/Pipeline'
import { Problem } from './sections/Problem'
import { Roster } from './sections/Roster'
import { Security } from './sections/Security'
import { Skills } from './sections/Skills'
import { Stack } from './sections/Stack'

export function App() {
  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <SiteHeader />
      <main id="contenido">
        <Hero />
        <Problem />
        <Pipeline />
        <Roster />
        <Stack />
        <Skills />
        <Memory />
        <Security />
        <Install />
        <ClosingCta />
      </main>
      <SiteFooter />
    </>
  )
}
