import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import type { product } from "../../types/Product";
import style from "./Products.module.css";
import { getProducts } from "../../api/products";
import { toast } from "react-toastify";
import Filter from "../../icons/Filter";
import EditIcon from "../../icons/EditIcon";
import DeleteIcon from "../../icons/DeleteIcon";
import Modal from "../../components/Modal/Modal";

export default function Products() {
  const { accessToken, setLoading } = useAuth();
  const [name, setName] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [products, setProducts] = useState<product[]>([]);

  const fetchProducts = async () => {
    if (!accessToken) return;
    setLoading(true);
    try {
      const data = await getProducts(accessToken, name, page);
      setProducts(data);
      setLoading(false);
    } catch {
      toast.error("Products verisi alınamadı");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const run = async () => {
      await fetchProducts();
    };

    run();
  }, [accessToken, page]);
  console.log(products);

  return (
    <div className={style.products}>
      <div className={style.filter_div}>
        <div className={style.filter_div_}>
          <input
            type="text"
            value={name}
            placeholder="Product Name"
            className={style.filter_inp}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setPage(1);
                fetchProducts();
              }
            }}
          />
          <button
            className={style.filter_button}
            onClick={() => {
              setPage(1);
              fetchProducts();
            }}
          >
            <Filter />
            Filter
          </button>
        </div>
        <div className={style.add_div}>
          <div className={style.plus_div}>+</div>
          <button className={style.add_button}>Add a new product</button>
        </div>
      </div>
      <div className={style.tableWrapper}>
        <table className={style.table}>
          <caption>All orders</caption>
          <thead>
            <tr>
              <th className={style.head_info}>Product Info</th>
              <th className={style.head_info}>Category</th>
              <th className={style.head_info}>Stock</th>
              <th className={style.head_info}>Suppliers</th>
              <th className={style.head_info}>Price</th>
              <th className={style.head_info}>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((o) => (
              <tr key={o.id}>
                <td className={style.name_photo}>{o.name}</td>
                <td>{o.category}</td>
                <td>{o.stock}</td>
                <td>{new Date(o.suppliers).toLocaleDateString("tr-TR")}</td>
                <td>{o.price}</td>
                <td>
                  <span className={style.edit_}>
                    <EditIcon />
                  </span>
                  <span className={style.delete_}>
                    <DeleteIcon />
                  </span>
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

      <div>
        <Modal />
      </div>
    </div>
  );
}
