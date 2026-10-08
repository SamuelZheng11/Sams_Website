import { ElementType, ReactNode } from 'react'
import { TLayoutElement, TLayoutOrientation, TLayoutSpacing } from './LayoutTypes'
import './LayoutComponent.scss'

export interface LayoutProps {
  children?: ReactNode
  orientation?: TLayoutOrientation
  spacing?: TLayoutSpacing
  className?: string | string[]
  component?: TLayoutElement
  id?: string
  'aria-label'?: string
  'aria-labelledby'?: string
}

function Layout(props: LayoutProps) {
  const Component: ElementType = props.component ?? 'div'
  const className = Array.isArray(props.className)
    ? props.className.join(' ')
    : props.className

  const classNames = [
    className,
    'layout',
    props.orientation === 'horizontal'
      ? 'layout-horizontal-container'
      : 'layout-vertical-container',
    props.spacing ? `layout-spacing-${props.spacing}` : undefined,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <Component
      className={classNames}
      id={props.id}
      aria-label={props['aria-label']}
      aria-labelledby={props['aria-labelledby']}
    >
      {props.children}
    </Component>
  )
}

export default Layout
