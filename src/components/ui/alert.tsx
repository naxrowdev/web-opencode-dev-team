import type { ComponentProps } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '../../lib/utils'

const alertVariants = cva('flex gap-3 border-l-2 px-4 py-3 text-small', {
  variants: {
    variant: {
      default: 'border-l-foreground bg-surface text-muted-foreground',
      destructive: 'border-l-destructive bg-surface text-muted-foreground',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

type AlertProps = ComponentProps<'div'> & VariantProps<typeof alertVariants>

function Alert({ className, variant, ...props }: AlertProps) {
  return (
    <div
      data-slot="alert"
      role="note"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: ComponentProps<'p'>) {
  return (
    <p
      data-slot="alert-title"
      className={cn('font-medium text-foreground', className)}
      {...props}
    />
  )
}

function AlertDescription({ className, ...props }: ComponentProps<'p'>) {
  return <p data-slot="alert-description" className={cn('text-muted-foreground', className)} {...props} />
}

export { Alert, AlertDescription, AlertTitle }
