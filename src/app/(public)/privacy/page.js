import PublicPage from "@/components/public/PublicPage";

const sections = [
  {
    "id": "section-1",
    "title": "Information We Collect",
    "content": [
      "Depending on platform features, information may include names, email addresses, account credentials, education and profile details, CVs, applications, recruiter and company information, reports, support messages and technical logs."
    ]
  },
  {
    "id": "section-2",
    "title": "How We Use Information",
    "content": [
      "Information may be used to create accounts, provide listings and applications, operate verification and risk-assessment features, respond to reports, maintain security and improve the platform."
    ]
  },
  {
    "id": "section-3",
    "title": "Legal Basis and Notices",
    "content": [
      "InternCheck will identify the applicable basis for processing and provide clear notices at or before collection. Where consent is relied upon, the platform will record and support withdrawal of consent."
    ]
  },
  {
    "id": "section-4",
    "title": "Children's Personal Data",
    "content": [
      "For users under 18, the platform must implement the legally required verifiable parental or guardian consent process before processing their personal data, subject to applicable exemptions. Until that process is available, under-18 registration should remain disabled."
    ]
  },
  {
    "id": "section-5",
    "title": "Sharing and Service Providers",
    "content": [
      "Information may be shared with relevant recruiters when a student applies, with service providers needed to operate the platform, or where disclosure is required by law. Access should be limited to what is necessary."
    ]
  },
  {
    "id": "section-6",
    "title": "Retention and Deletion",
    "content": [
      "Personal data should be retained only for as long as necessary for the disclosed purpose or a legal requirement. Users should be able to request deletion, subject to lawful retention exceptions."
    ]
  },
  {
    "id": "section-7",
    "title": "Security",
    "content": [
      "InternCheck will use reasonable technical and organisational safeguards, including access restrictions, secure authentication, protected file access, backups and incident response."
    ]
  },
  {
    "id": "section-8",
    "title": "User Rights and Requests",
    "content": [
      "Users may request applicable access, correction, updating, erasure and grievance remedies through the support channel. Requests should be handled under applicable law."
    ]
  },
  {
    "id": "section-9",
    "title": "Cookies and Technical Data",
    "content": [
      "Cookies and similar technologies may support sessions, security and preferences. Optional analytics or advertising technologies should not be introduced without assessing applicable notice and consent requirements."
    ]
  },
  {
    "id": "section-10",
    "title": "Contact and Updates",
    "content": [
      "This policy may be updated as features, service providers and legal requirements change. The operator's final legal identity and privacy contact details must be added before production launch."
    ]
  }
];

export default function Page() {
  return (
    <PublicPage
      eyebrow={"LEGAL / 002"}
      title={"Privacy Policy"}
      description={"How InternCheck collects, uses, stores and protects personal information."}
      updated={"INDIA COMPLIANCE BASELINE \u00b7 REVIEW BEFORE PRODUCTION"}
      sections={sections}
      notice="InternCheck is currently a founder-led project and is not represented as an incorporated company. Operator identity, statutory contact details and production practices must be confirmed before launch."
    >
      
    </PublicPage>
  );
}
