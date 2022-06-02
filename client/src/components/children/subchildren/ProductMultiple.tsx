import React, { useEffect, useState } from "react";
import styles from "../../../styles/children/subchildren/ProductMultiple.module.css";
import IProduct from "../../../types/Product";
import { RiShoppingBagLine } from "react-icons/ri";
import { RiShoppingBagFill } from "react-icons/ri";
import { FaHeart } from "react-icons/fa";
import { FaHeartBroken } from "react-icons/fa";
import { IconContext } from "react-icons";
import { MdOutlineStarBorderPurple500 } from "react-icons/md";

const ProductMultiple = ({
  product,
  is_loaded_lazy,
  refMultiple,
}: {
  product: IProduct;
  is_loaded_lazy: boolean;
  refMultiple: React.RefObject<HTMLDivElement> | undefined;
}) => {
  const [isHovering, setIsHovering] = useState<boolean>(false);
  return (
    <div
      ref={refMultiple}
      className={styles.product}
      onMouseOver={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <h2>{product.name}</h2>
      <div className={styles.product__content}>
        <img
          src={product.image}
          alt={product.name}
          loading={is_loaded_lazy ? "lazy" : "eager"}
        />
        <div
          className={`${styles.product__content__btns} ${
            isHovering ? styles.product__content__btns__active : ""
          }`}
        >
          <button type="button">
            <IconContext.Provider
              value={{ className: styles.product__content__btns__icon }}
            >
              <RiShoppingBagLine />
            </IconContext.Provider>
          </button>
          <button type="button">
            <IconContext.Provider
              value={{ className: styles.product__content__btns__icon }}
            >
              <FaHeartBroken />
            </IconContext.Provider>
          </button>
        </div>
      </div>
    </div>
  );
};

// Add memoizing to the products, since they are pure functional components
// so we can improve our app's performance. For example, when we modify our
// products array, there's no need to update the already rendered
// products, since they will stay the same.
export default React.memo(ProductMultiple);
