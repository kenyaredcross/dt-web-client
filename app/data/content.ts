export interface PostAuthor {
  s: string;
  n: string;
}

export interface PostPerson {
  s: string;      // slug
  n: string;      // name
  photo: string;  // photo url (may be empty)
  i: string;      // initials
}

export interface PostContributor extends PostAuthor {
  role: string;
}

export interface ProjectMember extends PostAuthor {
  role: string;
}

export interface ProjectPartner {
  n: string;
  url: string;
  logo: string;
  type: string;
}

export interface Project {
  s: string;        // slug
  n: string;        // title
  sum: string;      // summary
  img: string;      // cover_image
  status: string;
  live: string;
  repo: string;
  members: ProjectMember[];
  partners?: ProjectPartner[];
  description?: string;
  posts?: PostCard[];
  sections?: ProjectSection[];
  tech?: string[];
}

export interface ProjectSection {
  eyebrow: string;
  heading: string;
  body: string;
}

// Lightweight post card used in profile / project aggregations
export interface PostCard {
  s: string;
  n: string;
  d: string;
  c: "story" | "field" | "tech";
  k: string;
  f: boolean;
  img: string;
}

export interface TeamMember {
  s: string;
  n: string;
  i: string;
  r: string;
  b: string;
  photo: string;
  t: string[];
  email?: string;
  linkedin: string;
  twitter: string;
  github: string;
  posts?: PostCard[];
  projects?: Project[];
}

export interface Post {
  s: string;
  c: "story" | "field" | "tech";
  k: string;
  f: boolean;
  n: string;
  d: string;
  u: string;
  img: string;
  b: string;
  author?: PostAuthor | null;
  contributors?: PostContributor[];
  projects?: PostAuthor[];
  people?: PostPerson[];
}

export interface Voice {
  n: string;
  i: string;
  r: string;
  q: string;
}

export const CL: Record<string, string> = {
  story: "STORIES",
  field: "FIELD NOTES",
  tech: "TECH",
};

export const TEAM: TeamMember[] = [
  {
    s: "kelvin-njenga", n: "Kelvin Njenga", i: "KN",
    r: "Senior Digital Transformation Officer",
    b: "Digital transformation specialist leading the implementation of digital solutions and data governance at KRCS.",
    photo: "", linkedin: "", twitter: "", github: "",
    t: ["Digital Transformation Strategy", "Digital Product Management"],
  },
  {
    s: "mitchell-njeri", n: "Mitchell Njeri", i: "MN",
    r: "Product Manager",
    b: "Product Manager leading full product lifecycle and user-centered digital solutions at KRCS.",
    photo: "", linkedin: "", twitter: "", github: "",
    t: ["Product Management & Product Lifecycle Development", "Stakeholder Engagement & Requirements Engineering"],
  },
  {
    s: "nigel-nasser", n: "Nigel Nasser", i: "NN",
    r: "Software Developer",
    b: "Software developer focused on backend systems, Frappe/ERPNext, and cloud services for humanitarian platforms.",
    photo: "", linkedin: "", twitter: "", github: "",
    t: ["Backend Development (Python, JavaScript, Java)", "Frappe & ERPNext Development"],
  },
  {
    s: "lennox-mwita", n: "Lennox Mwita", i: "LM",
    r: "Software Developer",
    b: "Full-stack developer experienced in fintech payments, data engineering, ERPNext, and cloud deployments.",
    photo: "", linkedin: "", twitter: "", github: "",
    t: ["Full-Stack Development (Golang, Python, TypeScript, React, Django, Flutter)", "Payments & Fintech Integrations (M-Pesa Daraja, PesaLink)"],
  },
];

