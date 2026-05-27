import { useState } from "react";

export default function MovementTable({ data }) {

  const [page, setPage] = useState(1);

  const rowsPerPage = 10;
  const totalPages = Math.ceil(data.length / rowsPerPage) || 1;

  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * rowsPerPage;

  const paginatedData = data.slice(start, start + rowsPerPage);

  return (
    <div style={{ marginTop: "20px", overflowX: "auto" }}>

      <h2>Stock Movements</h2>

      <table
        border="1"
        cellPadding="10"
        style={{
          width: "100%",
          borderCollapse: "collapse"
        }}
      >
        <thead>
          <tr>
            <th>Date/Time</th>
            <th>SKU</th>
            <th>Movement Type</th>
            <th>Quantity</th>
          </tr>
        </thead>

        <tbody>
          {paginatedData.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No records found. Please upload a valid JSON file.
              </td>
            </tr>
          ) : (
            paginatedData.map(item => (
              <tr key={item.id}>
                <td>{item.timestamp}</td>
                <td>{item.sku}</td>
                <td>{item.movementType}</td>
                <td>{item.quantity}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div style={{ marginTop: "10px" }}>

        <button
          disabled={safePage === 1}
          onClick={() => setPage(safePage - 1)}
        >
          Previous
        </button>

        <span style={{ margin: "0 15px" }}>
          Page {safePage} of {totalPages}
        </span>

        <button
          disabled={safePage === totalPages}
          onClick={() => setPage(safePage + 1)}
        >
          Next
        </button>

      </div>

    </div>
  );
}