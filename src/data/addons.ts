export type AddOn = {
  id: string
  name: string
  description: string
  price: number // monthly NPR placeholder
  featured?: boolean
  category: 'Health' | 'Lifestyle' | 'Logistics' | 'Safety'
}
export const BASE_PRICE = 24999 // NPR/month placeholder. Set real price later.
export const addons: AddOn[] = [
  { id: 'physio', name: 'Physiotherapy (weekly)', description: 'Licensed physiotherapist home visit once a week.', price: 5000, category: 'Health', featured: true },
  { id: 'events', name: 'Events & Outings', description: 'Monthly curated social events and outings with transport.', price: 3000, category: 'Lifestyle', featured: true },
  { id: 'telemed', name: '24/7 Telemedicine', description: 'Unlimited video/phone access to doctors & nurses.', price: 2500, category: 'Health' },
  { id: 'dementia', name: 'Dementia Care Support', description: 'Specialized routine, memory care, and supervision.', price: 10000, category: 'Health' },
  { id: 'lab', name: 'Lab Tests at Home', description: 'Phlebotomy at home and digital reports.', price: 2000, category: 'Health' },
  { id: 'driver', name: 'Driver Package (10 trips)', description: 'On‑demand driver package for routine errands.', price: 6000, category: 'Logistics' },
  { id: 'concierge', name: 'Care Concierge', description: 'Personal concierge for bills, errands & coordination.', price: 4000, category: 'Logistics' },
  { id: 'security', name: 'Enhanced Security', description: 'Smart sensors & emergency response integration.', price: 1500, category: 'Safety' },
]