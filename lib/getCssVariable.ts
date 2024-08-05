/**
 * Get CSS variable value
 * @param {string} variable - CSS variable name
 * @returns {string} - CSS variable value
 * @note This function will only be useful for client-side rendering components
 * as we need to access the DOM to get the CSS variable value
 */
export default function getCssVariable(variable: string): string {
  if (typeof window !== "undefined") {
    return window
      .getComputedStyle(document.documentElement)
      .getPropertyValue(variable);
  }

  return "";
}
