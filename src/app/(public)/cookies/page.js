import PublicPage from "@/components/public/PublicPage";

const sections = [
  {
    "id": "section-1",
    "title": "What Cookies Are",
    "content": [
      "Cookies are small files stored by a browser. Similar technologies may store session, preference or security information."
    ]
  },
  {
    "id": "section-2",
    "title": "Essential Technologies",
    "content": [
      "Strictly necessary technologies may support authentication, session management, security and core platform functionality."
    ]
  },
  {
    "id": "section-3",
    "title": "Preferences and Analytics",
    "content": [
      "Preference storage and analytics should only be enabled where actually implemented, with appropriate notices and consent where required. InternCheck does not claim to use a particular analytics provider unless configured."
    ]
  },
  {
    "id": "section-4",
    "title": "Third-Party Services",
    "content": [
      "Embedded content, hosting, authentication or other integrations may set their own technologies. Their use should be inventoried and disclosed."
    ]
  },
  {
    "id": "section-5",
    "title": "Managing Cookies",
    "content": [
      "Users can manage cookies through browser settings. Blocking essential cookies may prevent login or other platform functions."
    ]
  },
  {
    "id": "section-6",
    "title": "Changes",
    "content": [
      "The policy should be updated when the actual cookie inventory, providers or purposes change."
    ]
  }
];

export default function Page() {
  return (
    <PublicPage
      eyebrow={"LEGAL / 003"}
      title={"Cookie Policy"}
      description={"Information about cookies, browser storage and similar technologies used by InternCheck."}
      updated={"INDIA COMPLIANCE BASELINE \u00b7 REVIEW BEFORE PRODUCTION"}
      sections={sections}
      notice="InternCheck is currently a founder-led project and is not represented as an incorporated company. Operator identity, statutory contact details and production practices must be confirmed before launch."
    >
      
    </PublicPage>
  );
}
