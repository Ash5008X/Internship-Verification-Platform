import PublicPage from "@/components/public/PublicPage";

import PublicForm from "@/components/public/PublicForm";

const sections = [
  {
    "id": "section-1",
    "title": "Describe the Problem",
    "content": [
      "Include the page, action, expected result and actual result, along with steps to reproduce it where possible."
    ]
  },
  {
    "id": "section-2",
    "title": "Security Reports",
    "content": [
      "Avoid posting exploit details publicly. Do not include passwords, session tokens or private user data."
    ]
  },
  {
    "id": "section-3",
    "title": "Response",
    "content": [
      "The current form validates locally and does not transmit a report until connected to a secure backend."
    ]
  }
];

export default function Page() {
  return (
    <PublicPage
      eyebrow={"TECHNICAL"}
      title={"Report a Platform Issue"}
      description={"Tell us about a broken feature, unexpected behaviour, accessibility problem or security concern."}
      updated={"INDIA COMPLIANCE BASELINE \u00b7 REVIEW BEFORE PRODUCTION"}
      sections={sections}
      notice="InternCheck is currently a founder-led project and is not represented as an incorporated company. Operator identity, statutory contact details and production practices must be confirmed before launch."
    >
      <div className="mb-8"><PublicForm kind="issue" /></div>
    </PublicPage>
  );
}