export const POSTS: Post[] = [
  {
    s: "vmms",
    c: "tech",
    k: "FEATURED WORK", f: false,
    n: "Volunteer and Membership Management System (VMMS)",
    d: "A digital system for managing Kenya Red Cross volunteers and members, so branches can mobilise verified responders quickly.",
    u: "",
    img: "",
    b: `<p>VMMS is one of the featured digital products from the Kenya Red Cross Digital Transformation Department.</p>
<p>It gives volunteers access to accredited training modules and their deployment history from their phones, and helps branches mobilise verified volunteers during emergencies.</p>
<blockquote><p>With VMMS, our field volunteers access accredited training modules and track deployment history right from their phones, giving us unprecedented volunteer readiness during national emergencies.</p><footer><b>David Kiprop</b> · Senior Youth &amp; Volunteer Officer, Rift Valley Region</footer></blockquote>
<blockquote><p>The Volunteer and Membership Management System (VMMS) completely transformed how our branch deploys responders during flash floods. What used to take days of phone calls and manual rosters now takes minutes to mobilize verified volunteers.</p><footer><b>Hassan Mohamed</b> · County Operations Coordinator, Tana River Branch</footer></blockquote>`,
  },
  {
    s: "prequalification",
    c: "tech",
    k: "FEATURED WORK", f: false,
    n: "Prequalification Platform",
    d: "An online platform where local suppliers submit their compliance documentation for vendor evaluation.",
    u: "",
    img: "",
    b: `<p>The Prequalification Platform is one of the featured digital products from the Digital Transformation Department.</p>
<p>It digitises the vendor evaluation pipeline, with local suppliers submitting their compliance documentation online.</p>
<blockquote><p>Using the Prequalification Platform digitised our entire vendor evaluation pipeline. Local suppliers submit their compliance documentation online, cutting processing turnaround times by more than 70%.</p><footer><b>Faith Naisula</b> · Supply Chain &amp; Procurement Lead, Logistics Unit</footer></blockquote>`,
  },
  {
    s: "cbs",
    c: "field",
    k: "FEATURED WORK", f: false,
    n: "Community-Based Surveillance (CBS)",
    d: "Connects frontline health alerts from local health volunteers directly to rapid response teams.",
    u: "",
    img: "",
    b: `<p>Community-Based Surveillance (CBS) is one of the featured digital platforms from the Digital Transformation Department.</p>
<p>It links local health volunteers with rapid response teams, so early disease indicators reach them in real time.</p>
<blockquote><p>Integrating CBS with local health volunteers has fundamentally reduced our response latency during disease outbreaks, protecting thousands of families with timely health interventions.</p><footer><b>Grace Wambui</b> · Community Health Coordinator, Ministry of Health Partner Unit</footer></blockquote>
<blockquote><p>The Community-Based Surveillance (CBS) platform connects frontline health alerts directly to our rapid response teams. We receive early disease indicators in real-time before outbreaks escalate in remote pastoralist communities.</p><footer><b>Dr. Maria Santos</b> · Surveillance &amp; Health Lead, IFRC Health &amp; Care Team</footer></blockquote>`,
  },
  {
    s: "hazina",
    c: "field",
    k: "KEY INITIATIVE", f: false,
    n: "Hazina Early Warning Platform",
    d: "One of the key initiatives deployed in Kenya, supporting early warning and anticipatory action.",
    u: "",
    img: "",
    b: `<p>The Hazina Early Warning Platform is listed among the key initiatives deployed in Kenya.</p>
<p>Early warnings and pre-agreed action protocols let county teams act before climate shocks strike.</p>
<blockquote><p>The Anticipatory Action platform gives us early forecast triggers before climate shocks strike. Receiving early warnings and pre-agreed action protocols allows county teams to protect lives and livestock ahead of extreme weather.</p><footer><b>Dr. James Omondi</b> · Climate &amp; Preparedness Officer, Disaster Risk Management Unit</footer></blockquote>`,
  },
  {
    s: "bomacare",
    c: "story",
    k: "KEY INITIATIVE", f: false,
    n: "BomaCare Cash & Voucher Assistance",
    d: "A key initiative for cash and voucher assistance, deployed across Kenya.",
    u: "",
    img: "",
    b: `<p>BomaCare Cash &amp; Voucher Assistance is listed among the key initiatives deployed in Kenya.</p>
<p>Cash assistance lets emergency units support families early, before disasters displace them.</p>
<blockquote><p>Deploying the Anticipatory Action framework helped our emergency units disburse emergency cash support before severe flooding displaced families in the Tana Delta.</p><footer><b>Zainab Hussein</b> · Field Cash Assistance Officer, Humanitarian Cash Assistance Unit</footer></blockquote>`,
  },
];

export const VOICES: Voice[] = [
  {
    n: "Zainab Hussein",
    i: "ZH",
    r: "Field Cash Assistance Officer · Humanitarian Cash Assistance Unit",
    q: "Deploying the Anticipatory Action framework helped our emergency units disburse emergency cash support before severe flooding displaced families in the Tana Delta.",
  },
  {
    n: "Peter Ochieng",
    i: "PO",
    r: "Corporate Relations Manager · Digital Philanthropy Group",
    q: "The Donations Platform's instant digital receipting and campaign analytics have built high trust with corporate partners and individual donors across Kenya.",
  },
  {
    n: "Grace Wambui",
    i: "GW",
    r: "Community Health Coordinator · Ministry of Health Partner Unit",
    q: "Integrating CBS with local health volunteers has fundamentally reduced our response latency during disease outbreaks, protecting thousands of families with timely health interventions.",
  },
  {
    n: "David Kiprop",
    i: "DK",
    r: "Senior Youth & Volunteer Officer · Rift Valley Region",
    q: "With VMMS, our field volunteers access accredited training modules and track deployment history right from their phones, giving us unprecedented volunteer readiness during national emergencies.",
  },
];

export const IC: Record<string, string> = {
  story: `<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
  field: `<svg viewBox="0 0 24 24"><polyline points="3 12 7 12 10 4 14 20 17 12 21 12"/></svg>`,
  tech: `<svg viewBox="0 0 24 24"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,
};
