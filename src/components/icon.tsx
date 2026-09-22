import * as icons from "lucide-react";
import type { LucideProps } from "lucide-react";

type IconName = keyof typeof icons;

export function Icon({ name, ...props }: { name: string } & LucideProps) {
  const Component = (icons as unknown as Record<string, React.ComponentType<LucideProps>>)[
    name as IconName
  ] ?? icons.Wrench;
  return <Component {...props} />;
}
