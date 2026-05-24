interface TenantBrandingProps {
  company: string;
  theme: string;
}

export default function TenantBranding({
  company,
  theme,
}: TenantBrandingProps) {
  return (
    <div className="rounded-2xl bg-gradient-to-r from-[#0c831f] to-[#ff4f8b] p-5 text-white shadow-sm">
      <p className="text-xs font-black uppercase tracking-wide text-white/70">
        Multi Tenant
      </p>
      <h2 className="mt-2 text-2xl font-black text-white">{company}</h2>
      <p className="mt-2 text-sm text-white/75">
        Active theme: {theme}. Storefront and admin accents stay aligned to the
        project green and pink tone.
      </p>
    </div>
  );
}
