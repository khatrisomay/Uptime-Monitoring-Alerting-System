import forms from '@tailwindcss/forms';
import containerQueries from '@tailwindcss/container-queries';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      "colors": {
        "secondary-fixed": "#d8e2ff",
        "on-secondary": "#002e69",
        "on-primary-fixed-variant": "#832700",
        "on-tertiary-fixed": "#2f004c",
        "secondary-fixed-dim": "#adc6ff",
        "inverse-surface": "#e5e2e1",
        "on-tertiary-fixed-variant": "#6e00ab",
        "on-secondary-fixed": "#001a41",
        "on-error": "#690005",
        "surface-tint": "#ffb59c",
        "surface-container-lowest": "#0e0e0e",
        "tertiary-fixed-dim": "#e3b5ff",
        "on-surface": "#e5e2e1",
        "outline": "#aa897f",
        "on-primary-container": "#561700",
        "surface-container-high": "#2a2a2a",
        "on-secondary-container": "#00285c",
        "surface-container-low": "#1c1b1b",
        "tertiary-fixed": "#f3daff",
        "on-primary": "#5c1900",
        "primary-fixed": "#ffdbcf",
        "error-container": "#93000a",
        "error": "#ffb4ab",
        "surface-container-highest": "#353534",
        "primary-fixed-dim": "#ffb59c",
        "background": "#131313",
        "primary": "#ffb59c",
        "surface-container": "#201f1f",
        "on-primary-fixed": "#390c00",
        "inverse-primary": "#ab3600",
        "on-background": "#e5e2e1",
        "inverse-on-surface": "#313030",
        "secondary-container": "#4b8eff",
        "primary-container": "#ff5f1f",
        "outline-variant": "#5b4138",
        "surface-bright": "#3a3939",
        "surface-dim": "#131313",
        "tertiary": "#e3b5ff",
        "on-tertiary": "#4d007a",
        "on-tertiary-container": "#470071",
        "on-secondary-fixed-variant": "#004493",
        "surface-variant": "#353534",
        "secondary": "#adc6ff",
        "tertiary-container": "#c26cff",
        "on-error-container": "#ffdad6",
        "surface": "#131313",
        "on-surface-variant": "#e3bfb3"
      },
      "borderRadius": {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      "spacing": {
        "element-gap": "1.5rem",
        "section-margin": "5rem",
        "glass-saturation": "150%",
        "glass-blur": "40px",
        "container-padding": "2rem"
      },
      "fontFamily": {
        "headline-lg-mobile": ["Plus Jakarta Sans"],
        "display-lg": ["Plus Jakarta Sans"],
        "body-md": ["Plus Jakarta Sans"],
        "body-lg": ["Plus Jakarta Sans"],
        "headline-md": ["Plus Jakarta Sans"],
        "headline-lg": ["Plus Jakarta Sans"],
        "label-md": ["Plus Jakarta Sans"]
      },
      "fontSize": {
        "headline-lg-mobile": ["32px", { "lineHeight": "1.2", "fontWeight": "700" }],
        "display-lg": ["64px", { "lineHeight": "1.1", "letterSpacing": "-0.02em", "fontWeight": "800" }],
        "body-md": ["16px", { "lineHeight": "1.6", "fontWeight": "400" }],
        "body-lg": ["18px", { "lineHeight": "1.6", "fontWeight": "400" }],
        "headline-md": ["24px", { "lineHeight": "1.4", "fontWeight": "600" }],
        "headline-lg": ["40px", { "lineHeight": "1.2", "letterSpacing": "-0.01em", "fontWeight": "700" }],
        "label-md": ["14px", { "lineHeight": "1.2", "letterSpacing": "0.05em", "fontWeight": "600" }]
      }
    },
  },
  plugins: [forms, containerQueries],
}
