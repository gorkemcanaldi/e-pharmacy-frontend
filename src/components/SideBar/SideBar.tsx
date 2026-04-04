import { useLocation, Link } from "react-router-dom";
import DashboardIcon from "../../icons/DashboardIcon";
import OrderIcon from "../../icons/OrderIcon";
import ProductIcon from "../../icons/ProductIcon";
import SupplierIcon from "../../icons/SupplierIcon";
import CustomerIcon from "../../icons/CustomerIcon";
import style from "./SideBar.module.css";

export default function Sidebar() {
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
    <aside className={style.sidebar}>
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
    </aside>
  );
}
