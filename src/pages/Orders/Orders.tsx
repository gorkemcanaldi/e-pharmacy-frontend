import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import style from "./Orders.module.css";
import Filter from "../../icons/Filter";
import { orderFetch } from "../../api/orders";
import { toast } from "react-toastify";
import { SyncLoader } from "react-spinners";
import type { Order } from "../../types/Order";

export default function Orders() {
  const { accessToken, loading, setLoading } = useAuth();
  const [name, setName] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchOrders = async () => {
    if (!accessToken) return;
    setLoading(true);
    try {
      const data = await orderFetch(accessToken, name, page);
      setOrders(data);
      setLoading(false);
    } catch {
      toast.error("order verisi alınamadı");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const run = async () => {
      await fetchOrders();
    };

    run();
  }, [accessToken, page]);
  return (
    <div>
      {loading || !orders ? (
        <div>
          <SyncLoader color="#59B17A" />
        </div>
      ) : (
        <>
          <div className={style.filter_div}>
            <input
              type="text"
              value={name}
              placeholder="User Name"
              className={style.filter_inp}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setPage(1);
                  fetchOrders();
                }
              }}
            />
            <button
              className={style.filter_button}
              onClick={() => {
                setPage(1);
                fetchOrders();
              }}
            >
              <Filter />
              Filter
            </button>
          </div>
          <div className={style.tableWrapper}>
            <table className={style.table}>
              <caption>All orders</caption>
              <thead>
                <tr>
                  <th className={style.head_info}>User Info</th>
                  <th className={style.head_info}>Address</th>
                  <th className={style.head_info}>Products</th>
                  <th className={style.head_info}>Order Date</th>
                  <th className={style.head_info}>Price</th>
                  <th className={style.head_info}>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o._id}>
                    <td className={style.name_photo}>
                      <img src={o.photo} alt={o.name} className={style.photo} />
                      {o.name}
                    </td>
                    <td>{o.address}</td>
                    <td>{o.products}</td>
                    <td>
                      {new Date(o.order_date).toLocaleDateString("tr-TR")}
                    </td>
                    <td>{o.price}</td>
                    <td
                      className={`${style.status} ${style[`status_${o.status.toLowerCase()}`]}`}
                    >
                      {o.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <div className={style.pagination}>
              {[1, 2, 3, 4, 5].map((p) => (
                <div
                  key={p}
                  className={`${style.pageDot} ${page === p ? style.activeDot : ""}`}
                  onClick={() => setPage(p)}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
