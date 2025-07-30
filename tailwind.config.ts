// ==================================================
// AI EXPLANATION: tailwind.config.ts
// ==================================================
// WHAT: Tailwind CSS configuration defining custom colors (primary/accent/neutral), breakpoints (tablet/iPad/4K), fonts (Gotham HTF), and animations
// WHY: Without this, app has no design system - defines all custom styling tokens, responsive breakpoints, and brand colors
// USED BY: All components via Tailwind classes, PostCSS build process, any file using utility classes
// CRITICAL: YES - Core design system configuration, changes affect entire app appearance and responsive behavior
// ==================================================


import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
		'./index.html',
	],
	theme: {
		screens: {
			// Base: Mobile/small tablets (below iPad)
			'sm': '640px',     // Keep default small breakpoint
			'tablet': '768px', // iPad Mini, standard iPads
			'ipad': '1024px',  // iPad Pro 11"
			'ipadpro': '1366px', // iPad Pro 12.9"
			'hd': '1920px',    // HD TVs and low-res 4K viewing
			'4k': '3000px',    // 4K TVs at proper resolution
		},
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			animation: {
				fadeIn: 'fadeIn 0.3s ease-in-out',
			},
			keyframes: {
				fadeIn: {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: '#0a003e',  // Dark navy
					light: '#102765',    // Medium blue
					lighter: '#2953b2',  // Royal blue
					foreground: 'hsl(var(--primary-foreground))'
				},
				accent: {
					DEFAULT: '#00a1c7',  // Teal
					hover: '#0092b8',    // Darker teal for hover states
					foreground: 'hsl(var(--accent-foreground))'
				},
				neutral: {
					DEFAULT: '#616c6f',  // Slate gray
					light: '#c6c6c6',    // Light gray
					foreground: 'hsl(var(--neutral-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			height: {
				'13': '3.25rem',   // 52px
				'15': '3.75rem',   // 60px
				'17': '4.25rem',   // 68px
				'18': '4.5rem',    // 72px
				'22': '5.5rem',    // 88px
				'26': '6.5rem',    // 104px
				'30': '7.5rem',    // 120px
			},
			width: {
				'13': '3.25rem',   // 52px
				'15': '3.75rem',   // 60px
				'17': '4.25rem',   // 68px
				'18': '4.5rem',    // 72px
				'22': '5.5rem',    // 88px
				'26': '6.5rem',    // 104px
				'30': '7.5rem',    // 120px
			},
			spacing: {
				'0.25': '0.0625rem', // 1px
				'0.75': '0.1875rem', // 3px
				'1.25': '0.3125rem', // 5px
				'1.75': '0.4375rem', // 7px
			},
			fontSize: {
				'2xs': '0.625rem',  // 10px
				'3xs': '0.5rem',    // 8px
			},
			borderWidth: {
				'3': '3px',
				'5': '5px',
				'6': '6px',
				'7': '7px',
				'8': '8px',
			},
			fontFamily: {
				sans: ['Gotham HTF', 'system-ui', '-apple-system', 'sans-serif'],
				gotham: ['Gotham HTF', 'system-ui', '-apple-system', 'sans-serif'],
			},
			fontWeight: {
				thin: '100',
				xlight: '200',
				light: '300',
				book: '400',
				medium: '500',
				bold: '700',
				ultra: '800',
				black: '900',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				ripple: {
					'0%': { transform: 'scale(0)', opacity: '0.6' },
					'100%': { transform: 'scale(4)', opacity: '0' },
				},
				shimmer: {
					'100%': { transform: 'translateX(100%)' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'ripple': 'ripple 0.6s linear',
				'shimmer': 'shimmer 2s infinite',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
