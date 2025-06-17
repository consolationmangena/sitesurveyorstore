import type { Config } from "tailwindcss";

// Colors copied from the referenced Lovable project.
export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx,js,jsx}",
		"./components/**/*.{ts,tsx,js,jsx}",
		"./app/**/*.{ts,tsx,js,jsx}",
		"./src/**/*.{ts,tsx,js,jsx}",
	],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				background: '#f9fbfd',         // light nearly white
				foreground: '#1B2430',         // dark rich blue-grey
				primary: {
					DEFAULT: '#0059FF',         // bold blue
					foreground: '#FFFFFF'
				},
				secondary: {
					DEFAULT: '#5DE1E6',         // aqua/cyan
					foreground: '#0D2538'
				},
				accent: {
					DEFAULT: '#FFD43C',         // vibrant yellow
					foreground: '#1B2430'
				},
				destructive: {
					DEFAULT: '#FF3B3B',         // pinkish red
					foreground: '#FFFFFF'
				},
				muted: {
					DEFAULT: '#f1f5f9',
					foreground: '#64748B'
				},
				card: {
					DEFAULT: '#FFFFFF',          // white
					foreground: '#0D2538'
				},
				input: 'hsl(var(--input))',
				popover: 'hsl(var(--popover))',
				'popover-foreground': 'hsl(var(--popover-foreground))',
				ring: '#0059FF',               // primary blue ring
				border: '#E2E8F0',             // soft border
			},
			borderRadius: {
				lg: '1rem',
				md: '0.75rem',
				sm: '0.5rem'
			},
			keyframes: {
				'fade-in': {
					from: { opacity: '0', transform: 'translateY(16px)' },
					to: { opacity: '1', transform: 'translateY(0)' },
				}
			},
			animation: {
				'fade-in': 'fade-in 0.3s ease-in'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;