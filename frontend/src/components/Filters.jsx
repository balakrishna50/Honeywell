export default function Filters({ filters, setFilters }) {

    return (
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "15px",
        margin: "20px 0"
      }}>
  
        <div>
          <label>From: </label>
          <input
            type="date"
            value={filters.from}
            onChange={(e) =>
              setFilters({
                ...filters,
                from: e.target.value
              })
            }
          />
        </div>
  
        <div>
          <label>To: </label>
          <input
            type="date"
            value={filters.to}
            onChange={(e) =>
              setFilters({
                ...filters,
                to: e.target.value
              })
            }
          />
        </div>
  
        <div>
          <label>Type: </label>
          <select
            value={filters.type}
            onChange={(e) =>
              setFilters({
                ...filters,
                type: e.target.value
              })
            }
          >
            <option value="">ALL</option>
            <option value="IN">IN</option>
            <option value="OUT">OUT</option>
          </select>
        </div>
  
        <div>
          <label>Warehouse: </label>
          <select
            value={filters.warehouse}
            onChange={(e) =>
              setFilters({
                ...filters,
                warehouse: e.target.value
              })
            }
          >
            <option value="">ALL</option>
            <option value="WH-NORTH">WH-NORTH</option>
            <option value="WH-SOUTH">WH-SOUTH</option>
            <option value="WH-EAST">WH-EAST</option>
            <option value="WH-WEST">WH-WEST</option>
          </select>
        </div>
  
      </div>
    );
  }