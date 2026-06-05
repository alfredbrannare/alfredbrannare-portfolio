interface SectionHeaderProps {
  title: string;
  description?: string;
}

export default function SectionHeader({
  title,
  description,
}: SectionHeaderProps) {
  return (
    <div>
      <h2
        className="text-3xl font-bold text-brand-orange
      text-shadow-[1px_1px_0_rgba(0,0,0,0.7)]"
      >
        {title}
      </h2>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
}
