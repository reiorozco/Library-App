import React from "react";

function TableBody({ columns, data }) {
  const renderCell = (item, column) => {
    return column.content(item);
  };

  const createKey = (item, column) => {
    return item + (column.label || column.key);
  };

  return (
    <tbody>
      {data.map((item) => (
        <tr key={item.id}>
          {columns.map((column) => (
            <td key={createKey(item, column)}>{renderCell(item, column)}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

export default TableBody;
