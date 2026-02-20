import { TECH_STACK_ITEMS } from "@/lib/constants"

export function TechStackMarquee() {
  const items = [...TECH_STACK_ITEMS, ...TECH_STACK_ITEMS]

  return (
    <section className="py-16 overflow-hidden">
      <div className="text-center mb-8">
        <p className="text-sm text-zinc-500 uppercase tracking-widest font-medium">Built With</p>
      </div>

      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-zinc-950 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-zinc-950 to-transparent z-10" />

        <div className="flex animate-marquee whitespace-nowrap">
          {items.map((item, i) => (
            <div
              key={`${item}-${i}`}
              className="inline-flex items-center mx-6 px-5 py-2.5 rounded-lg glass text-sm text-zinc-300 font-medium whitespace-nowrap"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
