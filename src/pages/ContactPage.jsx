import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import LeadForm from "../components/common/LeadForm";
import Container from "../components/ui/Container";
import { SITE } from "../constants/siteContent";
import useDocumentMeta from "../hooks/useDocumentMeta";

const contactItems = [
  {
    icon: Mail,
    label: "Email",
    value: SITE.email,
    href: `mailto:${SITE.email}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: SITE.phone,
    href: `tel:${SITE.phone.replace(/\s/g, "")}`,
  },
  { icon: MapPin, label: "Studio", value: SITE.address },
  { icon: Clock3, label: "Hours", value: "Monday–Saturday, 10am–6pm" },
];

function ContactPage() {
  useDocumentMeta(
    "Start a project | Interior Haven",
    "Tell Interior Haven about your interior design project and arrange an introductory conversation.",
  );
  return (
    <main className="py-16 sm:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
          <div>
            <p className="text-sm font-semibold tracking-[0.2em] text-primary uppercase">
              Start a conversation
            </p>
            <h1 className="mt-4 font-display text-5xl leading-tight sm:text-6xl">
              Let’s make your space feel remarkable.
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-8 text-muted">
              Share a little about your project. We’ll review the details and
              get in touch to arrange an introductory call.
            </p>
            <ul className="mt-10 space-y-6">
              {contactItems.map(({ icon: Icon, label, value, href }) => (
                <li className="flex gap-4" key={label}>
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-surface text-primary">
                    <Icon aria-hidden="true" size={19} />
                  </span>
                  <div>
                    <p className="text-xs font-semibold tracking-wider text-muted uppercase">
                      {label}
                    </p>
                    {href ? (
                      <a className="mt-1 block hover:text-primary" href={href}>
                        {value}
                      </a>
                    ) : (
                      <p className="mt-1">{value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <LeadForm />
        </div>
      </Container>
    </main>
  );
}

export default ContactPage;
