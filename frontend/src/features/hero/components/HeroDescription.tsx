export default function HeroDescription() {
  return (
    <div className="flex flex-col text-center items-center lg:flex-row lg:text-start">
      <div className="flex-1 flex flex-col justify-center space-y-4">
        <h1 className="text-5xl font-bold text-brand-orange text-shadow-[1px_1px_0_rgba(0,0,0,0.7)]">
          Hello,
        </h1>
        <p className="text-2xl font-semibold">
          My name is{' '}
          <span className="text-brand-orange font-semibold text-shadow-[1px_1px_0_rgba(0,0,0,0.7)]">
            Alfred
          </span>
          , a{' '}
          <span className="text-brand-orange font-semibold text-shadow-[1px_1px_0_rgba(0,0,0,0.7)]">
            Software Developer
          </span>{' '}
          specializing in{' '}
          <span className="text-brand-orange font-semibold text-shadow-[1px_1px_0_rgba(0,0,0,0.7)]">
            Java
          </span>{' '}
          and{' '}
          <span className="text-brand-orange font-semibold text-shadow-[1px_1px_0_rgba(0,0,0,0.7)]">
            JavaScript
          </span>
        </p>
        <div className="space-y-2 text-muted-foreground">
          <p>
            I&apos;m passionate about building a strong foundation in both
            frontend and backend technologies to create effective and
            user-friendly applications.
          </p>
          <p>I&apos;m eager to continue expanding my expertise.</p>
        </div>
      </div>
    </div>
  );
}
