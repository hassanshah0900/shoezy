import { ThemeProvider as NextThemeProvider } from "next-themes";
import { ComponentProps, ReactNode } from "react";

interface Props extends ComponentProps<typeof NextThemeProvider> {
  children: ReactNode;
}
export function ThemeProvider({ children, ...props }: Props) {
  return <NextThemeProvider {...props}>{children}</NextThemeProvider>;
}
