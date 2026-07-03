import { marqueeItems } from '../data/portfolio'

export default function Marquee() {
  const row = [...marqueeItems, ...marqueeItems]
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {row.map((item, i) => (
          <span className="marquee-item" key={i}>
            {item} <span className="marquee-star">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
