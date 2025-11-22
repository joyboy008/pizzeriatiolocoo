import authProvider from "../../utils/AuthProvider";
import Buttons from "../Buttons";
import "./styles_table.css";

function Table({ title, onAddProduct, onAddClient, columns, data, whatIs }) {
  return (
    <main className="table" id="customers_table">
      <section
        className={
          title.toLowerCase() === "clientes"
            ? "table__header clientes"
            : "table__header productos"
        }
      >
        <h3>Listado de {title}</h3>
      </section>
      {/* <section className="table__body">
        <table>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.field}>{column.label}</th>
              ))}
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column) => (
                  <td key={column.field}>
                    {column.field === "image" ? (
                      <img src={row[column.field]} alt={row.name} />
                    ) : (
                      row[column.field]
                    )}
                  </td>
                ))}
                {authProvider.checkRoutePermissions("moderador") ? (
                  <td>
                    <Buttons
                      whatIs={whatIs}
                      endpoint={title.toLowerCase()}
                      data={row.id}
                      onAddProduct={onAddProduct}
                      onAddClient={onAddClient}
                    />
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      </section> */}
      <section className="cards__container">
        {data.map((row, rowIndex) => (
          <div className="sale-card" key={rowIndex}>
            {/* Cliente (si existe en columns) */}
            {columns.some((c) => c.field === "client_name") && (
              <div className="sale-title">Cliente: {row["client_name"]}</div>
            )}

            {/* Dirección */}
            {columns.some((c) => c.field === "cient_address") && (
              <div className="sale-row">
                <span>📍</span> {row["client_address"] || "Sin dirección"}
              </div>
            )}

            {/* Teléfono */}
            {columns.some((c) => c.field === "clent_phone") && (
              <div className="sale-row">
                <span>📞</span> {row["client_phone"] || "N/A"}
              </div>
            )}

            {/* Total */}
            {columns.some((c) => c.field === "total") && (
              <div className="sale-total">💵 Total: Q{row["total"]}</div>
            )}

            {/* Fecha */}
            {columns.some((c) => c.field === "dat") && (
              <div className="sale-row">
                <span>📅</span> {row["date"]}
              </div>
            )}

            {/* Vendedor */}
            {columns.some((c) => c.field === "user_uername") && (
              <div className="sale-row">
                <span>🧑‍💼</span> {row["user_username"]}
              </div>
            )}

            {/* Render dinámico de columnas adicionales (respeta tu estructura original) */}
            <div className="extra-fields">
              {columns
                .filter(
                  (c) =>
                    ![
                      "client_name",
                      "client",
                      "client",
                      "total",
                      "dat",
                      "usr_username",
                    ].includes(c.field)
                )
                .map((c) => (
                  <div key={c.field} className="sale-row">
                    <strong>{c.label}</strong> {row[c.field]}
                  </div>
                ))}
            </div>

            {/* Acciones */}
            {authProvider.checkRoutePermissions("moderador") && (
              <div className="background-buttons">
                <Buttons
                  whatIs={whatIs}
                  endpoint={title.toLowerCase()}
                  data={row.id}
                  onAddProduct={onAddProduct}
                  onAddClient={onAddClient}
                />
              </div>
            )}
          </div>
        ))}
      </section>
    </main>
  );
}

export default Table;
