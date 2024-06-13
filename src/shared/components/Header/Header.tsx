import styles from "./Header.module.scss";
import logo from "../../../../public/Logo.png";
import Image from "next/image";
import { RxHamburgerMenu } from "react-icons/rx";

const Header = () => {
  return (
    <header className={styles.layout}>
      <nav className={styles.nav}>
        <li className={styles.logo}>
          <Image src={logo} alt="logo" />
          <p>떨면뭐하니</p>
        </li>
        <li>모의면접</li>
        <li>내 프로필</li>
      </nav>
      <div className={styles.menu}>
        {/* TODO: src를 user의 profile로 교체할 것 */}
        <Image src="https://cdn-icons-png.flaticon.com/512/4715/4715330.png" width={39} height={39} alt="profile" />
        <button className={styles.hamburger}>
          <RxHamburgerMenu size={32} />
        </button>
      </div>
    </header>
  );
};

export default Header;
