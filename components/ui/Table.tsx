import { useMemo } from "react";
import { useTable } from "react-table";


const Table = ( { content, editable } : any) => {
    const data = useMemo(() => content.data, []);
    const columns = useMemo( () => content.columns, []);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

    const handleEdit = (index: number) => {
      console.log(data[index]);
    }
    
  return (
    <table className="priTable" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {
                  headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>
                      { column.render("Header") }
                    </th>
                    )
                  )
                }
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            { 
              rows.map((row) => {
                prepareRow(row);

                return (
                  <tr {...row.getRowProps()} onClick={() => editable && handleEdit(row.index)} className={editable && "editable"}>
                    {
                      row.cells.map((cell) => (
                        <td {...cell.getCellProps()}> {cell.render("Cell")} </td>
                        )
                      )
                    }
                  </tr>
                );
                }
              )
            }
          </tbody>
    </table>
  );
};

export default Table;
