'use client'

import { useMemo } from 'react'
import { useT } from '@/i18n'

const CONTINENTS: Record<string, { path: string; fill: string; stroke: string }> = {
  northAmerica: { path: 'M120,140 Q130,100 160,80 Q180,70 200,80 Q220,75 240,85 Q260,80 270,100 Q280,120 290,140 Q300,160 310,180 Q320,200 330,220 Q340,240 340,260 Q340,280 330,300 Q320,320 310,340 Q300,360 290,370 Q280,380 270,390 Q260,395 250,400 Q240,405 230,400 Q220,395 210,390 Q200,385 190,380 Q180,375 170,370 Q160,365 150,360 Q140,350 130,340 Q120,320 110,300 Q100,280 95,260 Q90,240 90,220 Q90,200 95,180 Q100,160 110,150 Z', fill: 'rgba(184,134,11,0.04)', stroke: 'rgba(184,134,11,0.1)' },
  southAmerica: { path: 'M300,350 Q310,340 320,345 Q330,350 340,360 Q350,380 355,400 Q358,420 355,440 Q350,460 340,475 Q330,485 320,490 Q310,492 300,488 Q290,480 280,465 Q270,450 265,430 Q260,410 258,390 Q256,370 260,355 Q270,350 290,345 Z', fill: 'rgba(44,110,110,0.03)', stroke: 'rgba(44,110,110,0.1)' },
  europe: { path: 'M420,80 Q430,70 440,72 Q450,74 460,78 Q470,75 480,78 Q490,82 500,88 Q510,92 520,95 Q530,98 540,100 Q550,102 560,105 Q565,110 560,115 Q555,120 545,122 Q535,124 525,125 Q515,126 505,125 Q495,124 485,122 Q475,120 465,118 Q455,116 445,115 Q435,114 430,110 Q425,105 420,100 Q418,95 415,90 Q415,85 420,80 Z', fill: 'rgba(184,134,11,0.04)', stroke: 'rgba(184,134,11,0.1)' },
  africa: { path: 'M440,130 Q460,125 480,130 Q500,135 510,150 Q520,170 525,195 Q530,220 530,245 Q530,270 525,290 Q520,310 510,325 Q500,340 490,350 Q480,355 470,358 Q460,360 450,355 Q440,350 435,335 Q430,315 428,295 Q425,270 425,245 Q425,220 428,200 Q430,180 435,160 Q438,145 440,130 Z', fill: 'rgba(44,110,110,0.03)', stroke: 'rgba(44,110,110,0.1)' },
  asia: { path: 'M480,80 Q520,60 570,50 Q620,45 670,50 Q720,55 760,70 Q800,85 830,105 Q860,125 875,150 Q888,175 890,200 Q892,225 885,250 Q875,270 860,290 Q840,310 815,325 Q790,340 760,350 Q730,358 700,360 Q670,362 640,360 Q610,355 585,345 Q560,330 545,310 Q530,290 520,265 Q510,240 505,215 Q500,190 495,165 Q490,140 485,115 Q482,100 480,80 Z', fill: 'rgba(184,134,11,0.04)', stroke: 'rgba(184,134,11,0.1)' },
  australia: { path: 'M760,370 Q780,365 800,370 Q820,375 835,385 Q850,395 855,410 Q858,425 850,440 Q840,455 825,462 Q810,468 795,468 Q780,468 765,462 Q752,455 745,440 Q740,425 740,410 Q740,395 748,382 Q755,375 760,370 Z', fill: 'rgba(184,134,11,0.03)', stroke: 'rgba(184,134,11,0.1)' },
}

interface CityNode { name: string; flag: string; x: number; y: number }

const CITIES: CityNode[] = [
  { name: 'Yiwu', flag: '🇨🇳', x: 620, y: 210 },
  { name: 'Shanghai', flag: '🇨🇳', x: 640, y: 200 },
  { name: 'Shenzhen', flag: '🇨🇳', x: 610, y: 230 },
  { name: 'Tokyo', flag: '🇯🇵', x: 710, y: 180 },
  { name: 'Seoul', flag: '🇰🇷', x: 680, y: 175 },
  { name: 'Bangkok', flag: '🇹🇭', x: 590, y: 260 },
  { name: 'Singapore', flag: '🇸🇬', x: 590, y: 290 },
  { name: 'Mumbai', flag: '🇮🇳', x: 570, y: 275 },
  { name: 'Dubai', flag: '🇦🇪', x: 530, y: 220 },
  { name: 'Istanbul', flag: '🇹🇷', x: 500, y: 145 },
  { name: 'Moscow', flag: '🇷🇺', x: 530, y: 90 },
  { name: 'London', flag: '🇬🇧', x: 455, y: 105 },
  { name: 'Paris', flag: '🇫🇷', x: 470, y: 115 },
  { name: 'Hamburg', flag: '🇩🇪', x: 485, y: 108 },
  { name: 'Warsaw', flag: '🇵🇱', x: 510, y: 115 },
  { name: 'New York', flag: '🇺🇸', x: 180, y: 130 },
  { name: 'Los Angeles', flag: '🇺🇸', x: 105, y: 165 },
  { name: 'Toronto', flag: '🇨🇦', x: 175, y: 95 },
  { name: 'São Paulo', flag: '🇧🇷', x: 280, y: 350 },
  { name: 'Cairo', flag: '🇪🇬', x: 502, y: 210 },
  { name: 'Lagos', flag: '🇳🇬', x: 480, y: 275 },
  { name: 'Sydney', flag: '🇦🇺', x: 760, y: 400 },
]

