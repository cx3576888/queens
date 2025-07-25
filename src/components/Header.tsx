import { usePuzzleNumber } from '../hooks/usePuzzleNumber';

import styles from '../styles/Header.module.css';

const Header: React.FC = () => {
  const { puzzleNumber } = usePuzzleNumber();

  return (
    <header className={styles.header}>
      <h1 className={styles.headerText}>Queens #{puzzleNumber}</h1>
      <nav>
        <ul className={styles.navMenu}>
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
