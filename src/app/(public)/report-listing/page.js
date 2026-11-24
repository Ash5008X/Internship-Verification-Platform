import PublicPage from "@/components/public/PublicPage";

import PublicForm from "@/components/public/PublicForm";

const sections = [
  {
    "id": "section-1",
    "title": "What to Report",
    "content": [
      "Application-fee demands, impersonation, false compensation claims, misleading descriptions, suspicious recruiter behaviour and duplicate or expired listings."
    ]
  },
  {
    "id": "section-2",
    "title": "What to Include",
    "content": [
      "Provide the listing URL, the reason for concern and relevant facts. Do not submit passwords or unrelated personal documents."
    ]
  },
  {
    "id": "section-3",
    "title": "What Happens Next",
    "content": [
      "A report may trigger assessment under InternCheck's verification and risk process. Submission does not automatically prove wrongdoing or guarantee removal."
    ]
  }
];

export default function Page() {
  return (
    <PublicPage
      eyebrow={"TRUST & SAFETY"}
      title={"Report an Internship Listing"}
      description={"Report suspicious, misleading, duplicate or otherwise problematic internship listings."}
      updated={"INDIA COMPLIANCE BASELINE \u00b7 REVIEW BEFORE PRODUCTION"}
      sections={sections}
      notice="InternCheck is currently a founder-led project and is not represented as an incorporated company. Operator identity, statutory contact details and production practices must be confirmed before launch."
    >
      <div className="mb-8"><PublicForm kind="listing" /></div>
    </PublicPage>
  );
}
