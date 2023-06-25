export default function getCssVariable(variable: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(variable);
}
