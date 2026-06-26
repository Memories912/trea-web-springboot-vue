const fs = require('fs')
const path = require('path')

const files = [
  'ProcessSection', 'ShippingSection', 'ValueAddedServices',
  'WhyUsSection', 'QualityGuarantee', 'ServicesSection',
  'PlanCTA', 'PlansSection', 'FAQSection', 'ContactSection',
  'ProductSection', 'Header', 'LangSwitcher',
]

const src = '/Users/mac08/Desktop/jingsourcing-next/src/components'

for (const name of files) {
  const f = path.join(src, `${name}.tsx`)
  if (!fs.existsSync(f)) continue
  let code = fs.readFileSync(f, 'utf8')

  // Replace motion.div header pattern (initial + whileInView + viewport + className)
  code = code.replace(
    /<motion\.div\s*\n\s*initial=\{\{[^}]+\}\}\s*\n\s*(whileInView|animate)=\{\{[^}]+\}\}\s*\n\s*viewport=\{[\s\S]{0,50}\}\s*\n\s*(className="([^"]*)")>/g,
    (match, _p1, _p2, cls) => {
      if (cls && (cls.includes('text-center') || cls.includes('mb-'))) {
        return `<div className="${cls} reveal-up">`
      }
      return match // keep if no matching class pattern
    }
  )

  // Replace motion.div item pattern (initial + whileInView + transition + className)
  code = code.replace(
    /<motion\.div\s*\n\s*initial=\{\{[^}]+\}\}\s*\n\s*(whileInView|animate)=\{\{[^}]+\}\}\s*\n\s*transition=\{[^}]*\}\s*\n\s*(className="([^"]*)")>/g,
    (match, _p1, _p2, cls) => {
      if (cls) {
        return `<div className="${cls} reveal-up stagger-1">`
      }
      return match
    }
  )

  // Replace motion.div with just initial+animate (for section items with delay)
  code = code.replace(
    /<motion\.div\s*\n\s*initial=\{\{[^}]+\}\}\s*\n\s*(whileInView|animate)=\{\{[^}]+\}\}\s*\n\s*viewport=\{[\s\S]{0,50}\}\s*\n\s*transition=\{[^}]*\}\s*\n\s*(className="([^"]*)")>/g,
    (match, _p1, _p2, cls) => {
      if (cls) return `<div className="${cls} reveal-up">`
      return match
    }
  )

  // Clean up remaining motion.div that just wraps with whileInView
  // Simpler replacement for the most common 2-prop pattern
  code = code.replace(
    /<motion\.div\s+initial=\{\{[^}]{5,50}\}\}\s+(whileInView|animate)=\{\{[^}]{5,50}\}\s+viewport=\{[\s\S]{0,80}\}\s+(className="[^"]*"\s*)>/g,
    (_m, _p1, cls) => `<div ${cls} >`
  )

  fs.writeFileSync(f, code)
  console.log(`✓ ${name}.tsx`)
}

console.log('Done!')
