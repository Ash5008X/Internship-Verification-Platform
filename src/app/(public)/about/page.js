import PublicPage from "@/components/public/PublicPage";

const sections = [
  {
    "id": "section-1",
    "title": "Our Purpose",
    "content": [
      "InternCheck aims to help students evaluate internship opportunities using structured listing information, verification indicators, risk signals and student experiences."
    ]
  },
  {
    "id": "section-2",
    "title": "How It Works",
    "content": [
      "Recruiters submit opportunities, the platform applies available checks and students can explore listings and make their own informed decisions."
    ]
  },
  {
    "id": "section-3",
    "title": "Our Limitations",
    "content": [
      "Automated assessments can be incomplete or mistaken. InternCheck does not guarantee a recruiter's identity, a listing's accuracy or a successful outcome."
    ]
  },
  {
    "id": "section-4",
    "title": "Who Operates InternCheck",
    "content": [
      "InternCheck is currently a founder-led project. It is not represented here as an incorporated company. If a legal entity is formed, the operator details will be updated accurately."
    ]
  }
];

export default function Page() {
  return (
    <PublicPage
      eyebrow={"ABOUT"}
      title={"About InternCheck"}
      description={"A platform focused on improving transparency and confidence in internship discovery."}
      updated={"INDIA COMPLIANCE BASELINE \u00b7 REVIEW BEFORE PRODUCTION"}
      sections={sections}
      notice="InternCheck is currently a founder-led project and is not represented as an incorporated company. Operator identity, statutory contact details and production practices must be confirmed before launch."
    >
      
    </PublicPage>
  );
}
