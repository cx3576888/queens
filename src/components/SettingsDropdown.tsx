import type { RootState } from '../state/store';
import { useDispatch, useSelector } from 'react-redux';
import { setEnableAutoX, setShowErrors } from '../state/slices/gameSettingsSlice';
import { useEffect, useRef, useState } from 'react';

import styles from '../styles/SettingsDropdown.module.css';

const SettingsDropdown: React.FC = () => {
  const { enableAutoX, showErrors } = useSelector((state: RootState) => state.gameSettings);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const className = styles.dropdownList + (open ? '' : ' ' + styles.hide);

  const toggleDropdown = () => {
    setOpen(!open);
  };

  const handleAutoX = (evt: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setEnableAutoX(evt.target.checked));
  };

  const handleShowErrors = (evt: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setShowErrors(evt.target.checked));
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      // how!!
      event.stopPropagation();
      console.log('click outisde');
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.settingsDropdown} ref={dropdownRef}>
      <span className={styles.cogIcon} onClick={toggleDropdown}></span>
      <ul className={className}>
        <li>
          <label className={styles.dropdownItemLabel}>
            <input className={styles.dropdownItemCheckbox} type="checkbox" checked={enableAutoX} onChange={handleAutoX} />
            Auto-place ×'s
          </label>
        </li>
        <li>
          <label className={styles.dropdownItemLabel}>
            <input className={styles.dropdownItemCheckbox} type="checkbox" checked={showErrors} onChange={handleShowErrors} />
            Show errors
          </label>
        </li>
      </ul>
    </div>
  );
};

export default SettingsDropdown;
