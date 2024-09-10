import styles from '../styles/GameRule.module.css';

const GameRule: React.FC = () => {
  return (
    <div className={styles.gameRule}>
      <div>
        <ul>遊戲規則：
          <li>每一直行、每一橫列、每一個色塊區域皆必須恰有一個 ♛。</li>
          <li>任何兩個 ♛ 不能相鄰，對角線也不行。</li>
          <li>正確放置完所有 ♛ 即過關。</li>
        </ul>
        <br />
        <ul>操作方式：
          <li>點擊第一次放置 ×，點擊第二次放置 ♛，點擊第三次清空。</li>
          <li> × 僅為輔助，不一定要放置 ×。</li>
        </ul>
      </div>
    </div>
  );
};

export default GameRule;
