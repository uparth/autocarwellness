# Autocarwellness Design System Specifications

This document outlines the complete design system for the Autocarwellness platform, including colors, typography, components, and design tokens. The design uses Tailwind CSS as the styling framework with a custom theme configuration.

## 1. Brand Identity

### 1.1 Brand Colors

#### Primary Colors
- **Primary Orange**: `#F47A20`
  - Used for CTAs, active states, highlights, and key homepage sections
  - Conveys energy, trust, and action in the automobile context

- **Deep Black**: `#050505`
  - Used for headers, footers, navigation, and strong content sections
  - Provides contrast and sophistication

- **White**: `#FFFFFF`
  - Used for cards and content surfaces
  - Clean and modern appearance

#### Accent Colors
- **Red Accent**: `#E9342D`
  - Inspired by the red car circle in the logo
  - Used sparingly for warnings or important highlights

#### Neutral Colors
- **Light Grey Background**: `#F5F5F5`
  - Subtle background color for sections
- **Border Grey**: `#E5E7EB`
  - Used for borders and dividers
- **Text Dark**: `#111827`
  - Primary text color
- **Text Muted**: `#6B7280`
  - Secondary text color

### 1.2 Color Usage Guidelines

#### Primary Orange Usage
- Primary buttons
- Active navigation states
- Call-to-action elements
- Form focus states
- Key highlights and badges

#### Deep Black Usage
- Navigation bars
- Footer
- Headings
- Strong emphasis text
- Secondary buttons

#### White Usage
- Card backgrounds
- Content containers
- Modal backgrounds
- Form backgrounds

## 2. Typography

### 2.1 Font Families

#### Primary Font: Poppins
- Used for headings, buttons, and navigation
- Available weights: 400, 500, 600, 700
- Source: Google Fonts

#### Secondary Font: Inter
- Used for body text, forms, tables, and dashboard content
- Available weights: 400, 500, 600
- Source: Google Fonts

### 2.2 Type Scale

| Name | Size | Line Height | Weight | Usage |
|------|------|-------------|--------|-------|
| H1 | 48px | 56px | 700 | Main page headings |
| H2 | 36px | 44px | 700 | Section headings |
| H3 | 28px | 36px | 600 | Subsection headings |
| H4 | 22px | 30px | 600 | Card titles, form labels |
| Body Large | 18px | 28px | 400 | Large body text, descriptions |
| Body | 16px | 24px | 400 | Standard body text |
| Small | 14px | 20px | 400 | Captions, metadata |
| Caption | 12px | 16px | 400 | Small labels, footnotes |

### 2.3 Typography Classes (Tailwind)

```css
/* Headings */
.text-h1 { font-size: 3rem; line-height: 3.5rem; font-weight: 700; font-family: 'Poppins'; }
.text-h2 { font-size: 2.25rem; line-height: 2.75rem; font-weight: 700; font-family: 'Poppins'; }
.text-h3 { font-size: 1.75rem; line-height: 2.25rem; font-weight: 600; font-family: 'Poppins'; }
.text-h4 { font-size: 1.375rem; line-height: 1.875rem; font-weight: 600; font-family: 'Poppins'; }

/* Body Text */
.text-body-large { font-size: 1.125rem; line-height: 1.75rem; font-weight: 400; font-family: 'Inter'; }
.text-body { font-size: 1rem; line-height: 1.5rem; font-weight: 400; font-family: 'Inter'; }
.text-small { font-size: 0.875rem; line-height: 1.25rem; font-weight: 400; font-family: 'Inter'; }
.text-caption { font-size: 0.75rem; line-height: 1rem; font-weight: 400; font-family: 'Inter'; }
```

## 3. Component Specifications

### 3.1 Buttons

#### Primary Button
```css
.btn-primary {
  background-color: #F47A20;
  color: #FFFFFF;
  border-radius: 10px;
  height: 44px;
  padding: 0 24px;
  font-family: 'Poppins';
  font-weight: 600;
  font-size: 16px;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.btn-primary:hover {
  background-color: #D96513;
}

.btn-primary:focus {
  outline: 2px solid #F47A20;
  outline-offset: 2px;
}
```

