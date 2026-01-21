export interface NavItem {
  name: string
  href: string
}

export interface NavSection {
  title: string
  items: NavItem[]
}

export const navigation: NavSection[] = [
  {
    title: "Foundation",
    items: [
      { name: "Design Tokens", href: "/styleguide" },
    ]
  },
  {
    title: "Components",
    items: [
      { name: "Avatar", href: "/styleguide/components/avatar" },
      { name: "Button Group", href: "/styleguide/components/button-group" },
      { name: "Calendar", href: "/styleguide/components/calendar" },
      { name: "Card", href: "/styleguide/components/card" },
      { name: "Carousel", href: "/styleguide/components/carousel" },
      { name: "Chart", href: "/styleguide/components/chart" },
      { name: "Data Table", href: "/styleguide/components/data-table" },
      { name: "Date Picker", href: "/styleguide/components/date-picker" },
      { name: "Drawer", href: "/styleguide/components/drawer" },
      { name: "Dropdown Menu", href: "/styleguide/components/dropdown-menu" },
      { name: "Field", href: "/styleguide/components/field" },
      { name: "Input", href: "/styleguide/components/input" },
      { name: "Input Group", href: "/styleguide/components/input-group" },
      { name: "Menubar", href: "/styleguide/components/menubar" },
      { name: "Select", href: "/styleguide/components/select" },
      { name: "Skeleton", href: "/styleguide/components/skeleton" },
      { name: "Sonner", href: "/styleguide/components/sonner" },
      { name: "Switch", href: "/styleguide/components/switch" },
      { name: "Tabs", href: "/styleguide/components/tabs" },
    ]
  },
  {
    title: "Blocks",
    items: [
      { name: "Dashboard 01", href: "/styleguide/blocks/dashboard-01" },
    ]
  }
]
