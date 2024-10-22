interface ITableProps {
  headers: string[] | JSX.Element[];
  rows: JSX.Element[][];
}

export const Table: React.FC<ITableProps> = ({ headers, rows }) => {
  return (
    <table>
      <thead>
        {headers.map((el, index) => (
          <th key={index}>{el}</th>
        ))}
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={index}>
            {row.map((col, index2) => (
              <td key={index2}>{col}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
