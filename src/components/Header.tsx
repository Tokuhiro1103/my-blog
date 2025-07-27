"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Header = () => {
  const [searchInput, setSearchInput] = useState('');
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchInput.trim()) {
      router.push(`/?search=${encodeURIComponent(searchInput.trim())}`);
    }
  };

  const handleSearchClick = () => {
    if (searchInput.trim()) {
      router.push(`/?search=${encodeURIComponent(searchInput.trim())}`);
    }
  };

  return (
    <header className="w-full bg-green-600 text-white py-4 px-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            <a href="/">Tokkunのブログ</a>
          </h1>
          <nav className="lg:hidden">
            <ul className="flex gap-6 text-lg">
              <li>
                <a href="/" className="hover:underline">Home</a>
              </li>
              <li>
                <a href="/about" className="hover:underline">About</a>
              </li>
            </ul>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <nav className="hidden lg:block">
            <ul className="flex gap-6 text-lg">
              <li>
                <a href="/" className="hover:underline">Home</a>
              </li>
              <li>
                <a href="/about" className="hover:underline">About</a>
              </li>
            </ul>
          </nav>
          
          <div className="flex-1 lg:flex-none lg:w-80">
            <div className="flex items-stretch">
              {isClient ? (
                <>
                  <input
                    type="text"
                    value={searchInput}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="記事を検索..."
                    className="border px-3 py-2 rounded-l w-full focus:outline-none text-gray-800 bg-white"
                    aria-label="記事を検索"
                  />
                  <button
                    onClick={handleSearchClick}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-r flex items-center justify-center transition-colors"
                    aria-label="検索"
                    tabIndex={0}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
                    </svg>
                  </button>
                </>
              ) : (
                <div className="flex items-center w-full">
                  <div className="border px-3 py-2 rounded-l w-full bg-gray-100 text-gray-500">
                    記事を検索...
                  </div>
                  <div className="bg-gray-400 text-white px-4 py-2 rounded-r flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 