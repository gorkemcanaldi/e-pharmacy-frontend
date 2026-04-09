import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import style from "./Customers.module.css";
import type { Customer } from "../../types/Customer";
import { customerFetch } from "../../api/customers";
import { toast } from "react-toastify";
import { SyncLoader } from "react-spinners";
import Filter from "../../icons/Filter";

export default function Customers() {
  const { accessToken, loading, setLoading } = useAuth();
  const [name, setName] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [customers, setCustomers] = useState<Customer[]>([]);

  const fetchCustomers = async () => {
    if (!accessToken) return;
    setLoading(true);
    try {
      const data = await customerFetch(accessToken, name, page);
      setCustomers(data);
      setLoading(true);
    } catch {
      toast.error("customer verisi alınamadı");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const run = async () => {
      await fetchCustomers();
    };
    run();
  }, [accessToken, page]);
  console.log(customers);
  return (
    <div>
      {loading || !customers ? (
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
                  fetchCustomers();
                }
              }}
            />
            <button
              className={style.filter_button}
              onClick={() => {
                setPage(1);
                fetchCustomers();
              }}
            >
              <Filter />
              Filter
            </button>
          </div>
          <div className={style.tableWrapper}>
            <table className={style.table}>
              <caption>Customers Data</caption>
              <thead>
                <tr>
                  <th className={style.head_info}>User Info</th>
                  <th className={style.head_info}>Email</th>
                  <th className={style.head_info}>Address</th>
                  <th className={style.head_info}>Phone</th>
                  <th className={style.head_info}>Register date</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((o) => (
                  <tr key={o._id}>
                    <td className={style.name_photo}>
                      <img
                        src={o.image ? o.image : o.photo}
                        alt={o.name}
                        className={style.photo}
                      />
                      {o.name}
                    </td>
                    <td>{o.email}</td>
                    <td>{o.address}</td>
                    <td>+{o.phone}</td>
                    <td>
                      {new Date(o.register_date).toLocaleDateString("tr-TR")}
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
