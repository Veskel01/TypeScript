import { data, IData } from "./data";

const dynamicTable: HTMLDivElement | null = document.querySelector(".dynamic-table");

const button: HTMLButtonElement | null = document.querySelector("button");

if (dynamicTable) {
  button?.addEventListener("click", (e) => {
    e.preventDefault();
    tableCreate(data);
  });

  const tableCreate = (data: Array<IData>): HTMLTableElement => {
    const table: HTMLTableElement = document.createElement("table");
    const headerRow: HTMLTableRowElement = document.createElement("tr");

    const headers: string[] = Object.keys(data[0]);

    headers.forEach((headerText: string): void => {
      const header: HTMLTableHeaderCellElement = document.createElement("th");
      const textNode: Text = document.createTextNode(headerText);
      header.appendChild(textNode);
      headerRow.appendChild(header);
    });

    table.appendChild(headerRow);

    data.forEach((object: IData): void => {
      const row = document.createElement("tr");
      Object.values(object).forEach((text: string) => {
        const cell = document.createElement("td");
        const textNode = document.createTextNode(text);
        cell.appendChild(textNode);
        row.appendChild(cell);
      });
      table.appendChild(row);
    });

    return dynamicTable?.appendChild(table);
  };
}
