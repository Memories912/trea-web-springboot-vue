'use client'

// framer-motion removed
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useT, langNames } from '@/i18n'
import { productT } from '@/i18n/products'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ParticleBackground from '@/components/ParticleBackground'

export default function CategoryPage() {
  const params = useParams()
  const { t, lang } = useT()
  const allCategories: Record<string, { icon: string; name: string; cn: string; badges: string[]; subtitle: string; subItems: { icon: string; name: string; desc: string }[] }> = {
    'apparel': {
      icon: '👕', name: 'Apparel', cn: '服装',
      badges: ['15% Cheaper than Alibaba', 'OEM/ODM Available', 'Sample Available'],
      subtitle: 'We help customize apparel styles that are very popular in the market. We also offer stock apparel 10%-35% cheaper than Alibaba.',
      subItems: [
        { icon: '👔', name: 'T-Shirts & Tops', desc: 'Cotton, polyester, and blended fabrics. Custom prints and embroidery available.' },
        { icon: '👖', name: 'Pants & Shorts', desc: 'Casual, formal, and athletic styles in various sizes and materials.' },
        { icon: '🧥', name: 'Jackets & Outerwear', desc: 'Waterproof, insulated, and lightweight options for all seasons.' },
        { icon: '👗', name: 'Dresses & Skirts', desc: 'Fashion-forward designs, custom patterns and sizing.' },
      ]
    },
    'furniture': {
      icon: '🪑', name: 'Furniture', cn: '家具',
      badges: ['Factory Direct', 'Custom Design', 'Volume Discount'],
      subtitle: 'We source home and office furniture from experienced manufacturers across China.',
      subItems: [
        { icon: '🛋️', name: 'Sofas & Couches', desc: 'Modern, traditional, and sectional designs. Fabric and leather options.' },
        { icon: '🪑', name: 'Chairs & Stools', desc: 'Office chairs, dining chairs, bar stools — ergonomic and stylish.' },
        { icon: '🛏️', name: 'Beds & Mattresses', desc: 'Platform beds, bunk beds, adjustable beds with memory foam mattresses.' },
        { icon: '📚', name: 'Tables & Desks', desc: 'Coffee tables, dining tables, standing desks, and computer desks.' },
      ]
    },
    'bags-cases': {
      icon: '👜', name: 'Bags & Cases', cn: '箱包',
      badges: ['15% Cheaper than Alibaba', 'OEM/ODM Available', '1 by 1 Quality Inspection'],
      subtitle: 'We Have Abundant Product Categories Ready for You. Whether you want stock or customized products, we can offer them.',
      subItems: [
        { icon: '👜', name: 'Handbags', desc: 'We help customize handbag styles popular on Pinterest. Stock handbags 10%-35% cheaper than Alibaba. PU leather is the most popular material.' },
        { icon: '🎒', name: 'Backpacks', desc: 'Cotton, polyester, PU leather, oxford. We provide private-label solutions to differentiate your product from competitors.' },
        { icon: '🧴', name: 'Toiletry Bags', desc: 'Waterproof materials — nylon, leather, faux leather, or plastic. Popular for travel and daily use.' },
        { icon: '🧳', name: 'Travel Bags', desc: 'Insulated bags for picnics, storage bags for luggage. Polyester, nylon, rattan, oxford fabric.' },
        { icon: '👛', name: 'Pouches', desc: 'Cotton, polyester, mesh, or plastic. Low-cost and high-margin — great for shopping, storage, or protection.' },
        { icon: '💼', name: 'Special Bags', desc: 'First aid bags, bicycle bags, storage bags with specific functions.' },
      ]
    },
    'beauty': {
      icon: '💄', name: 'Beauty', cn: '美妆',
      badges: ['Factory Direct', 'Custom Formulation', 'Global Certifications'],
      subtitle: 'We source cosmetics, skincare, and beauty products from certified manufacturers.',
      subItems: [
        { icon: '💄', name: 'Lip Products', desc: 'Lipsticks, lip glosses, lip balms — custom colors and formulations.' },
        { icon: '👁️', name: 'Eye Makeup', desc: 'Eyeshadows, eyeliners, mascaras with various finishes and shades.' },
        { icon: '🧴', name: 'Skincare', desc: 'Moisturizers, serums, face masks, and cleansers for all skin types.' },
        { icon: '💅', name: 'Nail Products', desc: 'Nail polishes, treatments, and art tools in trending colors.' },
      ]
    },
    'toys': {
      icon: '🧸', name: 'Toys', cn: '玩具',
      badges: ['EN71 Certified', 'CE Marked', 'Custom Designs'],
      subtitle: 'We source toys that meet international safety standards.',
      subItems: [
        { icon: '🧸', name: 'Plush Toys', desc: 'Custom plush toys, teddy bears, and soft dolls with safety certifications.' },
        { icon: '🚗', name: 'RC Toys', desc: 'Remote control cars, drones, and robots for various age groups.' },
        { icon: '🎨', name: 'Educational Toys', desc: 'STEM kits, building blocks, puzzles, and learning games.' },
        { icon: '⚽', name: 'Outdoor Toys', desc: 'Sports toys, water guns, kites, and play equipment.' },
      ]
    },
    'sports': {
      icon: '⚽', name: 'Sports', cn: '运动',
      badges: ['Quality Materials', 'Custom Branding', 'Bulk Discount'],
      subtitle: 'Sports equipment, fitness gear, and outdoor recreation products. We work directly with factories.',
      subItems: [
        { icon: '⚽', name: 'Ball Sports', desc: 'Soccer balls, basketballs, volleyballs — PU, PVC, rubber options.' },
        { icon: '🏋️', name: 'Fitness Equipment', desc: 'Yoga mats, resistance bands, dumbbells, and home gym sets.' },
        { icon: '🏊', name: 'Water Sports', desc: 'Swimming goggles, snorkeling gear, inflatable boats.' },
        { icon: '🎯', name: 'Indoor Games', desc: 'Table tennis, badminton sets, dart boards, and game tables.' },
      ]
    },
    'home-supplies': {
      icon: '🏠', name: 'Home Supplies', cn: '家居',
      badges: ['Trending Designs', 'Quality Tested', 'Fast Shipping'],
      subtitle: 'Home decor, kitchenware, and daily essentials sourced from experienced factories.',
      subItems: [
        { icon: '🪞', name: 'Home Decor', desc: 'Wall art, vases, candles, photo frames, and decorative items.' },
        { icon: '🍳', name: 'Kitchenware', desc: 'Cookware sets, utensils, food storage, and baking tools.' },
        { icon: '🧺', name: 'Storage Solutions', desc: 'Baskets, organizers, boxes, and shelving systems.' },
        { icon: '🛏️', name: 'Bedding', desc: 'Bed sheets, pillow cases, comforters, and mattress protectors.' },
      ]
    },
    'garden-tools': {
      icon: '🔧', name: 'Garden & Tools', cn: '园艺工具',
      badges: ['Durable Materials', 'Ergonomic Design', 'Warranty'],
      subtitle: 'Gardening tools, hardware, and DIY equipment for home and professional use.',
      subItems: [
        { icon: '🌿', name: 'Garden Tools', desc: 'Shovels, pruners, watering cans, and hose sets.' },
        { icon: '🪴', name: 'Planters', desc: 'Ceramic, plastic, and wooden planters for indoor and outdoor use.' },
        { icon: '🔨', name: 'DIY Tools', desc: 'Hammer sets, screwdriver kits, measuring tools, and toolboxes.' },
        { icon: '🚿', name: 'Outdoor Equipment', desc: 'Pressure washers, water pumps, and cleaning equipment.' },
      ]
    },
    'electronics': {
      icon: '🔌', name: 'Electronics', cn: '电子产品',
      badges: ['CE/FCC/ROHS', 'Factory Inspected', 'Custom OEM'],
      subtitle: 'Consumer electronics, accessories, and smart devices from quality manufacturers.',
      subItems: [
        { icon: '🎧', name: 'Audio', desc: 'Bluetooth earphones, speakers, headphones with premium sound quality.' },
        { icon: '🔋', name: 'Chargers & Cables', desc: 'Fast chargers, data cables, power banks, and wireless charging pads.' },
        { icon: '⌚', name: 'Wearables', desc: 'Smart watches, fitness trackers, and health monitoring devices.' },
        { icon: '📱', name: 'Phone Accessories', desc: 'Cases, screen protectors, stands, and selfie sticks.' },
      ]
    },
    'pet-supplies': {
      icon: '🐾', name: 'Pet Supplies', cn: '宠物用品',
      badges: ['Safe Materials', 'Pet-friendly Design', 'Custom Options'],
      subtitle: 'Everything for your furry friends — from food to toys to grooming tools.',
      subItems: [
        { icon: '🦴', name: 'Pet Toys', desc: 'Chew toys, fetch toys, interactive puzzles, and plush toys.' },
        { icon: '🛏️', name: 'Pet Beds', desc: 'Comfortable beds, cushions, and nesting options for dogs and cats.' },
        { icon: '🎒', name: 'Pet Carriers', desc: 'Travel carriers, backpacks, and car seats for pets.' },
        { icon: '🪥', name: 'Grooming', desc: 'Brushes, nail clippers, shampoo, and grooming kits.' },
      ]
    },
    'mother-kids': {
      icon: '👶', name: 'Mother & Kids', cn: '母婴',
      badges: ['Baby-safe Materials', 'EN71 Certified', 'BPA Free'],
      subtitle: 'Safe and high-quality products for mothers and children.',
      subItems: [
        { icon: '🍼', name: 'Baby Feeding', desc: 'Bottles, pacifiers, sippy cups, and baby food makers.' },
        { icon: '👶', name: 'Baby Gear', desc: 'Strollers, carriers, high chairs, and baby monitors.' },
        { icon: '🧸', name: 'Kids Toys', desc: 'Age-appropriate toys that promote learning and development.' },
        { icon: '👗', name: 'Kids Clothing', desc: 'Comfortable and stylish clothing for babies and toddlers.' },
      ]
    },
    'hardware': {
      icon: '⚙️', name: 'Hardware', cn: '五金',
      badges: ['Industrial Grade', 'Bulk Pricing', 'Custom Specs'],
      subtitle: 'Hardware tools, fasteners, and industrial supplies from Chinese manufacturers.',
      subItems: [
        { icon: '🔩', name: 'Fasteners', desc: 'Screws, nuts, bolts, washers, and rivets in various sizes and materials.' },
        { icon: '🔒', name: 'Locks & Security', desc: 'Door locks, padlocks, cabinet locks, and security hardware.' },
        { icon: '🚪', name: 'Door Hardware', desc: 'Hinges, handles, door closers, and sliding door systems.' },
        { icon: '⚙️', name: 'Tools', desc: 'Wrenches, pliers, screwdrivers, and tool sets for professionals.' },
      ]
    },
    'office-supplies': {
      icon: '📎', name: 'Office Supplies', cn: '办公',
      badges: ['Bulk Discount', 'Custom Branding', 'Fast Delivery'],
      subtitle: 'Stationery, office equipment, and organizational products.',
      subItems: [
        { icon: '✏️', name: 'Writing', desc: 'Pens, pencils, markers, highlighters, and notebooks.' },
        { icon: '📋', name: 'Organization', desc: 'Folders, binders, file organizers, and desk accessories.' },
        { icon: '🖨️', name: 'Office Equipment', desc: 'Shredders, laminators, binding machines, and accessories.' },
        { icon: '🎨', name: 'Art Supplies', desc: 'Paints, brushes, canvases, and craft materials.' },
      ]
    },
    'automotive': {
      icon: '🚗', name: 'Automotive', cn: '汽车用品',
      badges: ['OEM Quality', 'Durable', 'Custom Fit'],
      subtitle: 'Car accessories, maintenance tools, and replacement parts.',
      subItems: [
        { icon: '🚗', name: 'Car Accessories', desc: 'Seat covers, floor mats, steering wheel covers, and phone mounts.' },
        { icon: '🔧', name: 'Maintenance', desc: 'Car cleaning kits, wax, polish, and detailing tools.' },
        { icon: '💡', name: 'Lighting', desc: 'LED headlights, interior lights, fog lights, and light bars.' },
        { icon: '🔋', name: 'Battery & Chargers', desc: 'Car battery chargers, jump starters, and power inverters.' },
      ]
    },
    'industrial': {
      icon: '🏭', name: 'Industrial', cn: '工业',
      badges: ['Heavy Duty', 'Safety Certified', 'Factory Audited'],
      subtitle: 'Industrial equipment, safety gear, and MRO supplies.',
      subItems: [
        { icon: '🪖', name: 'Safety Gear', desc: 'Hard hats, safety glasses, gloves, vests, and protective clothing.' },
        { icon: '🔦', name: 'Work Lights', desc: 'LED work lights, floodlights, and portable lighting solutions.' },
        { icon: '🧹', name: 'Cleaning Equipment', desc: 'Industrial vacuums, scrubbers, floor cleaners, and accessories.' },
        { icon: '📦', name: 'Storage', desc: 'Industrial shelving, bins, containers, and warehouse equipment.' },
      ]
    },
    'packaging': {
      icon: '📦', name: 'Packaging', cn: '包装',
      badges: ['Custom Design', 'Small MOQ', 'Eco-friendly Options'],
      subtitle: 'Custom boxes, bags, labels, and packaging materials for your products.',
      subItems: [
        { icon: '📦', name: 'Boxes', desc: 'Corrugated boxes, cardboard boxes, gift boxes, and rigid boxes.' },
        { icon: '🛍️', name: 'Bags', desc: 'Poly bags, paper bags, shopping bags, and ziplock bags.' },
        { icon: '🏷️', name: 'Labels', desc: 'Custom labels, stickers, hang tags, and barcode labels.' },
        { icon: '📋', name: 'Packaging Inserts', desc: 'Foam, dividers, inserts, and protective packaging materials.' },
      ]
    },
    'outdoors': {
      icon: '⛺', name: 'Outdoors', cn: '户外',
      badges: ['Durable Materials', 'Weather Resistant', 'Lightweight'],
      subtitle: 'Camping gear, hiking equipment, and outdoor adventure products.',
      subItems: [
        { icon: '⛺', name: 'Camping Gear', desc: 'Tents, sleeping bags, camping stoves, and lanterns.' },
        { icon: '🎒', name: 'Hiking', desc: 'Backpacks, hiking poles, water bottles, and hydration packs.' },
        { icon: '🪑', name: 'Outdoor Furniture', desc: 'Folding chairs, tables, hammocks, and picnic sets.' },
        { icon: '🔦', name: 'Outdoor Tools', desc: 'Flashlights, multi-tools, compasses, and survival gear.' },
      ]
    },
    'jewelry': {
      icon: '💍', name: 'Jewelry', cn: '珠宝',
      badges: ['Fashion Forward', 'Custom Designs', 'Wholesale Pricing'],
      subtitle: 'Fashion jewelry, accessories, and precious items at wholesale prices.',
      subItems: [
        { icon: '💍', name: 'Rings', desc: 'Fashion rings, engagement styles, stackable rings in various materials.' },
        { icon: '📿', name: 'Necklaces', desc: 'Chains, pendants, chokers, and statement necklaces.' },
        { icon: '💎', name: 'Earrings', desc: 'Studs, hoops, dangles, and ear cuffs for all styles.' },
        { icon: '⌚', name: 'Watches', desc: 'Fashion watches, smart watches, and luxury-inspired timepieces.' },
      ]
    },
    'lighting': {
      icon: '💡', name: 'Lighting', cn: '照明',
      badges: ['Energy Efficient', 'CE/ROHS', 'Custom Designs'],
      subtitle: 'LED lights, decorative lighting, and commercial fixtures.',
      subItems: [
        { icon: '💡', name: 'LED Bulbs', desc: 'Energy-saving LED bulbs in various shapes, wattages, and color temperatures.' },
        { icon: '✨', name: 'Decorative Lights', desc: 'String lights, fairy lights, chandeliers, and wall sconces.' },
        { icon: '🔦', name: 'Work Lights', desc: 'Flood lights, shop lights, and utility lighting for commercial use.' },
        { icon: '🌞', name: 'Solar Lights', desc: 'Solar garden lights, pathway lights, and motion sensor lights.' },
      ]
    },
  }

  const category = allCategories[params.category as string]

  const tProd = (key: string, fallback: string) => {
    return (productT as any)?.[lang]?.[key] || fallback
  }

  if (!category) {
    return (
      <>
        <Header />
        <main className="relative z-10 pt-24 section-padding">
          <div className="section-container text-center">
            <div className="text-5xl mb-4">🔍</div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Category not found</h1>
            <p className="text-gray-500 mb-6">The category you&apos;re looking for doesn&apos;t exist.</p>
            <Link href="/products" className="text-[#b8860b] hover:text-[#b8860b]/80">{t('nav.allCategories')}</Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <ParticleBackground />
      <Header />

      <main className="relative z-10 pt-24">
        {/* Hero */}
        <section className="section-padding relative overflow-hidden">
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-[#b8860b]/10 via-[#b8860b]/5 to-[#2c6e6e]/10 rounded-full blur-[120px]" />
          <div className="section-container relative z-10">
            <div 
             
             
            >
              <Link href="/products" className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#b8860b] transition-colors mb-6">
                {t('nav.allCategories')}
              </Link>
            </div>

            <div 
             
             
             
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="text-5xl">{category.icon}</span>
                <div>
                  <h1 className="text-3xl md:text-5xl font-extrabold gradient-text">{t('catSelect.' + params.category)}</h1>
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2.5 mb-6">
                {category.badges.map((badge, bi) => (
                  <span key={badge} className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full glass-light text-xs font-medium text-[#b8860b] border border-[#b8860b]/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#b8860b]" />
                    {tProd(`${params.category}.badge${bi+1}`, badge)}
                  </span>
                ))}
              </div>

              <p className="text-gray-400 max-w-2xl leading-relaxed">{tProd(`${params.category}.subtitle`, category.subtitle)}</p>
            </div>
          </div>
        </section>

        {/* Sub-items */}
        <section className="section-padding pt-0">
          <div className="section-container">
            <h2
             
             
             
              className="text-center text-xl md:text-2xl font-extrabold gradient-text mb-10"
            >
              {t('products.itemSubtitle')}
            </h2>

            <div className="max-w-4xl mx-auto space-y-4">
              {category.subItems.map((item, i) => (
                <div 
                  key={item.name}
                 
                 
                 
                 
                  className="glass-card rounded-2xl p-5 md:p-6 flex flex-col md:flex-row gap-4 md:gap-6 items-start"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#b8860b]/20 to-[#2c6e6e]/20 flex items-center justify-center text-2xl flex-shrink-0">
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-foreground text-base mb-2">{tProd(`${params.category}.item${i+1}.name`, item.name)}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{tProd(`${params.category}.item${i+1}.desc`, item.desc)}</p>
                  </div>
                  <a href="/#contact" className="flex-shrink-0 px-6 py-3 bg-gradient-to-r from-[#b8860b] to-[#9a7209] text-foreground text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-[#b8860b]/20 transition-all whitespace-nowrap">
                    {t('products.getQuote')} →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Need More Categories */}
        <section className="section-padding">
          <div className="section-container">
            <div 
             
             
             
              className="text-center"
            >
              <div className="glass rounded-2xl p-6 md:p-8 max-w-lg mx-auto">
                <p className="text-base font-semibold text-foreground mb-2">{t('products.needMoreTitle')}</p>
                <p className="text-sm text-gray-400 mb-5">
                  {t('products.needMoreDesc')}
                </p>
                <a href="/#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#b8860b] to-[#9a7209] text-foreground font-semibold rounded-xl text-sm hover:shadow-lg hover:shadow-[#b8860b]/20 transition-all"
                >
                  {t('products.needMoreBtn')} →
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
