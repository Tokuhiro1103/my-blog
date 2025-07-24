const Header = () => (
  <header className="w-full bg-green-600 text-white py-4 px-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
    <h1 className="text-2xl font-bold mb-2 sm:mb-0">
      <a href="/">Tokkunのブログ</a>
    </h1>
    <nav>
      <ul className="flex gap-6 text-lg">
        <li>
          <a href="/" className="hover:underline">Home</a>
        </li>
        <li>
          <a href="/about" className="hover:underline">About</a>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header; 