#### Secondary Button
```css
.btn-secondary {
  background-color: #050505;
  color: #FFFFFF;
  border-radius: 10px;
  height: 44px;
  padding: 0 24px;
  font-family: 'Poppins';
  font-weight: 600;
  font-size: 16px;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.btn-secondary:hover {
  background-color: #222222;
}
```

#### Outline Button
```css
.btn-outline {
  background-color: transparent;
  color: #F47A20;
  border: 1px solid #F47A20;
  border-radius: 10px;
  height: 44px;
  padding: 0 24px;
  font-family: 'Poppins';
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-outline:hover {
  background-color: #F47A20;
  color: #FFFFFF;
}
```

### 3.2 Cards

#### Standard Card
```css
.card {
  background-color: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s ease;
}

.card:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
```

### 3.3 Forms

#### Input Field
```css
.form-input {
  height: 44px;
  border: 1px solid #D1D5DB;
  border-radius: 10px;
  padding: 0 12px;
  font-family: 'Inter';
  font-size: 16px;
  color: #111827;
  background-color: #FFFFFF;
  transition: border-color 0.2s ease;
}

.form-input:focus {
  outline: none;
  border-color: #F47A20;
  box-shadow: 0 0 0 3px rgba(244, 122, 32, 0.1);
}

.form-input::placeholder {
  color: #6B7280;
}
```

#### Label
```css
.form-label {
  font-family: 'Inter';
  font-size: 14px;
  font-weight: 500;
  color: #111827;
  margin-bottom: 8px;
  display: block;
}
```

#### Error Text
```css
.form-error {
  font-family: 'Inter';
  font-size: 14px;
  color: #E9342D;
  margin-top: 4px;
}
```

## 4. Layout and Spacing

### 4.1 Container Widths
- **Mobile**: 100% with 16px padding
- **Tablet**: 768px max-width
- **Desktop**: 1200px max-width
- **Large Desktop**: 1440px max-width

### 4.2 Spacing Scale
Based on Tailwind's spacing scale with custom additions:

```css
.spacing-xs: 4px
.spacing-sm: 8px
.spacing-md: 16px
.spacing-lg: 24px
.spacing-xl: 32px
.spacing-2xl: 48px
.spacing-3xl: 64px
```

### 4.3 Breakpoints
```css
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

## 5. Tailwind Configuration

### 5.1 tailwind.config.js

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#F47A20', // Primary Orange
          600: '#D96513',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        secondary: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#050505', // Deep Black
        },
        accent: {
          500: '#E9342D', // Red Accent
        },
        neutral: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB', // Border Grey
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280', // Text Muted
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827', // Text Dark
        },
      },
      fontFamily: {
        'primary': ['Poppins', 'sans-serif'],
        'secondary': ['Inter', 'sans-serif'],
      },
      fontSize: {
        'h1': ['3rem', { lineHeight: '3.5rem', fontWeight: '700' }],
        'h2': ['2.25rem', { lineHeight: '2.75rem', fontWeight: '700' }],
        'h3': ['1.75rem', { lineHeight: '2.25rem', fontWeight: '600' }],
        'h4': ['1.375rem', { lineHeight: '1.875rem', fontWeight: '600' }],
        'body-large': ['1.125rem', { lineHeight: '1.75rem' }],
        'body': ['1rem', { lineHeight: '1.5rem' }],
        'small': ['0.875rem', { lineHeight: '1.25rem' }],
        'caption': ['0.75rem', { lineHeight: '1rem' }],
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 4px 6px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
}
```

## 6. Icon System

### 6.1 Icon Library
- **Primary**: Lucide React
- **Usage**: Import specific icons to reduce bundle size

### 6.2 Common Icons

```javascript
import {
  Car,
  Fuel,
  Gauge,
  Calendar,
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  Wrench,
  BadgeIndianRupee,
  User,
  LayoutDashboard,
  Search,
  Filter,
  Heart,
  Star,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Check,
  AlertCircle,
  Info,
} from 'lucide-react';
```

