import PublicPage from "@/components/public/PublicPage";

const sections = [
  {
    "id": "section-1",
    "title": "Is every internship verified?",
    "content": [
      "No. Verification indicators and risk assessments are signals based on available information. They are not guarantees of legitimacy or safety."
    ]
  },
  {
    "id": "section-2",
    "title": "Does InternCheck guarantee an internship?",
    "content": [
      "No. Recruiters make their own interview and selection decisions."
    ]
  },
  {
    "id": "section-3",
    "title": "Can recruiters publish listings?",
    "content": [
      "Recruiters can submit listings subject to platform requirements and applicable policies."
    ]
  },
  {
    "id": "section-4",
    "title": "What should I do if a listing asks for money?",
    "content": [
      "Treat unexpected application or training-fee requests cautiously and report the listing with its URL and supporting details."
    ]
  },
  {
    "id": "section-5",
    "title": "Can I delete my account?",
    "content": [
      "Account deletion should be requested through support. The platform must apply its deletion workflow and any lawful retention exceptions."
    ]
  },
  {
    "id": "section-6",
    "title": "Can users under 18 register?",
    "content": [
      "Not until the required parental or guardian consent process is implemented and completed."
    ]
  }
];

export default function Page() {
  return (
    <PublicPage
      eyebrow={"RESOURCES"}
      title={"Frequently Asked Questions"}
      description={"Answers to common questions about internship discovery, verification and platform use."}
      updated={"INDIA COMPLIANCE BASELINE \u00b7 REVIEW BEFORE PRODUCTION"}
      sections={sections}
      notice="InternCheck is currently a founder-led project and is not represented as an incorporated company. Operator identity, statutory contact details and production practices must be confirmed before launch."
    >
      
    </PublicPage>
  );
}
