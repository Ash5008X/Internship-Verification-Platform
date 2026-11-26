"use client";

export default function GlobalError({ error, reset }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#faf7f8] text-[#30252a]">
        <main className="flex min-h-screen items-center justify-center px-4 py-10">
          <section role="alert" className="w-full max-w-lg rounded-2xl border border-[#eadde2] bg-white p-6 text-center shadow-sm sm:p-9">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f7e8ed] text-[#852447]">
              <span className="text-2xl font-bold">!</span>
            </div>
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#852447]">InternCheck · Critical error</p>
            <h1 className="text-2xl font-bold sm:text-3xl">Something went wrong</h1>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[#796d73]">InternCheck encountered an unexpected application error. Try rendering the page again.</p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <button type="button" onClick={() => reset()} className="min-h-11 rounded-xl bg-[#852447] px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90">Try again</button>
              <button type="button" onClick={() => window.location.reload()} className="min-h-11 rounded-xl border border-[#eadde2] px-5 py-2.5 text-sm font-semibold hover:bg-[#faf7f8]">Reload page</button>
            </div>
          </section>
        </main>
      </body>
    </html>
  );
}
