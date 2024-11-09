function Logo() {
  return (
    <a
      href="/"
      className="flex gap-2 h-11 items-center"
    >
      <img
        src="/logo.svg"
        alt=""
        className="h-full object-cover"
      />
      <span>Redrama</span>
    </a>
  );
}

export default Logo;
