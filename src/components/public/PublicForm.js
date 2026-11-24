"use client";
import { useState } from "react";

export default function PublicForm({ kind="support" }) {
  const [values,setValues]=useState({name:"",email:"",category:"",subject:"",details:"",url:"",priority:"normal"});
  const [errors,setErrors]=useState({});
  const [validated,setValidated]=useState(false);
  const isReport=kind==="listing"||kind==="issue";
  const title=kind==="contact"?"Send us a message":kind==="listing"?"Report an internship listing":kind==="issue"?"Report a platform issue":"Create a support request";
  const categories=kind==="listing"?["Misleading or false information","Application fee or payment request","Suspicious recruiter or company","Duplicate listing","Expired or unavailable listing","Other"]:kind==="issue"?["Login or authentication","Broken page or feature","Application problem","Verification concern","Security or privacy concern","Other"]:["Account and login","Internship listings","Applications","Verification","CV and profile","Technical issue","Privacy or data request","General question"];
  const update=(k,v)=>setValues(x=>({...x,[k]:v}));
  function submit(e){e.preventDefault();const x={};if(!values.name.trim())x.name="Enter your name.";if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))x.email="Enter a valid email address.";if(!values.category)x.category="Choose a category.";if(!values.subject.trim())x.subject="Enter a subject.";if(values.details.trim().length<20)x.details="Add at least 20 characters.";if(isReport&&!/^https?:\/\/.+/i.test(values.url))x.url="Enter a valid page or listing URL.";setErrors(x);if(!Object.keys(x).length)setValidated(true);}
  const field="mt-2 w-full rounded-lg border border-border bg-background px-3 py-3 text-sm text-text outline-none transition placeholder:text-text-muted focus:border-primary";
  if(validated)return <div className="rounded-xl border border-primary/20 bg-rose-soft/30 p-6"><p className="font-mono text-xs tracking-wider text-primary">FORM VALIDATED</p><h3 className="mt-3 text-xl font-extrabold text-text">Your request is ready.</h3><p className="mt-3 text-sm leading-7 text-text-secondary">This form currently validates in your browser only. It is not connected to a support API, so no ticket has been created or sent. Connect the form to your backend before production use.</p><button type="button" onClick={()=>{setValidated(false);setValues({name:"",email:"",category:"",subject:"",details:"",url:"",priority:"normal"});}} className="mt-5 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-white">Create another request</button></div>;
  return <form onSubmit={submit} noValidate className="rounded-xl border border-border bg-surface p-6 shadow-sm sm:p-8">
    <div className="mb-6"><p className="font-mono text-[10px] tracking-[0.2em] text-rose">INTERNCHECK / REQUEST FORM</p><h3 className="mt-2 text-xl font-extrabold text-text">{title}</h3><p className="mt-2 text-xs leading-6 text-text-secondary">Fields marked with * are required.</p></div>
    <div className="grid gap-5 sm:grid-cols-2">
      <label className="text-xs font-bold text-text">Full name *<input className={field} value={values.name} onChange={e=>update("name",e.target.value)} placeholder="Your name"/>{errors.name&&<span className="mt-1 block text-xs text-danger">{errors.name}</span>}</label>
      <label className="text-xs font-bold text-text">Email address *<input type="email" className={field} value={values.email} onChange={e=>update("email",e.target.value)} placeholder="you@example.com"/>{errors.email&&<span className="mt-1 block text-xs text-danger">{errors.email}</span>}</label>
      <label className="text-xs font-bold text-text">Category *<select className={field} value={values.category} onChange={e=>update("category",e.target.value)}><option value="">Select a category</option>{categories.map(c=><option key={c}>{c}</option>)}</select>{errors.category&&<span className="mt-1 block text-xs text-danger">{errors.category}</span>}</label>
      {kind==="support"&&<label className="text-xs font-bold text-text">Priority<select className={field} value={values.priority} onChange={e=>update("priority",e.target.value)}><option value="normal">Normal</option><option value="high">High</option></select></label>}
      {isReport&&<label className="text-xs font-bold text-text sm:col-span-2">Relevant listing or page URL *<input className={field} value={values.url} onChange={e=>update("url",e.target.value)} placeholder="https://..."/>{errors.url&&<span className="mt-1 block text-xs text-danger">{errors.url}</span>}</label>}
      <label className="text-xs font-bold text-text sm:col-span-2">Subject *<input className={field} value={values.subject} onChange={e=>update("subject",e.target.value)} placeholder="Briefly describe the request"/>{errors.subject&&<span className="mt-1 block text-xs text-danger">{errors.subject}</span>}</label>
      <label className="text-xs font-bold text-text sm:col-span-2">Details *<textarea rows={6} className={field} value={values.details} onChange={e=>update("details",e.target.value)} placeholder="Include relevant details. Do not include passwords or sensitive personal information."/>{errors.details&&<span className="mt-1 block text-xs text-danger">{errors.details}</span>}</label>
    </div>
    <button type="submit" className="mt-6 rounded-lg bg-primary px-5 py-3 text-sm font-bold text-white transition hover:bg-primary-hover">Validate request <span className="ml-2">→</span></button>
    <p className="mt-4 text-[11px] leading-5 text-text-muted">Do not submit passwords, payment details, government identification numbers or other sensitive information.</p>
  </form>;
}
