import dynamic from "next/dynamic";

const DynamicTimeZoneSelect = dynamic(
  () => import("@/components/TimeZoneSelect"),
  { ssr: false },
);

export default function IndexPage() {
  return (
    <section className="container w-full items-center gap-6 pb-8 pt-6 md:py-10">
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
    </section>
  );
}
