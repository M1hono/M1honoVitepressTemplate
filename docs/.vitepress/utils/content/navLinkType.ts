export interface NavBadge {
    text: string
    type?: 'info' | 'tip' | 'warning' | 'danger'
}

export interface NavLink {
    icon?: NavIcon | NavThemeIcon
    badge?: string | NavBadge
    badges?: Array<string | NavBadge>
    title: string
    desc?: string
    link: string
    tag?: string
    color?: string
    target?: '_blank' | '_self' | '_parent'
}

export interface NavData {
    title: string
    description?: string
    items: NavLink[]
    columns?: number
    collapsed?: boolean
    icon?: NavIcon | NavThemeIcon
}

export type NavIcon = string | NavSvg

export interface NavSvg {
    svg: string
}

export interface NavThemeIcon {
    dark?: NavIcon
    light?: NavIcon
}
