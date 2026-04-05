import { useLocation, Link } from "react-router-dom";
import DashboardIcon from "../../icons/DashboardIcon";
import OrderIcon from "../../icons/OrderIcon";
import ProductIcon from "../../icons/ProductIcon";
import SupplierIcon from "../../icons/SupplierIcon";
import CustomerIcon from "../../icons/CustomerIcon";
import style from "./SideBar.module.css";
interface SidebarProps {
  sideOpen: boolean;
  toggleSidebar: () => void;
  handleLogout: () => void;
}
export default function Sidebar({ sideOpen, toggleSidebar }: SidebarProps) {
  const location = useLocation();

  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  const links = [
    { path: "/dashboard", icon: DashboardIcon },
    { path: "/orders", icon: OrderIcon },
    { path: "/products", icon: ProductIcon },
    { path: "/suppliers", icon: SupplierIcon },
    { path: "/customers", icon: CustomerIcon },
  ];

  return (
    <>
      <div
        className={sideOpen ? `${style.sidebar}  ${style.open}` : style.sidebar}
      >
        <div className={style.close_side}>
          <button onClick={toggleSidebar} className={style.side_off}>
            X
          </button>
        </div>
        <aside>
          <nav>
            <ul className={style.ul_}>
              {links.map(({ path, icon: Icon }) => (
                <Link to={path} key={path} className={style.li_}>
                  <Icon
                    className={
                      location.pathname === path
                        ? `${style.icon} ${style.active}`
                        : style.icon
                    }
                  />
                </Link>
              ))}
            </ul>
          </nav>
          <div className={style.logout_side}>
            <img src="/logout.svg" alt="" />
          </div>
        </aside>
      </div>
    </>
  );
}
