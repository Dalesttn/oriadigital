import { ServicePage, serviceMetadata } from "@/components/pages/ServicePage";

/** Thin route wrapper: content lives in src/lib/content/services.ts. */
export const metadata = serviceMetadata("wordpress-developer-perth");

export default function Page() {
  return <ServicePage slug="wordpress-developer-perth" />;
}
