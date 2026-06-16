function AnimatedBackground() {
  return (
    <>
      <div className="absolute left-20 top-20 h-96 w-96 rounded-full bg-red-500/10 blur-[180px]" />

      <div className="absolute right-20 top-40 h-96 w-96 rounded-full bg-blue-500/10 blur-[180px]" />

      <div className="absolute bottom-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-yellow-500/10 blur-[180px]" />
    </>
  );
}

export default AnimatedBackground;