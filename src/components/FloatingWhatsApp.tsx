export function FloatingWhatsApp() {
  const phone = "918981414833";
  const message = "Hi Vyombotics, I'd like to know more.";
  const href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <button
      type="button"
      onClick={() => {
        const w = window.open(href, "_blank", "noopener,noreferrer");
        if (!w) {
          if (window.top) {
            window.top.location.href = href;
          } else {
            window.location.href = href;
          }
        }
      }}
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 left-6 z-[60] grid h-16 w-16 cursor-pointer place-items-center rounded-full bg-[#128C7E] text-white ring-4 ring-white shadow-2xl shadow-black/60 transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
    >
      <span className="absolute -inset-1 inline-flex animate-ping rounded-full bg-white opacity-50" />
      <svg
        viewBox="0 0 32 32"
        className="relative h-8 w-8 fill-current drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
        aria-hidden="true"
      >
        <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.426-.545-.516-1.146-1.39-1.46-2.061a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.092-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.506 3.41 4.554 4.34.616.287 2.035.888 2.722.888.817 0 2.15-.515 2.478-1.318.13-.33.187-.787.187-1.123 0-.114 0-.243-.043-.315-.073-.146-.225-.196-.36-.244zM16.115 27.045a11.058 11.058 0 0 1-5.59-1.514l-3.91 1.027 1.045-3.81a11.057 11.057 0 0 1-1.673-5.866c0-6.103 4.964-11.067 11.066-11.067 6.103 0 11.067 4.964 11.067 11.066 0 6.103-4.964 11.066-11.066 11.066zm0-24.067C8.83 2.978 2.918 8.89 2.918 16.165c0 2.31.605 4.574 1.76 6.585L2 30.005l7.5-2.59a13.275 13.275 0 0 0 6.615 1.788c7.286 0 13.198-5.912 13.198-13.198C29.313 8.89 23.4 2.978 16.115 2.978z" />
      </svg>
    </button>
  );
}
