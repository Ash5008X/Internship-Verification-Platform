import PublicPage from "@/components/public/PublicPage";

const sections = [
  {
    "id": "section-1",
    "title": "Be Honest",
    "content": [
      "Use accurate account details, genuine company information and truthful experiences."
    ]
  },
  {
    "id": "section-2",
    "title": "No Fraud or Impersonation",
    "content": [
      "Do not publish fake internships, impersonate employers or request deceptive payments."
    ]
  },
  {
    "id": "section-3",
    "title": "Respect Privacy",
    "content": [
      "Do not publish passwords, identity documents, private contact details or confidential company information."
    ]
  },
  {
    "id": "section-4",
    "title": "No Harassment",
    "content": [
      "Threats, discriminatory abuse, intimidation and targeted harassment are prohibited."
    ]
  },
  {
    "id": "section-5",
    "title": "Moderation and Reports",
    "content": [
      "Content may be restricted or removed when it violates these guidelines or applicable law. Reports should be assessed fairly and with relevant context."
    ]
  },
  {
    "id": "section-6",
    "title": "Safety for Younger Users",
    "content": [
      "Under-18 accounts must not be enabled until the required guardian-consent safeguards are in place."
    ]
  }
];

export default function Page() {
  return (
    <PublicPage
      eyebrow={"COMMUNITY"}
      title={"Community Guidelines"}
      description={"Standards for students, recruiters and everyone contributing to InternCheck."}
      updated={"INDIA COMPLIANCE BASELINE \u00b7 REVIEW BEFORE PRODUCTION"}
      sections={sections}
      notice="InternCheck is currently a founder-led project and is not represented as an incorporated company. Operator identity, statutory contact details and production practices must be confirmed before launch."
    >
      
    </PublicPage>
  );
}
