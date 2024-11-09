import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h2>Esta pagina no existe</h2>
      <p>Por favor, comienza de nuevo</p>
      <Link href="/">Regresar al inicio</Link>
    </div>
  );
}
