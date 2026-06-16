function Modal({
  open,
  children,
}) {

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 backdrop-blur">

      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#1A1A2E] p-8">

        {children}

      </div>

    </div>
  );
}

export default Modal;