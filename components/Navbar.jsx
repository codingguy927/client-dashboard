import SignInButton from "./SignInButton";

export default function Navbar() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 shadow-md sticky top-0 z-40">
      <h2 className="text-xl font-semibold">Dashboard</h2>
      <SignInButton />
    </header>
  );
}
