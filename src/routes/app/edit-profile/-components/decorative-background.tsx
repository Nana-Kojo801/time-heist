export function DecorativeBackground() {
  return (
    <>
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,18,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(18,18,18,.05)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none opacity-30 z-0" />
    </>
  )
} 