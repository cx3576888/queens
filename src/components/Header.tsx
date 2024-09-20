import type { RootState } from '../state/store';
import { useSelector } from 'react-redux';

import styles from '../styles/Header.module.css';

const Header: React.FC = () => {
  const { puzzleNumber } = useSelector((state: RootState) => state.gameSettings);

  return (
    <header className={styles.header}>
      <h1 className={styles.headerText}>Queens #{puzzleNumber}</h1>
      <nav className={styles.nav}>
        <ul>
          <li className={styles.navMenuItem}>
            <a href="https://github.com/cx3576888/queens" target="_blank">
              <img className={styles.navIcon} src="/github-mark-white.svg" title="Leave a star if you're having fun!" />
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
