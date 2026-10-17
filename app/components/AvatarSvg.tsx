type Config = {
  bg: string;
  skin: string;
  hair: string;
  shirt: string;
  h: "short" | "bun" | "long" | "wavy" | "bob" | "curly";
};

const PC: Config[] = [
  { bg: "#ececec", skin: "#8d5524", hair: "#111", shirt: "#333", h: "short" },
  { bg: "#cfd3d8", skin: "#c68642", hair: "#1a1a1a", shirt: "#fff", h: "short" },
  { bg: "#f3b9b4", skin: "#e0ac69", hair: "#1a1a1a", shirt: "#e9c9a0", h: "bun" },
  { bg: "#2b2b30", skin: "#d9a37a", hair: "#2a1a14", shirt: "#6b7fb5", h: "long" },
  { bg: "#b3261e", skin: "#6b4226", hair: "#111", shirt: "#fff", h: "curly" },
  { bg: "#d7dbe0", skin: "#f1c9a5", hair: "#4a2a1a", shirt: "#b3202a", h: "wavy" },
  { bg: "#fde2e0", skin: "#f1c9a5", hair: "#8a5a3a", shirt: "#333", h: "bob" },
];

export function getAvatarConfig(index: number): Config {
  return PC[index % PC.length];
}

export default function AvatarSvg({ config, label }: { config: Config; label: string }) {
  const { bg, skin, hair, shirt, h } = config;

  let bun = "";
  let extra = "";
  const front = `<path d="M31 50Q31 26 50 26Q69 26 69 50Q62 38 50 38Q38 38 31 50Z" fill="${hair}"/>`;

  if (h === "bun") bun = `<circle cx="50" cy="22" r="9" fill="${hair}"/>`;
  else if (h === "long" || h === "wavy") extra = `<path d="M28 54Q26 24 50 24Q74 24 72 54L75 100L25 100Z" fill="${hair}"/>`;
  else if (h === "bob") extra = `<path d="M29 50Q28 24 50 24Q72 24 71 50L72 72L28 72Z" fill="${hair}"/>`;
  else if (h === "curly") extra = `<g fill="${hair}"><circle cx="36" cy="30" r="11"/><circle cx="50" cy="25" r="12"/><circle cx="64" cy="30" r="11"/><circle cx="31" cy="44" r="9"/><circle cx="69" cy="44" r="9"/></g>`;

  const svgStr = `<svg viewBox="0 0 100 120" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${label}"><rect width="100" height="120" fill="${bg}"/>${bun}${extra}<path d="M6 120Q10 88 50 84Q90 88 94 120Z" fill="${shirt}"/><rect x="43" y="68" width="14" height="20" fill="${skin}"/><ellipse cx="50" cy="52" rx="19" ry="23" fill="${skin}"/>${front}<circle cx="43" cy="53" r="1.7" fill="#222"/><circle cx="57" cy="53" r="1.7" fill="#222"/><path d="M44 62Q50 68 56 62" stroke="#222" stroke-width="1.6" fill="none" stroke-linecap="round"/></svg>`;

  return <div dangerouslySetInnerHTML={{ __html: svgStr }} style={{ width: "100%", height: "100%" }} />;
}

export { PC };
