import PublicPage from "@/components/public/PublicPage";

const sections = [
  {
    "id": "section-1",
    "title": "Information Sources",
    "content": [
      "Assessment may use recruiter-submitted details, company information, listing content, public sources and user reports where available."
    ]
  },
  {
    "id": "section-2",
    "title": "Automated Checks",
    "content": [
      "Signals may include suspicious fees, vague descriptions, inconsistent company information, unusual requirements and other risk indicators."
    ]
  },
  {
    "id": "section-3",
    "title": "Risk Outcomes",
    "content": [
      "Listings may be categorised for automated activation, further checks or rejection according to the platform's configured criteria."
    ]
  },
  {
    "id": "section-4",
    "title": "Limitations",
    "content": [
      "A low-risk or verified indicator is not a guarantee. Information can change, external sources can be incomplete and automated systems can make mistakes."
    ]
  },
  {
    "id": "section-5",
    "title": "Reporting and Corrections",
    "content": [
      "Users and recruiters may report inaccurate information through the appropriate support or reporting channel."
    ]
  }
];

export default function Page() {
  return (
    <PublicPage
      eyebrow={"TRANSPARENCY"}
      title={"Verification Protocol"}
      description={"Understand how InternCheck evaluates internship listings and communicates risk indicators."}
      updated={"INDIA COMPLIANCE BASELINE \u00b7 REVIEW BEFORE PRODUCTION"}
      sections={sections}
      notice="InternCheck is currently a founder-led project and is not represented as an incorporated company. Operator identity, statutory contact details and production practices must be confirmed before launch."
    >
      
    </PublicPage>
  );
}
