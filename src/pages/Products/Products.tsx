import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import type { product } from "../../types/Product";
import style from "./Products.module.css";
import {
  deleteProduct,
  getProducts,
  productCreate,
  updateProduct,
} from "../../api/products";
import { toast } from "react-toastify";
import Filter from "../../icons/Filter";
import EditIcon from "../../icons/EditIcon";
import DeleteIcon from "../../icons/DeleteIcon";
import Modal from "../../components/Modal/Modal";
import {
  productSchema,
  type ProductSchemaType,
} from "../../validation/productValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ArrowIcon from "../../icons/ArrowIcon";

export default function Products() {
  const { accessToken, setLoading } = useAuth();
  const [name, setName] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [products, setProducts] = useState<product[]>([]);
  const [arrowUp, setArrowUp] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<product | null>(null);
  const categories = [
    "Medicine",
    "Heart",
    "Head",
    "Hand",
    "Leg",
    "Dental Care",
    "Skin Care",
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    getFieldState,
  } = useForm<ProductSchemaType>({
    resolver: zodResolver(productSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: ProductSchemaType) => {
    if (!accessToken) return;

    try {
      if (selectedProduct) {
        const res = await updateProduct(accessToken, selectedProduct._id, data);
        toast.success(res.message ?? "Ürün güncellendi");
      } else {
        const res = await productCreate(accessToken, data);
        toast.success(res.message ?? "Ürün eklendi");
      }
      setOpen(false);
      setSelectedProduct(null);
      reset();
      fetchProducts();
    } catch {
      toast.error("İşlem başarısız");
    }
  };

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
  const emptyForm: ProductSchemaType = {
    name: "",
    suppliers: "",
    stock: 0,
    price: 0,
    category: "" as ProductSchemaType["category"],
  };

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
        <div onClick={() => setOpen(true)} className={style.add_div}>
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
              <tr key={o._id}>
                <td className={style.name_photo}>{o.name}</td>
                <td>{o.category}</td>
                <td>{o.stock}</td>
                <td>{o.suppliers}</td>
                <td>{o.price.toFixed(2)}</td>

                <td>
                  <span
                    className={style.edit_}
                    onClick={() => {
                      setSelectedProduct(o);
                      reset(o);
                      setOpen(true);
                    }}
                  >
                    <EditIcon />
                  </span>
                  <span
                    className={style.delete_}
                    onClick={async () => {
                      if (!accessToken) return;
                      try {
                        await deleteProduct(accessToken, o._id);
                        toast.success("Ürün silindi");
                        fetchProducts(); // listeyi yenile
                      } catch {
                        toast.error("Silme başarısız");
                      }
                    }}
                  >
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

      <Modal
        isOpen={open}
        onClose={() => {
          setOpen(false);
          setSelectedProduct(null);
          reset(emptyForm);
        }}
        title={selectedProduct ? "Edit product" : "Add a new product"}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={style.form_div}>
            <div>
              <input
                type="text"
                placeholder="Product Info"
                className={`${style.modal_input} ${!errors.name && watch("name") ? style.success_ : ""}`}
                {...register("name")}
              />
              {errors.name && (
                <span className={style.error_message}>
                  {errors.name.message}
                </span>
              )}
            </div>

            <div className={style.selectWrapper}>
              <select
                onClick={() => setArrowUp(!arrowUp)}
                id="category"
                className={`${style.modal_input} ${getFieldState("category").isDirty && !errors.category ? style.success_ : ""}`}
                {...register("category")}
              >
                <option value="" disabled>
                  Category
                </option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <ArrowIcon rotated={arrowUp} />

              {errors.category && (
                <span className={style.error_message}>
                  {errors.category.message}
                </span>
              )}
            </div>
            <div>
              <input
                className={`${style.modal_input} ${!errors.stock && watch("stock") ? style.success_ : ""}`}
                type="number"
                placeholder="Stock"
                {...register("stock", { valueAsNumber: true })}
              />
              {errors.stock && (
                <span className={style.error_message}>
                  {errors.stock.message}
                </span>
              )}
            </div>
            <div>
              <input
                className={`${style.modal_input} ${getFieldState("suppliers").isDirty && !errors.suppliers ? style.success_ : ""}`}
                {...register("suppliers")}
                type="text"
                placeholder="Suppliers"
              />
              {errors.suppliers && (
                <span className={style.error_message}>
                  {errors.suppliers.message}
                </span>
              )}
            </div>
            <div>
              <input
                className={`${style.modal_input} ${!errors.price && watch("price") ? style.success_ : ""}`}
                type="number"
                step="0.01"
                placeholder="Price"
                {...register("price", { valueAsNumber: true })}
              />
              {errors.price && (
                <span className={style.error_message}>
                  {errors.price.message}
                </span>
              )}
            </div>
          </div>

          <div>
            <button type="submit" className={style.modal_butt}>
              {selectedProduct ? "Save" : "Add"}
            </button>
            <button
              onClick={() => {
                setOpen(false);
                reset(emptyForm);
                setSelectedProduct(null);
              }}
              type="button"
              className={style.modal_cancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
