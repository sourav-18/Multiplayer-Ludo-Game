function BackgroundGlow() {
  return (
    <>
      <div className="absolute left-20 top-20 h-80 w-80 rounded-full bg-blue-500/10 blur-[120px]" />

      <div className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-purple-500/10 blur-[120px]" />
    </>
  );
}

export default BackgroundGlow;