const ROUTES: [number, number][] = [
  [0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[0,8],
  [0,9],[0,10],[0,11],[0,12],[0,13],[0,14],[0,15],[0,16],
  [0,17],[0,18],[0,19],[0,20],[0,21],
]

export default function GlobalNetwork() {
  const { t } = useT()

  const routeLines = useMemo(() => ROUTES.map(([from, to], i) => {
    const a = CITIES[from], b = CITIES[to]
    const mx = (a.x+b.x)/2, my = Math.min(a.y,b.y)-30-Math.sin(i*1.5)*20
    return { a, b, d: `M${a.x},${a.y} Q${mx},${my} ${b.x},${b.y}` }
  }), [])

  const stats = [
    { value: '50+', label: t('network.stat1'), icon: '🌍' },
    { value: '200+', label: t('network.stat2'), icon: '🏭' },
    { value: '3000+', label: t('network.stat3'), icon: '📦' },
    { value: '40+', label: t('network.stat4'), icon: '🗣️' },
  ]

  return (
    <section className="network-section section-padding relative overflow-hidden">
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#b8860b]/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#2c6e6e]/6 rounded-full blur-[120px]" />

      <div className="section-container relative z-10">
        <div className="text-center mb-12 gsap-reveal-up">
          <span className="section-badge justify-center">
            <span className="w-6 h-px bg-[#b8860b]/40" />
            {t('network.section')}
            <span className="w-6 h-px bg-[#b8860b]/40" />
          </span>
          <h2 className="section-title gradient-text">{t('network.title')}</h2>
          <p className="section-subtitle mx-auto">{t('network.desc')}</p>
        </div>

        <div className="max-w-6xl mx-auto gsap-reveal-up">
          <div className="bg-white rounded-2xl p-4 md:p-8 border border-gray-100 shadow-sm relative overflow-hidden">
            <svg className="w-full h-auto" viewBox="0 0 1000 500" style={{ maxHeight: '480px' }}>
              {/* Grid */}
              {Array.from({ length: 20 }).map((_, i) => (
                <line key={`h${i}`} x1="0" y1={i*25} x2="1000" y2={i*25} stroke="rgba(0,0,0,0.02)" strokeWidth="0.5" />
              ))}
              {Array.from({ length: 40 }).map((_, i) => (
                <line key={`v${i}`} x1={i*25} y1="0" x2={i*25} y2="500" stroke="rgba(0,0,0,0.02)" strokeWidth="0.5" />
              ))}

              {/* Continents */}
              {Object.entries(CONTINENTS).map(([key, c]) => (
                <path key={key} d={c.path} fill={c.fill} stroke={c.stroke} strokeWidth="0.8" />
              ))}

              {/* Routes */}
              {routeLines.map((route, i) => (
                <g key={i}>
                  <path d={route.d} fill="none" stroke="rgba(184,134,11,0.04)" strokeWidth="3" strokeLinecap="round" />
                  <path d={route.d} fill="none" stroke="rgba(184,134,11,0.12)" strokeWidth="0.8" strokeDasharray="2 4" strokeLinecap="round" />
                  <circle r="2" fill="#b8860b" opacity="0.4">
                    <animateMotion dur={`${4+(i%5)*1.5}s`} repeatCount="indefinite" path={route.d} />
                  </circle>
                </g>
              ))}

              {/* Cities */}
              {CITIES.map((city, i) => {
                const isHub = i === 0
                return (
                  <g key={city.name}>
                    {isHub && (
                      <circle cx={city.x} cy={city.y} r="18" fill="none" stroke="rgba(184,134,11,0.12)" strokeWidth="1">
                        <animate attributeName="r" values="18;24;18" dur="2s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="1;0;1" dur="2s" repeatCount="indefinite" />
                      </circle>
                    )}
                    <circle cx={city.x} cy={city.y} r={isHub?5:2.5} fill={isHub?'#b8860b':'#2c6e6e'} opacity="0.85" />
                    <text x={city.x} y={city.y-(isHub?16:10)} textAnchor="middle"
                      fontSize={isHub?10:7} fill="rgba(90,90,110,0.7)" fontWeight={isHub?600:400}
                      fontFamily="Inter, system-ui, sans-serif">
                      {city.flag} {city.name}
                    </text>
                  </g>
                )
              })}

              {/* Legend */}
              <g transform="translate(20, 20)">
                <rect x="0" y="0" width="120" height="46" rx="8" fill="rgba(255,255,255,0.8)" stroke="rgba(0,0,0,0.04)" strokeWidth="0.5" />
                <circle cx="15" cy="16" r="3.5" fill="#b8860b" />
                <text x="24" y="20" fontSize="8" fill="rgba(100,100,120,0.6)" fontFamily="Inter, system-ui, sans-serif">Hub</text>
                <circle cx="15" cy="34" r="2" fill="#2c6e6e" />
                <text x="24" y="38" fontSize="8" fill="rgba(100,100,120,0.6)" fontFamily="Inter, system-ui, sans-serif">Partner</text>
              </g>
            </svg>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-6">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white rounded-xl p-4 text-center border border-gray-100 shadow-sm">
                <span className="text-xl mb-1 block">{stat.icon}</span>
                <div className="text-xl font-extrabold gradient-text">{stat.value}</div>
                <div className="text-xs text-[#6b6b7b] mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
