import { useEffect, useState } from 'react';

const Settings = () => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'system';
  });

  useEffect(() => {
    const root = document.documentElement;

    if (theme === 'light') {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else if (theme === 'dark') {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.removeItem('theme');
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  }, [theme]);

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
  };

  return (
    <div className=" w-full h-full ">
      <div className=" w-full h-full flex flex-col  ">
        <button
          onClick={() => handleThemeChange('light')}
          className={`px-4 py-3    dark:text-[#b5b8c5]  dark:bg-[#040824] hover:dark:bg-[#0f143d] hover:bg-[#c2c2c2] ${theme === 'light' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Light Mode
        </button>
        <button
          onClick={() => handleThemeChange('dark')}
          className={`px-4 py-3  bg-[#eff4fb] dark:text-[#b5b8c5]  dark:bg-[#040824] hover:dark:bg-[#0f143d] hover:bg-[#c2c2c2] ${theme === 'dark' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Dark Mode
        </button>
        <button
          onClick={() => handleThemeChange('system')}
          className={`px-4 py-3  bg-[#eff4fb] dark:text-[#b5b8c5]  dark:bg-[#040824] hover:dark:bg-[#0f143d] hover:bg-[#c2c2c2] ${theme === 'system' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          System Default
        </button>
      </div>
    </div>
  );
};

export default Settings;
