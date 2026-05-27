export default function MovementTable({ data }) {

    return (
      <table border="1">
  
        <thead>
          <tr>
            <th>Date</th>
            <th>SKU</th>
            <th>Type</th>
            <th>Quantity</th>
          </tr>
        </thead>
  
        <tbody>
  
          {data.map(item => (
            <tr key={item.id}>
              <td>{item.timestamp}</td>
              <td>{item.sku}</td>
              <td>{item.movementType}</td>
              <td>{item.quantity}</td>
            </tr>
          ))}
  
        </tbody>
  
      </table>
    );
  }