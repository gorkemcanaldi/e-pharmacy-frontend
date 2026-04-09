import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import style from "./Suppliers.module.css";
import { toast } from "react-toastify";
import Filter from "../../icons/Filter";
import EditIcon from "../../icons/EditIcon";
import Modal from "../../components/Modal/Modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ArrowIcon from "../../icons/ArrowIcon";
import {
  getSuppliers,
  supplierCreate,
  updateSupplier,
} from "../../api/suppliers";
import {
  suppliersSchema,
  type SupplierSchemaType,
} from "../../validation/suppliersValidation";
import type { suppliers } from "../../types/Suppliers";

export default function Suppliers() {
  const { accessToken, setLoading } = useAuth();
  const [name, setName] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [suppliers, setSuppliers] = useState<suppliers[]>([]);
  const [arrowUp, setArrowUp] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedSuppliers, setSelectedSuppliers] = useState<suppliers | null>(
    null,
  );
  const status = ["Deactive", "Active"];

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    getFieldState,
  } = useForm<SupplierSchemaType>({
    resolver: zodResolver(suppliersSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: SupplierSchemaType) => {
    if (!accessToken) return;

    try {
      if (selectedSuppliers) {
        const res = await updateSupplier(
          accessToken,
          selectedSuppliers._id,
          data,
        );
        toast.success(res.message ?? "supplier güncellendi");
      } else {
        const res = await supplierCreate(accessToken, data);
        toast.success(res.message ?? "yeni supplier eklendi");
      }
      setOpen(false);
      setSelectedSuppliers(null);
      reset();
      fetchSuppliers();
    } catch {
      toast.error("İşlem başarısız");
    }
  };

  const fetchSuppliers = async () => {
    if (!accessToken) return;
    setLoading(true);
    try {
      const data = await getSuppliers(accessToken, name, page);
      setSuppliers(data);
      setLoading(false);
    } catch {
      toast.error("Suppliers verisi alınamadı");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const run = async () => {
      await fetchSuppliers();
    };

    run();
  }, [accessToken, page]);
  const emptyForm: SupplierSchemaType = {
    name: "",
    address: "",
    suppliers: "",
    date: new Date(),
    amount: 0,
    status: "" as SupplierSchemaType["status"],
  };

  return (
    <div className={style.products}>
      <div className={style.filter_div}>
        <div className={style.filter_div_}>
          <input
            type="text"
            value={name}
            placeholder="User Name"
            className={style.filter_inp}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setPage(1);
                fetchSuppliers();
              }
            }}
          />
          <button
            className={style.filter_button}
            onClick={() => {
              setPage(1);
              fetchSuppliers();
            }}
          >
            <Filter />
            Filter
          </button>
        </div>
        <div onClick={() => setOpen(true)} className={style.add_div}>
          <button className={style.add_button}>Add a new suppliers</button>
        </div>
      </div>
      <div className={style.tableWrapper}>
        <table className={style.table}>
          <caption>All suppliers</caption>
          <thead>
            <tr>
              <th className={style.head_info}>Suppliers Info</th>
              <th className={style.head_info}>Address</th>
              <th className={style.head_info}>Company</th>
              <th className={style.head_info}>Delivery date</th>
              <th className={style.head_info}>Ammount</th>
              <th className={style.head_info}>Status</th>
              <th className={style.head_info}>Action</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((o) => (
              <tr key={o._id}>
                <td className={style.name_photo}>{o.name}</td>
                <td>{o.address}</td>
                <td>{o.suppliers}</td>
                <td>{new Date(o.date).toLocaleDateString("tr-TR")}</td>
                <td>{o.amount}</td>
                <td
                  className={
                    o.status === "Active"
                      ? style.statusActive
                      : style.statusDeactive
                  }
                >
                  {o.status}
                </td>
                <td>
                  <button
                    className={style.edit_}
                    onClick={() => {
                      setSelectedSuppliers(o);
                      reset(o);
                      setOpen(true);
                    }}
                  >
                    <EditIcon /> Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <div className={style.pagination}>
          {[1, 2].map((p) => (
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
          setSelectedSuppliers(null);
          reset(emptyForm);
        }}
        title={selectedSuppliers ? "Edit supplier" : "Add a new suppliers"}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={style.form_div}>
            <div>
              <input
                type="text"
                placeholder="Suppliers Info"
                className={`${style.modal_input} ${!errors.name && watch("name") ? style.success_ : ""}`}
                {...register("name")}
              />
              {errors.name && (
                <span className={style.error_message}>
                  {errors.name.message}
                </span>
              )}
            </div>

            <div>
              <input
                className={`${style.modal_input} ${!errors.address && watch("address") ? style.success_ : ""}`}
                type="text"
                placeholder="Address"
                {...register("address")}
              />
              {errors.address && (
                <span className={style.error_message}>
                  {errors.address.message}
                </span>
              )}
            </div>

            <div>
              <input
                className={`${style.modal_input} ${getFieldState("suppliers").isDirty && !errors.suppliers ? style.success_ : ""}`}
                {...register("suppliers")}
                type="text"
                placeholder="Company"
              />
              {errors.suppliers && (
                <span className={style.error_message}>
                  {errors.suppliers.message}
                </span>
              )}
            </div>

            <div>
              <input
                type="date"
                className={`${style.modal_input} ${getFieldState("date").isDirty && !errors.date ? style.success_ : ""}`}
                {...register("date", { valueAsDate: true })}
                placeholder="Delivery date"
              />
              {errors.date && (
                <span className={style.error_message}>
                  {errors.date.message}
                </span>
              )}
            </div>

            <div>
              <input
                className={`${style.modal_input} ${!errors.amount && watch("amount") ? style.success_ : ""}`}
                type="number"
                step="0.01"
                placeholder="Amount"
                {...register("amount", { valueAsNumber: true })}
              />
              {errors.amount && (
                <span className={style.error_message}>
                  {errors.amount.message}
                </span>
              )}
            </div>
            <div className={style.selectWrapper}>
              <select
                onClick={() => setArrowUp(!arrowUp)}
                id="status"
                className={`${style.modal_input} ${getFieldState("status").isDirty && !errors.status ? style.success_ : ""}`}
                {...register("status")}
              >
                <option value="" disabled>
                  Status
                </option>
                {status.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <ArrowIcon rotated={arrowUp} />

              {errors.status && (
                <span className={style.error_message}>
                  {errors.status.message}
                </span>
              )}
            </div>
          </div>

          <div>
            <button type="submit" className={style.modal_butt}>
              {selectedSuppliers ? "Save" : "Add"}
            </button>
            <button
              onClick={() => {
                setOpen(false);
                reset(emptyForm);
                setSelectedSuppliers(null);
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
