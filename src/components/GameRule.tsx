import styles from '../styles/GameRule.module.css';

const GameRule: React.FC = () => {
  return (
    <div className={styles.gameRule}>
      <div>
        <ul>遊戲規則：
          <li>每一直行、每一橫列、每一個色塊區域皆必須恰有一個皇后。</li>
          <li>任何兩個皇后不能相鄰，對角線也不行。</li>
          <li>正確放置完所有皇后即過關。</li>
        </ul>
        <br />
        <ul>操作方式：
          <li>點擊第一次放置X，點擊第二次放置皇后，點擊第三次清空。</li>
          <li>X僅為輔助，不一定要放置X。</li>
        </ul>
      </div>
    </div>
  );
};

export default GameRule;