### 6.3 Icon Sizing
- **Small**: 16px
- **Medium**: 20px
- **Large**: 24px
- **Extra Large**: 32px

## 7. Responsive Design Guidelines

### 7.1 Mobile First Approach
- Design for mobile (320px) first
- Use progressive enhancement for larger screens
- Test on actual devices, not just browser dev tools

### 7.2 Grid System
- Use CSS Grid or Flexbox for layouts
- Consistent gutters: 16px on mobile, 24px on desktop
- Container max-widths as specified above

### 7.3 Touch Targets
- Minimum 44px height for touch targets
- Adequate spacing between interactive elements
- Clear visual feedback for touch states

## 8. Accessibility Guidelines

### 8.1 Color Contrast
- Text on background: Minimum 4.5:1 ratio
- Large text: Minimum 3:1 ratio
- Interactive elements: Clear focus indicators

### 8.2 Keyboard Navigation
- All interactive elements keyboard accessible
- Logical tab order
- Skip links for main content areas

### 8.3 Screen Readers
- Semantic HTML elements
- ARIA labels where needed
- Alt text for images
- Form labels properly associated

## 9. Animation and Transitions

### 9.1 Transition Durations
- **Fast**: 150ms
- **Normal**: 200ms
- **Slow**: 300ms

### 9.2 Easing Functions
- **Default**: ease-out
- **Smooth**: cubic-bezier(0.4, 0.0, 0.2, 1)

### 9.3 Animation Guidelines
- Use sparingly for performance
- Prefer CSS transitions over JavaScript animations
- Respect user's motion preferences

## 10. Component Library Structure

### 10.1 File Organization
```
src/components/
├── common/
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.stories.tsx
│   │   └── index.ts
│   ├── Input/
│   ├── Modal/
│   └── ...
├── layout/
│   ├── Header/
│   ├── Footer/
│   └── ...
└── ui/
    ├── Card/
    ├── Badge/
    └── ...
```

### 10.2 Component API
Each component should have:
- TypeScript interfaces for props
- Default props
- Prop validation
- Storybook stories for documentation
- Unit tests

## 11. Design Tokens

### 11.1 Color Tokens
```javascript
export const colors = {
  primary: {
    main: '#F47A20',
    hover: '#D96513',
    light: '#FFF7ED',
  },
  secondary: {
    main: '#050505',
    hover: '#222222',
    light: '#F5F5F5',
  },
  neutral: {
    text: {
      primary: '#111827',
      secondary: '#6B7280',
    },
    border: '#E5E7EB',
    background: '#FFFFFF',
  },
  status: {
    error: '#E9342D',
    success: '#10B981',
    warning: '#F59E0B',
    info: '#3B82F6',
  },
};
```

### 11.2 Spacing Tokens
```javascript
export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
  '3xl': '64px',
};
```

### 11.3 Typography Tokens
```javascript
export const typography = {
  fontFamily: {
    primary: 'Poppins, sans-serif',
    secondary: 'Inter, sans-serif',
  },
  fontSize: {
    h1: '3rem',
    h2: '2.25rem',
    h3: '1.75rem',
    h4: '1.375rem',
    bodyLarge: '1.125rem',
    body: '1rem',
    small: '0.875rem',
    caption: '0.75rem',
  },
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
};
```

## 12. Implementation Notes

### 12.1 CSS Custom Properties
For dynamic theming, use CSS custom properties:

```css
:root {
  --color-primary: #F47A20;
  --color-secondary: #050505;
  --color-neutral-text: #111827;
  --spacing-md: 16px;
  --border-radius: 10px;
}
```

### 12.2 Dark Mode Support
Future consideration: Implement dark mode variants using Tailwind's dark: prefix.

### 12.3 Performance
- Use Tailwind's purging to remove unused styles
- Optimize font loading with font-display: swap
- Lazy load images and components
- Minimize CSS bundle size

This design system provides a solid foundation for consistent, accessible, and maintainable UI components across the Autocarwellness platform.