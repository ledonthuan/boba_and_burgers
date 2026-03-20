'use client'

import { useState } from 'react'
import type { MenuData } from '@/types'

const menuData: MenuData = {
  burgers: [
    { name: 'The Adobo Smash', description: 'Smash patty, adobo-glazed onions, garlic aioli, brioche bun', price: '$14' },
    { name: 'Sinigang Impossible', description: 'Plant-based patty, tamarind slaw, pickled veggies, house sauce', price: '$15' },
    { name: 'The OG Pinoy', description: 'Classic beef patty, banana ketchup, egg, white rice bun option', price: '$13' },
    { name: '[Add Your Burger]', description: 'Edit menuData in Menu.tsx to add items', price: '$00' },
    { name: 'the eddy burger', description: 'itll surprise your ass', price: '$69'},
  ],
  boba: [
    { name: 'Ube Milk Tea', description: 'Purple yam, black milk tea, tapioca pearls', price: '$7' },
    { name: 'Pandan Matcha', description: 'Pandan-infused green tea, oat milk, lychee jelly', price: '$7.50' },
    { name: 'Calamansi Lemonade', description: 'Filipino citrus, honey, sparkling water, coconut jelly', price: '$6' },
    { name: '[Add Your Drink]', description: 'Edit menuData in Menu.tsx to add items', price: '$00' },
  ],
  sides: [
    { name: 'Garlic Sinangag Fries', description: 'Crispy fries tossed in garlic butter and toasted rice', price: '$5' },
    { name: '[Add Your Side]', description: 'Edit menuData in Menu.tsx', price: '$00' },
  ],
}

type TabKey = keyof MenuData

const TABS: { key: TabKey; label: string }[] = [
  { key: 'burgers', label: 'Burgers' },
  { key: 'boba',    label: 'Boba' },
  { key: 'sides',   label: 'Sides' },
]

export default function Menu() {
  const [activeTab, setActiveTab] = useState<TabKey>('burgers')

  return (
    <section id="menu" className="bg-dark py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="font-accent text-secondary text-xl mb-3">What&apos;s Good</p>
          <h2 className="font-display text-6xl md:text-8xl text-cream tracking-wide">
            Our Menu
          </h2>
        </div>

        {/* Tab switcher — retro menu board style */}
        <div
          className="flex justify-center mb-10"
          role="tablist"
          aria-label="Menu categories"
        >
          <div className="inline-flex bg-white/5 rounded-full p-1 gap-1 border border-white/10">
            {TABS.map(({ key, label }) => (
              <button
                key={key}
                role="tab"
                aria-selected={activeTab === key}
                aria-controls={`tabpanel-${key}`}
                id={`tab-${key}`}
                type="button"
                onClick={() => setActiveTab(key)}
                className={`px-6 py-2.5 rounded-full font-body font-semibold text-sm transition-all duration-200 ${
                  activeTab === key
                    ? 'bg-primary text-cream shadow-md'
                    : 'text-cream/60 hover:text-cream'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Menu items */}
        {TABS.map(({ key }) => (
          <div
            key={key}
            id={`tabpanel-${key}`}
            role="tabpanel"
            aria-labelledby={`tab-${key}`}
            hidden={activeTab !== key}
          >
            <div className="grid sm:grid-cols-2 gap-5">
              {menuData[key].map((item, i) => (
                <div
                  key={`${key}-${i}`}
                  className="group bg-white/5 border border-white/10 rounded-2xl p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:border-white/20 cursor-default"
                >
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="font-display text-2xl text-cream tracking-wide leading-tight">
                      {item.name}
                    </h3>
                    <span className="font-heading font-bold text-secondary text-lg whitespace-nowrap">
                      {item.price}
                    </span>
                  </div>
                  <p className="font-body text-cream/55 text-sm mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}

      </div>
    </section>
  )
}
