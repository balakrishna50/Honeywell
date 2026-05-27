import { useEffect, useState } from "react";
import API from "./services/api";

import UploadSection from "./components/UploadSection";
import Filters from "./components/Filters";
import MovementTable from "./components/MovementTable";
import PieChartView from "./components/PieChartView";
import TimeSeriesChart from "./components/TimeSeriesChart";

function App() {

  const [data, setData] = useState([]);

  const [filters, setFilters] = useState({
    from: "2026-01-01",
    to: "2026-12-31",
    type: "",
    warehouse: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {

    if (!filters.from || !filters.to) {
      return;
    }

    let ignore = false;

    async function loadMovements() {

      try {

        setLoading(true);
        setError("");

        const response = await API.get("/movements", {
          params: filters
        });

        if (!ignore) {
          setData(response.data);
        }

      } catch (err) {

        if (!ignore) {
          setError("Failed to fetch stock movements", err);
        }

      } finally {

        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadMovements();

    return () => {
      ignore = true;
    };

  }, [filters]);

  const refreshMovementsAfterUpload = async () => {

    if (!filters.from || !filters.to) {
      return;
    }

    try {

      setLoading(true);
      setError("");

      const response = await API.get("/movements", {
        params: filters
      });

      setData(response.data);

    } catch (err) {

      setError("Failed to refresh stock movements", err);

    } finally {

      setLoading(false);
    }
  };

  return (
    <div style={{
      padding: "20px",
      maxWidth: "1200px",
      margin: "auto",
      fontFamily: "Arial, sans-serif"
    }}>

      <h1>Inventory Movement Dashboard</h1>

      <UploadSection onUploadSuccess={refreshMovementsAfterUpload} />

      <Filters
        filters={filters}
        setFilters={setFilters}
      />

      {loading && <p>Loading data...</p>}

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      <MovementTable data={data} />

      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "30px",
        marginTop: "30px"
      }}>

        <PieChartView data={data} />

        <TimeSeriesChart data={data} />

      </div>

    </div>
  );
}

export default App;