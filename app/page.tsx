import dynamic from "next/dynamic";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import { buttonVariants } from "@/components/ui/button";

const DynamicTimeZoneSelect = dynamic(
  () => import("@/components/TimeZoneSelect"),
  { ssr: false },
);

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Time zone difference
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          A simple tool to calculate the time difference between two or more
          cities/countries.
        </p>
        <DynamicTimeZoneSelect />
      </div>
      <div className="flex gap-4">
        <Link
          target="_blank"
          rel="noreferrer"
          href={siteConfig.links.github}
          className={buttonVariants()}
        >
          GitHub
        </Link>
      </div>
    </section>
  );
}
