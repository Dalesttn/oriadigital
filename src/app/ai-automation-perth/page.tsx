import { ServicePage, serviceMetadata } from "@/components/pages/ServicePage";

/** Thin route wrapper: content lives in src/lib/content/services.ts. */
export const metadata = serviceMetadata("ai-automation-perth");

export default function Page() {
  return <ServicePage slug="ai-automation-perth" />;
}
