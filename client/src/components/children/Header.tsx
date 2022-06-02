import React, { useState } from "react";
import styles from "../../styles/children/Header.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import Menu from "../misc/Menu";
import { IoMdArrowDropdown } from "react-icons/io";
import { IconContext } from "react-icons";
import menu_icon from "../../assets/misc/katana-menu.svg";

const Header = () => {
  /* Need navigate to return to main page */
  const navigate = useNavigate();

  /* Handles what happens when menu is clicked */
  const [menuOpened, setMenuOpened] = useState<boolean>(false);
  const handleClick = () => {
    setDropdownOpened(false);
    setMenuOpened(!menuOpened);
  };

  /* Handles search */
  const [input, setInput] = useState<string>("");

  /* Handle current page */
  const { type } = useParams();

  /* Handles what happens when dropdown is clicked*/
  const [dropdownOpened, setDropdownOpened] = useState<boolean>(false);
  const handleDropdown = () => {
    setMenuOpened(false);
    setDropdownOpened(!dropdownOpened);
  };

  /* Handles when user submits a search */
  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {};

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.title} role="head-to-main-page">
        <h1>Sword Shop</h1>
      </Link>
      <div className={styles.bottom}>
        <form
          className={styles.options}
          onSubmit={(e) => handleSearchSubmit(e)}
        >
          <label htmlFor="search">Search Items</label>
          <input
            type="search"
            id="search"
            name="search"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={"Search for Longswords, Katanas & more..."}
          />
        </form>
        <div
          className={`${styles.options} ${
            menuOpened ? styles.options__menu__opened : ""
          }`}
          onClick={handleClick}
          role="menu"
        >
          <img src={menu_icon} alt={"Katana Menu"} loading={"eager"} />
        </div>
        <div
          className={`${styles.options} ${
            dropdownOpened ? styles.options__dropdown__open : ""
          }`}
          onClick={handleDropdown}
          role="navigation"
        >
          <IconContext.Provider
            value={{
              color: "white",
              className: styles.options__dropdown__btn,
            }}
          >
            <IoMdArrowDropdown />
          </IconContext.Provider>
        </div>
        <div
          className={`${styles.dropdown} ${
            dropdownOpened ? styles.dropdown__active : ""
          }`}
        >
          <button
            onClick={() => navigate("/item/broadsword")}
            className={
              type === "broadsword" ? styles.dropdown__active__btn : ""
            }
          >
            Broadswords
          </button>
          <button
            onClick={() => navigate("/item/cutlass")}
            className={type === "cutlass" ? styles.dropdown__active__btn : ""}
          >
            Cutlasses
          </button>
          <button
            onClick={() => navigate("/item/katana")}
            className={type === "katana" ? styles.dropdown__active__btn : ""}
          >
            Katanas
          </button>
          <button
            onClick={() => navigate("/item/knife")}
            className={type === "knife" ? styles.dropdown__active__btn : ""}
          >
            Knifes
          </button>
          <button
            onClick={() => navigate("/item/longsword")}
            className={type === "longsword" ? styles.dropdown__active__btn : ""}
          >
            Longswords
          </button>
          <button
            onClick={() => navigate("/item/rapier")}
            className={type === "rapier" ? styles.dropdown__active__btn : ""}
          >
            Rapiers
          </button>
          <button
            onClick={() => navigate("/item/wakizashi")}
            className={type === "wakizashi" ? styles.dropdown__active__btn : ""}
          >
            Wakizashis
          </button>
        </div>
        <Menu isActive={menuOpened} />
      </div>
    </header>
  );
};

export default Header;
