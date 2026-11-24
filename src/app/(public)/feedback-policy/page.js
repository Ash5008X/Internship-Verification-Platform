import PublicPage from "@/components/public/PublicPage";

const sections = [
  {
    "id": "section-1",
    "title": "Genuine Experiences",
    "content": [
      "Feedback should reflect a real interaction or experience. Do not fabricate interviews, offers or employment experiences."
    ]
  },
  {
    "id": "section-2",
    "title": "Relevant and Respectful",
    "content": [
      "Keep feedback factual, relevant and free from threats, harassment or discriminatory abuse."
    ]
  },
  {
    "id": "section-3",
    "title": "Personal and Confidential Information",
    "content": [
      "Do not publish private contact details, personal identifiers, confidential documents or trade secrets."
    ]
  },
  {
    "id": "section-4",
    "title": "Moderation",
    "content": [
      "InternCheck may review, shorten, restrict or remove content that violates platform rules or applicable law."
    ]
  },
  {
    "id": "section-5",
    "title": "Disputes and Corrections",
    "content": [
      "Users may report feedback they believe is inaccurate or inappropriate. Reports should include the relevant content and reason for concern."
    ]
  }
];

export default function Page() {
  return (
    <PublicPage
      eyebrow={"POLICY"}
      title={"Feedback Policy"}
      description={"How InternCheck approaches student experiences, feedback quality and moderation."}
      updated={"INDIA COMPLIANCE BASELINE \u00b7 REVIEW BEFORE PRODUCTION"}
      sections={sections}
      notice="InternCheck is currently a founder-led project and is not represented as an incorporated company. Operator identity, statutory contact details and production practices must be confirmed before launch."
    >
      
    </PublicPage>
  );
}
