import type { RootState } from '../state/store';
import { useSelector } from 'react-redux';

import styles from '../styles/Header.module.css';

const Header: React.FC = () => {
  const { puzzleNumber } = useSelector((state: RootState) => state.gameSettings);

  return (
    <header className={styles.header}>
      <h1 className={styles.headerText}>Queens #{puzzleNumber}</h1>
      <nav>
        <ul className={styles.navMenu}>
          <li>
            <a href="https://www.linkedin.com/in/chun-yen-liu-61851728b" target="_blank">
              <img className={styles.navIcon} src="/LI-In-Bug.png" alt="LinkedIn logo" title="Contact me" />
            </a>
          </li>
          <li>
            <a href="https://github.com/cx3576888/queens" target="_blank">
              <img className={styles.navIcon} src="/github-mark-white.svg" alt="GitHub logo" title="Leave a star if you're having fun!" />
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
