import { MapPin } from 'lucide-react'

type TopBarProps = {
  message?: string
  icon?: boolean
}

export default function TopBar({ message, icon = true }: TopBarProps) {
  const displayMessage =
    message ||
    'Now serving families in Kathmandu & Pokhara — providing peace of mind, everywhere 💚'

  return (
    <div className="bg-[#112231] text-white text-sm">
      <div className="mx-auto max-w-[1200px] px-4 py-2 flex items-center justify-center">
        {icon && <MapPin className="h-4 w-4 mr-2" aria-hidden />}
        <span>{displayMessage}</span>
      </div>
    </div>
  )
}
