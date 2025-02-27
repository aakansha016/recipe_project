import Logo from "./Logo";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-secondary">
      <Logo />
      <div className="space-x-6 text-primary font-semibold">
        <a href="#" className="hover:underline">Create</a>
        <a href="#" className="hover:underline">Ideas</a>
        <a href="#" className="hover:underline">Explore</a>
      </div>
      <button className="bg-primary text-secondary px-4 py-2 rounded">
        Login/Register
      </button>
    </nav>
  );
}
