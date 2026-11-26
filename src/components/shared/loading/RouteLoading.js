function Bar({ className = "" }) {
  return <div className={`animate-pulse rounded-md bg-surface-alt ${className}`} />;
}

function Card({ className = "", children }) {
  return <section className={`rounded-2xl border border-border bg-surface p-4 sm:p-5 ${className}`}>{children}</section>;
}

function Heading({ wide = "w-56", short = "w-80" }) {
  return (
    <div className="space-y-3">
      <Bar className="h-2.5 w-28" />
      <Bar className={`h-7 ${wide} max-w-full sm:h-8`} />
      <Bar className={`h-3 ${short} max-w-full`} />
    </div>
  );
}

function Stats({ count = 4 }) {
  return <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">{Array.from({ length: count }, (_, i) => <Card key={i} className="space-y-3"><Bar className="h-2.5 w-20" /><Bar className="h-7 w-12" /><Bar className="h-2.5 w-28 max-w-full" /></Card>)}</div>;
}

function Rows({ count = 4, detailed = false }) {
  return <div className="space-y-3">{Array.from({ length: count }, (_, i) => <Card key={i} className="flex gap-3 sm:gap-4"><Bar className="h-11 w-11 shrink-0 rounded-xl" /><div className="min-w-0 flex-1 space-y-2"><Bar className="h-3 w-2/5" /><Bar className="h-2.5 w-3/4" />{detailed && <Bar className="h-2.5 w-full" />}<div className="flex flex-wrap gap-2 pt-1"><Bar className="h-5 w-16 rounded-full" /><Bar className="h-5 w-20 rounded-full" /></div></div></Card>)}</div>;
}

function Form({ fields = 4 }) {
  return <Card className="space-y-5"><Bar className="h-4 w-40" /><div className="grid grid-cols-1 gap-4 sm:grid-cols-2">{Array.from({ length: fields }, (_, i) => <div key={i} className="space-y-2"><Bar className="h-2.5 w-24" /><Bar className={`h-11 w-full rounded-xl ${i === fields - 1 && fields > 4 ? "sm:col-span-2" : ""}`} /></div>)}</div><Bar className="h-10 w-32 rounded-xl" /></Card>;
}

function Profile() {
  return <div className="space-y-6"><Card><Bar className="mb-5 h-4 w-36" /><div className="flex flex-col gap-4 sm:flex-row sm:items-center"><Bar className="h-16 w-16 shrink-0 rounded-full" /><div className="flex-1 space-y-2"><Bar className="h-4 w-40" /><Bar className="h-2.5 w-56 max-w-full" /><Bar className="h-8 w-28 rounded-full" /></div></div><div className="mt-6 grid grid-cols-1 gap-4 border-t border-border pt-5 sm:grid-cols-2">{Array.from({length:4},(_,i)=><div key={i} className="space-y-2"><Bar className="h-2.5 w-24"/><Bar className="h-11 w-full rounded-xl"/></div>)}</div></Card><Form fields={4}/></div>;
}

function Dashboard({ recruiter = false }) {
  return <div className="space-y-6"><Card className="space-y-4 sm:p-7"><Bar className="h-2.5 w-28"/><Bar className="h-8 w-72 max-w-full"/><Bar className="h-3 w-full max-w-xl"/><div className="flex flex-wrap gap-2 pt-2"><Bar className="h-10 w-36 rounded-xl"/><Bar className="h-10 w-32 rounded-xl"/></div></Card><Stats/><div className="grid grid-cols-1 gap-5 xl:grid-cols-3"><div className="space-y-3 xl:col-span-2"><Bar className="h-5 w-48"/><Rows count={3} detailed/></div><div className="space-y-3"><Bar className="h-5 w-36"/><Card className="h-56"/><Card className="h-40"/></div></div></div>;
}

function Listing({ recruiter = false }) {
  return <div className="space-y-6"><div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><Heading wide="w-64"/><Bar className="h-10 w-full rounded-xl sm:w-36"/></div><Card className="space-y-4"><div className="grid grid-cols-1 gap-3 sm:grid-cols-4"><Bar className="h-10 rounded-xl sm:col-span-2"/><Bar className="h-10 rounded-xl"/><Bar className="h-10 rounded-xl"/></div></Card><div className="grid grid-cols-1 gap-4 lg:grid-cols-2"><Rows count={4} detailed/></div></div>;
}

function Applications() {
  return <div className="space-y-6"><Heading wide="w-64"/><div className="grid grid-cols-2 gap-3 sm:grid-cols-4"><Stats count={4}/></div><Card className="space-y-4"><div className="flex flex-wrap gap-2"><Bar className="h-8 w-20 rounded-full"/><Bar className="h-8 w-24 rounded-full"/><Bar className="h-8 w-20 rounded-full"/></div><Rows count={4} detailed/></Card></div>;
}

