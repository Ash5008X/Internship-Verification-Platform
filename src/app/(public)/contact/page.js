import PublicPage from "@/components/public/PublicPage";

import PublicForm from "@/components/public/PublicForm";

const sections = [
  {
    "id": "section-1",
    "title": "Platform Questions",
    "content": [
      "Ask about platform features, internship listings, verification indicators and how InternCheck works."
    ]
  },
  {
    "id": "section-2",
    "title": "Partnership Enquiries",
    "content": [
      "Institutions, organisations and companies may use this form to describe a potential collaboration."
    ]
  },
  {
    "id": "section-3",
    "title": "Privacy and Legal Matters",
    "content": [
      "For personal-data or legal concerns, select the relevant category and provide enough information to identify the request without including unnecessary sensitive details."
    ]
  }
];

export default function Page() {
  return (
    <PublicPage
      eyebrow={"CONTACT"}
      title={"Contact InternCheck"}
      description={"Reach the InternCheck team for platform questions, collaboration enquiries and general communication."}
      updated={"INDIA COMPLIANCE BASELINE \u00b7 REVIEW BEFORE PRODUCTION"}
      sections={sections}
      notice="InternCheck is currently a founder-led project and is not represented as an incorporated company. Operator identity, statutory contact details and production practices must be confirmed before launch."
    >
      <div className="mb-8"><PublicForm kind="contact" /></div>
    </PublicPage>
  );
}
