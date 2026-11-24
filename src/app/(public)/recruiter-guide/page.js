import PublicPage from "@/components/public/PublicPage";

const sections = [
  {
    "id": "section-1",
    "title": "Create Accurate Listings",
    "content": [
      "Use a genuine company identity and provide clear role descriptions, responsibilities, eligibility, duration, location and compensation details."
    ]
  },
  {
    "id": "section-2",
    "title": "Disclose Requirements",
    "content": [
      "Clearly explain selection stages, expected documents, fees if any and relevant conditions. Do not hide material requirements."
    ]
  },
  {
    "id": "section-3",
    "title": "Communicate Responsibly",
    "content": [
      "Respond professionally, avoid misleading promises and handle applicant information only for legitimate recruitment purposes."
    ]
  },
  {
    "id": "section-4",
    "title": "Respect Applicant Privacy",
    "content": [
      "Limit access to CVs and applications, secure downloaded documents and delete applicant data when no longer needed, subject to applicable obligations."
    ]
  },
  {
    "id": "section-5",
    "title": "Listing Review",
    "content": [
      "Listings may be checked, flagged, restricted or removed under InternCheck's verification and platform policies."
    ]
  }
];

export default function Page() {
  return (
    <PublicPage
      eyebrow={"RECRUITER RESOURCES"}
      title={"Recruiter Guide"}
      description={"Guidance for recruiters publishing accurate and transparent internship opportunities."}
      updated={"INDIA COMPLIANCE BASELINE \u00b7 REVIEW BEFORE PRODUCTION"}
      sections={sections}
      notice="InternCheck is currently a founder-led project and is not represented as an incorporated company. Operator identity, statutory contact details and production practices must be confirmed before launch."
    >
      
    </PublicPage>
  );
}
