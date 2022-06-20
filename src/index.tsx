import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router-dom';

import {ThemeContext} from 'common/context';
import {Theme} from 'common/types';
import {history} from 'common/routing';
import colors from 'common/styles/_export.module.scss';
import {CountriesProvider} from 'services/countries/countries-context';
import {StaticsCountryProvider} from 'services/statistics-country';

import {App} from './app';
import './index.scss';
import './i18n';

function Root() {
  const [theme, setTheme] = useState<Theme>('light');

  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
      document.documentElement.style.setProperty('--main-background-color', colors.white);
      document.documentElement.style.setProperty('--background-secondary', colors.amber);
      document.documentElement.style.setProperty('--main-color', colors.black);
      document.documentElement.style.setProperty('--main-border-color', colors.blue);
      document.documentElement.style.setProperty('color-scheme', 'light');
    } else {
      setTheme('dark');
      document.documentElement.style.setProperty('--main-background-color', colors.black120);
      document.documentElement.style.setProperty('--background-secondary', colors.black80);
      document.documentElement.style.setProperty('--main-color', colors.gray30);
      document.documentElement.style.setProperty('--main-border-color', colors.black60);
      document.documentElement.style.setProperty('color-scheme', 'dark');
    }
  };

  useEffect(() => {
    const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)');
    if (darkThemeMq.matches) {
      setTheme('dark');
      toggleTheme();
    }
  }, []);

  return (
    <Router history={history}>
      <ThemeContext.Provider value={{theme, toggleTheme}}>
        <CountriesProvider>
          <StaticsCountryProvider>
            <App />
          </StaticsCountryProvider>
        </CountriesProvider>
      </ThemeContext.Provider>
    </Router>
  );
}

ReactDOM.render(<Root />, document.getElementById('root'));
