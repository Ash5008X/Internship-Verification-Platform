import PublicPage from "@/components/public/PublicPage";

import PublicForm from "@/components/public/PublicForm";

const sections = [
  {
    "id": "section-1",
    "title": "Account and Access",
    "content": [
      "For sign-in, registration, profile access or suspected unauthorized access, provide the affected account email and a clear description. Never send your password."
    ]
  },
  {
    "id": "section-2",
    "title": "Applications and Listings",
    "content": [
      "Include the internship title or listing URL and explain what happened. Do not include another person's private information."
    ]
  },
  {
    "id": "section-3",
    "title": "Verification Concerns",
    "content": [
      "Reports about suspicious recruiters, application fees or misleading claims should include the listing URL and relevant facts. A report is a signal for assessment, not proof of wrongdoing."
    ]
  },
  {
    "id": "section-4",
    "title": "Privacy and Data Requests",
    "content": [
      "Use the form to raise access, correction, erasure or consent-related requests. Do not attach identity documents unless a secure, verified process specifically requests them."
    ]
  },
  {
    "id": "section-5",
    "title": "Grievances",
    "content": [
      "A formal grievance process and designated Grievance Officer contact details must be published once the operator has appointed the responsible person and confirmed the applicable requirements. Do not treat this general support form as proof that a statutory grievance mechanism is fully operational."
    ]
  },
  {
    "id": "section-6",
    "title": "Submission Status",
    "content": [
      "The current form performs browser-side validation only. It does not create a ticket or send a message until a backend endpoint is connected."
    ]
  }
];

export default function Page() {
  return (
    <PublicPage
      eyebrow={"HELP / SUPPORT"}
      title={"Technical Support"}
      description={"Get help with your account, internship applications, verification concerns, privacy requests or technical problems."}
      updated={"INDIA COMPLIANCE BASELINE \u00b7 REVIEW BEFORE PRODUCTION"}
      sections={sections}
      notice="InternCheck is currently a founder-led project and is not represented as an incorporated company. Operator identity, statutory contact details and production practices must be confirmed before launch."
    >
      <div className="mb-8"><PublicForm kind="support" /></div>
    </PublicPage>
  );
}
