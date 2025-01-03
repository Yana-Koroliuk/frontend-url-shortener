const Table = ({ columns, data }) => (
    <table className="w-full border-collapse border border-gray-300">
        <thead>
        <tr>
            {columns.map((col) => (
                <th key={col} className="border border-gray-300 p-2">
                    {col}
                </th>
            ))}
        </tr>
        </thead>
        <tbody>
        {data.map((row, idx) => (
            <tr key={idx}>
                {columns.map((col) => (
                    <td key={col} className="border border-gray-300 p-2">
                        {row[col]}
                    </td>
                ))}
            </tr>
        ))}
        </tbody>
    </table>
);

export default Table;
