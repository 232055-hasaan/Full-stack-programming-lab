import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-blue-700 text-white text-center p-4">
      <h1 className="text-2xl font-bold">My Next.js App</h1>
      <nav className="mt-2">
        <Link href="/" className="mr-4 hover:underline">
          Home
        </Link>
        <Link href="/about" className="hover:underline">
          About
        </Link>
      </nav>
    </header>
  );
}