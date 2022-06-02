import React, { useState } from "react";
import styles from "../../styles/misc/Menu.module.css";

const Menu = ({ isActive }: { isActive: boolean }) => {
  const [active, setActive] = useState<number>();

  return (
    <div className={`${styles.menu} ${isActive ? styles.menu__active : ""}`}>
      <div
        className={`${styles.menu__option} ${
          active === 0 ? styles.menu__option__active : ""
        }`}
        onClick={() => setActive(0)}
      >
        <div className={styles.menu__option__title}>Basket</div>
      </div>
      <div
        className={`${styles.menu__option} ${
          active === 1 ? styles.menu__option__active : ""
        }`}
        onClick={() => setActive(1)}
      >
        <div className={styles.menu__option__title}>Wishlist</div>
      </div>
      <div
        className={`${styles.menu__option} ${
          active === 2 ? styles.menu__option__active : ""
        }`}
        onClick={() => setActive(2)}
      >
        <div className={styles.menu__option__title}>Account</div>
      </div>
      <div
        className={`${styles.menu__option} ${
          active === 3 ? styles.menu__option__active : ""
        }`}
        onClick={() => setActive(3)}
      >
        <div className={styles.menu__option__title}>Language</div>
      </div>
    </div>
  );
};

export default Menu;