function Detail() {
  return <div className="grid grid-cols-1 gap-5 xl:grid-cols-3"><div className="space-y-5 xl:col-span-2"><Card className="space-y-4"><Bar className="h-3 w-24"/><Bar className="h-8 w-3/4"/><Bar className="h-3 w-48"/><div className="flex flex-wrap gap-2"><Bar className="h-6 w-20 rounded-full"/><Bar className="h-6 w-24 rounded-full"/></div><Bar className="h-40 w-full rounded-xl"/></Card><Card className="space-y-3"><Bar className="h-4 w-36"/><Bar className="h-3 w-full"/><Bar className="h-3 w-full"/><Bar className="h-3 w-4/5"/><Bar className="h-3 w-2/3"/></Card></div><div className="space-y-4"><Card className="space-y-3"><Bar className="h-5 w-28"/><Bar className="h-10 w-full rounded-xl"/><Bar className="h-10 w-full rounded-xl"/></Card><Card className="h-44"/></div></div>;
}

function Settings() {
  return <div className="grid grid-cols-1 gap-5 lg:grid-cols-[220px_1fr]"><Card className="space-y-3"><Bar className="h-4 w-24"/>{Array.from({length:5},(_,i)=><Bar key={i} className="h-9 w-full rounded-lg"/>)}</Card><div className="space-y-5"><Heading/><Form fields={4}/><Card className="space-y-3"><Bar className="h-4 w-32"/><Bar className="h-3 w-full"/><Bar className="h-9 w-28 rounded-xl"/></Card></div></div>;
}

function Experiences() {
  return <div className="space-y-6"><Heading wide="w-72"/><Card className="space-y-3"><Bar className="h-4 w-44"/><Bar className="h-11 w-full rounded-xl"/><Bar className="h-24 w-full rounded-xl"/><Bar className="h-10 w-32 rounded-xl"/></Card><div className="grid grid-cols-1 gap-4 md:grid-cols-2"><Rows count={4} detailed/></div></div>;
}

function Feedback() {
  return <div className="space-y-6"><Heading wide="w-64"/><Card className="space-y-4"><div className="flex gap-2"><Bar className="h-9 w-24 rounded-full"/><Bar className="h-9 w-24 rounded-full"/></div><Rows count={3} detailed/></Card></div>;
}

function Bookmarks() {
  return <div className="space-y-6"><Heading wide="w-60"/><div className="flex flex-col gap-3 sm:flex-row"><Bar className="h-10 flex-1 rounded-xl"/><Bar className="h-10 w-full rounded-xl sm:w-36"/></div><div className="grid grid-cols-1 gap-4 md:grid-cols-2"><Rows count={4} detailed/></div></div>;
}

function AuthPage({ register = false }) {
  return (
    <div className="mx-auto grid min-h-[70vh] max-w-5xl grid-cols-1 overflow-hidden rounded-3xl border border-border bg-surface lg:grid-cols-2">
      <div className="hidden space-y-5 bg-rose-soft/40 p-10 lg:block">
        <Bar className="h-10 w-40" />
        <Bar className="mt-16 h-10 w-4/5" />
        <Bar className="h-3 w-full" />
        <Bar className="h-3 w-5/6" />
        <Bar className="mt-10 h-12 w-3/4 rounded-xl" />
      </div>
      <div className="flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md space-y-5">
          <Heading wide={register ? "w-56" : "w-40"} />
          <Form fields={register ? 5 : 2} />
          <Bar className="h-3 w-3/4 mx-auto" />
        </div>
      </div>
    </div>
  );
}

function PublicPage({ variant }) {
  if (variant === "auth-login") return <AuthPage />;
  if (variant === "auth-register") return <AuthPage register />;
  if (variant === "contact" || variant === "support" || variant === "report-issue" || variant === "report-listing") {
    return <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-[260px_1fr]"><Card className="hidden h-64 space-y-4 lg:block"><Bar className="h-4 w-28"/>{Array.from({length:4},(_,i)=><Bar key={i} className="h-3 w-36"/>)}</Card><div className="space-y-5"><Heading wide="w-80"/><Form fields={variant.includes("report") ? 6 : 4}/></div></div>;
  }
  return <div className="mx-auto max-w-5xl space-y-6"><div className="rounded-3xl border border-border bg-surface p-6 sm:p-10 space-y-4"><Bar className="h-2.5 w-28"/><Bar className="h-9 w-3/4 max-w-full"/><Bar className="h-3 w-full"/><Bar className="h-3 w-5/6"/><Bar className="h-10 w-36 rounded-xl"/></div><div className="grid grid-cols-1 gap-4 md:grid-cols-2"><Card className="h-40"/><Card className="h-40"/><Card className="h-40"/></div></div>;
}

const skeletons = {
  home: Dashboard,
  "recruiter-dashboard": () => <Dashboard recruiter/>,
  internships: Listing,
  "recruiter-internships": () => <Listing recruiter/>,
  applications: Applications,
  "recruiter-applications": Applications,
  profile: Profile,
  "recruiter-profile": Profile,
  settings: Settings,
  "recruiter-settings": Settings,
  experiences: Experiences,
  feedback: Feedback,
  "recruiter-feedback": Feedback,
  bookmarks: Bookmarks,
  "internship-detail": Detail,
};

export default function RouteLoading({ variant = "public" }) {
  const Content = skeletons[variant];
  return (
    <main className="min-h-[calc(100vh-4rem)] w-full bg-background px-4 py-6 sm:px-6 lg:px-8 sm:py-8">
      <div className="mx-auto w-full max-w-[1500px]">
        {Content ? <Content/> : <PublicPage variant={variant}/>}
      </div>
    </main>
  );
}
