import PublicPage from "@/components/public/PublicPage";

const sections = [
  {
    "id": "section-1",
    "title": "Build an Accurate Profile",
    "content": [
      "Keep educational details and contact information accurate. Share only information needed for the application."
    ]
  },
  {
    "id": "section-2",
    "title": "Evaluate Listings",
    "content": [
      "Read eligibility, responsibilities, compensation, location and application requirements carefully."
    ]
  },
  {
    "id": "section-3",
    "title": "Protect Your Information",
    "content": [
      "Do not share passwords, OTPs, bank credentials or unnecessary identity documents with recruiters."
    ]
  },
  {
    "id": "section-4",
    "title": "Watch for Warning Signs",
    "content": [
      "Be cautious of upfront fees, guaranteed selection claims, pressure tactics and communication from unverifiable domains."
    ]
  },
  {
    "id": "section-5",
    "title": "Report Concerns",
    "content": [
      "Use Report Listing when an opportunity appears suspicious. Provide facts and the listing URL."
    ]
  }
];

export default function Page() {
  return (
    <PublicPage
      eyebrow={"STUDENT RESOURCES"}
      title={"Student Guide"}
      description={"Practical guidance for evaluating internship opportunities and using InternCheck safely."}
      updated={"INDIA COMPLIANCE BASELINE \u00b7 REVIEW BEFORE PRODUCTION"}
      sections={sections}
      notice="InternCheck is currently a founder-led project and is not represented as an incorporated company. Operator identity, statutory contact details and production practices must be confirmed before launch."
    >
      
    </PublicPage>
  );
}
