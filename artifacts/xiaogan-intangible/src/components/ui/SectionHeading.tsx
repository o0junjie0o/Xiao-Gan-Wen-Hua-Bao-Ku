import { ReactNode } from "react";
import { clsx } from "clsx";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({ title, subtitle, children, align = "center", className }: SectionHeadingProps) {
  return (
    <div className={clsx("mb-12 relative", align === "center" ? "text-center" : "text-left", className)}>
      <div className={clsx("inline-flex flex-col", align === "center" ? "items-center" : "items-start")}>
        {subtitle && (
          <span className="text-accent font-medium text-sm tracking-widest uppercase mb-2 block">
            {subtitle}
          </span>
        )}
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground relative pb-4">
          {title}
          <div className={clsx("absolute bottom-0 h-1 bg-primary rounded-full", align === "center" ? "left-1/2 -translate-x-1/2 w-16" : "left-0 w-16")} />
        </h2>
        {children && <div className="mt-4 max-w-2xl text-muted-foreground">{children}</div>}
      </div>
    </div>
  );
}
