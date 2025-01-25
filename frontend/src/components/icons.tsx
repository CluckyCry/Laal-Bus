import React from "react"
import {
  User,
  Map,
  MessageSquare,
  Settings,
  AlertCircle,
  AlertTriangle,
  X,
  Search,
  Share2,
  Bookmark,
  Compass,
  TypeIcon as type,
  type LucideIcon,
} from "lucide-react"

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number
  className?: string
}

const iconWrapper = (Icon: LucideIcon): React.FC<IconProps> => {
  const WrappedIcon: React.FC<IconProps> = ({ size = 24, className = "", ...props }) => (
    <Icon size={size} className={`text-current ${className}`} aria-hidden="true" {...props} />
  )
  WrappedIcon.displayName = `Wrapped${Icon.displayName || "Icon"}`
  return WrappedIcon
}

export const UserIcon = iconWrapper(User)
export const MapIcon = iconWrapper(Map)
export const MessageSquareIcon = iconWrapper(MessageSquare)
export const SettingsIcon = iconWrapper(Settings)
export const AlertCircleIcon = iconWrapper(AlertCircle)
export const AlertTriangleIcon = iconWrapper(AlertTriangle)
export const XIcon = iconWrapper(X)
export const SearchIcon = iconWrapper(Search)
export const Share2Icon = iconWrapper(Share2)
export const BookmarkIcon = iconWrapper(Bookmark)
export const CompassIcon = iconWrapper(Compass)

// Generic Icon component
interface GenericIconProps extends IconProps {
  name: keyof typeof import("lucide-react")
}

export const Icon: React.FC<GenericIconProps> = ({ name, ...props }) => {
  const LucideIcon = React.lazy(() => import("lucide-react").then((mod) => ({ default: mod[name] as React.ComponentType<any> })))

  return (
    <React.Suspense fallback={<div style={{ width: props.size, height: props.size }} />}>
      <LucideIcon {...props} />
    </React.Suspense>
  )
}

