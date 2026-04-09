import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { dashboardFetch } from "../../api/dashboard";
import { toast } from "react-toastify";
import style from "./Dashboard.module.css";
import AllProducts from "../../icons/AllProducts";
import type { DashboardData } from "../../types/DashboardType";
import AllSuppliers from "../../icons/AllSuppliers";
import { SyncLoader } from "react-spinners";
import DashboardCustomer from "../../components/DashboardCustomer/DashboardCustomer";
import IncomeExpenses from "../../components/IncomeExpenses/IncomeExpenses";
export default function Dashboard() {
  const { accessToken, loading, setLoading } = useAuth();
  const [data, setData] = useState<DashboardData | null>(null);
  useEffect(() => {
    const fetchDashboard = async () => {
      if (!accessToken) return;
      setLoading(true);

      try {
        const res = await dashboardFetch(accessToken);
        setData(res);
        setLoading(false);
      } catch {
        toast.error("Dashboard verisi alınamadı");
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, [accessToken]);
  return (
    <div className={style.dashboard_}>
      {loading || !data ? (
        <div>
          <SyncLoader color="#59B17A" />
        </div>
      ) : (
        <>
          <div className={style.metric_card}>
            <div className={style.met}>
              <p className={style.met_p}>
                <span>
                  <AllProducts />
                </span>
                All products
              </p>
              <span className={style.met_span}>
                {data?.metrics.totalProducts}
              </span>
            </div>
            <div className={style.met_}>
              <p className={style.met_p}>
                <span>
                  <AllSuppliers />
                </span>
                All products
              </p>
              <span className={style.met_span}>
                {data?.metrics.totalSuppliers}
              </span>
            </div>
            <div className={style.met_}>
              <p className={style.met_p}>
                <span>
                  <AllSuppliers />
                </span>
                All products
              </p>
              <span className={style.met_span}>
                {data?.metrics.totalCustomers}
              </span>
            </div>
          </div>
          <div className={style.tablo}>
            <div>
              <DashboardCustomer customer={data.recentCustomers} />
            </div>
            <div>
              <IncomeExpenses ie={data.transactions} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
