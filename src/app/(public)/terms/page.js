import PublicPage from "@/components/public/PublicPage";

const sections = [
  {
    "id": "section-1",
    "title": "Acceptance of Terms",
    "content": [
      "By accessing or using InternCheck, you agree to these Terms and Conditions. They apply to visitors, students, recruiters and other users.",
      "If you do not agree, discontinue use of the platform."
    ]
  },
  {
    "id": "section-2",
    "title": "About InternCheck",
    "content": [
      "InternCheck is an internship discovery and transparency platform. It provides listings, verification indicators, risk assessments, student feedback and recruitment information.",
      "InternCheck is an information platform, not an employer or recruitment agency. It does not guarantee that an opportunity is legitimate or that a user will be selected."
    ]
  },
  {
    "id": "section-3",
    "title": "Eligibility and Accounts",
    "content": [
      "Users must provide accurate information and protect their login credentials. Users are responsible for activity under their accounts.",
      "Student accounts for people under 18 must not be activated until the legally required parental or guardian consent process is implemented and completed."
    ]
  },
  {
    "id": "section-4",
    "title": "Student Responsibilities",
    "content": [
      "Students must provide truthful profile and application information, use the platform for legitimate purposes, avoid fabricated feedback and respect other users.",
      "Do not publish confidential company information without authorization."
    ]
  },
  {
    "id": "section-5",
    "title": "Recruiter Responsibilities",
    "content": [
      "Recruiters must provide genuine company information and accurate internship descriptions, eligibility criteria, compensation and application requirements.",
      "Recruiters must not mislead applicants, impersonate organizations or request undisclosed payments."
    ]
  },
  {
    "id": "section-6",
    "title": "Verification and Risk Assessment",
    "content": [
      "Automated checks, submitted information and other signals may be used to assess listings. Indicators and scores support decision-making but are not guarantees.",
      "InternCheck may flag, restrict or remove listings under its platform policies."
    ]
  },
  {
    "id": "section-7",
    "title": "Applications and Recruitment",
    "content": [
      "Recruitment decisions, interviews, offers, compensation and internship arrangements are determined by recruiters and companies. InternCheck does not guarantee interviews, selection or employment."
    ]
  },
  {
    "id": "section-8",
    "title": "Feedback",
    "content": [
      "Users must submit genuine feedback and must not publish false statements or unnecessary personal information. InternCheck may moderate content that violates platform rules or applicable law."
    ]
  },
  {
    "id": "section-9",
    "title": "Prohibited Activities",
    "content": [
      "Users must not create fake accounts, publish fraudulent listings, manipulate reviews, misuse personal information, access systems without authorization, distribute malware, scrape data abusively or harass others."
    ]
  },
  {
    "id": "section-10",
    "title": "Intellectual Property",
    "content": [
      "InternCheck's original branding, interface, software and content are protected by applicable law. Users retain responsibility for content they submit and must have rights to share it."
    ]
  },
  {
    "id": "section-11",
    "title": "Privacy",
    "content": [
      "Personal information is handled according to the Privacy Policy and applicable law. Do not include passwords, financial details or unnecessary sensitive information in public content."
    ]
  },
  {
    "id": "section-12",
    "title": "Availability and Liability",
    "content": [
      "The platform is provided on an as-available basis. Information from users and external sources may be incomplete or outdated. Nothing in these terms excludes liability that cannot legally be excluded."
    ]
  },
  {
    "id": "section-13",
    "title": "Suspension and Termination",
    "content": [
      "InternCheck may restrict accounts for policy violations or safety concerns. Users may stop using the platform and request account assistance."
    ]
  },
  {
    "id": "section-14",
    "title": "Changes and Governing Law",
    "content": [
      "Terms may be updated as the platform and legal requirements evolve. The operator's legal identity, governing law and competent courts must be completed before these terms are treated as a final binding agreement."
    ]
  },
  {
    "id": "section-15",
    "title": "Contact",
    "content": [
      "For questions or account concerns, use the support portal."
    ]
  }
];

export default function Page() {
  return (
    <PublicPage
      eyebrow={"LEGAL / 001"}
      title={"Terms & Conditions"}
      description={"The rules, responsibilities and limitations governing your use of InternCheck."}
      updated={"INDIA COMPLIANCE BASELINE \u00b7 REVIEW BEFORE PRODUCTION"}
      sections={sections}
      notice="InternCheck is currently a founder-led project and is not represented as an incorporated company. Operator identity, statutory contact details and production practices must be confirmed before launch."
    >
      
    </PublicPage>
  );
}
