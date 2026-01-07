import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50 disabled:pointer-events-none',
                    {
                        'bg-primary text-primary-foreground hover:bg-primary/90': variant === 'primary',
                        'bg-secondary text-secondary-foreground hover:bg-secondary/80': variant === 'secondary',
                        'border border-input bg-transparent hover:bg-accent hover:text-accent-foreground': variant === 'outline',
                        'hover:bg-accent hover:text-accent-foreground': variant === 'ghost',
                        'h-9 px-4 text-sm': size === 'sm',
                        'h-10 px-6 text-base': size === 'md',
                        'h-12 px-8 text-lg': size === 'lg',
                    },
                    className
                )}
                disabled={props.disabled || isLoading}
                {...props}
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {children}
            </button>
        );
    }
);

Button.displayName = 'Button';
