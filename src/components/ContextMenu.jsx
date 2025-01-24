import { useState } from "react";

const ContextMenu = ({
  menuPosition,
  setMenuPosition,
  setExpenses,
  rowId,
  setExpense,
  expense,
  expenses,
  setEditingRowId,
}) => {
  if (!menuPosition.left) return;
  return (
    <div className="context-menu" style={menuPosition}>
      <div
        onClick={() => {
          setEditingRowId(rowId);
          const { title, category, amount } = expenses.find(
            (expense) => expense.id === rowId
          );
          setExpense({ title, category, amount });
          setMenuPosition({});
        }}
      >
        Edit
      </div>
      <div
        onClick={() => {
          setExpenses((prev) => prev.filter((expense) => expense.id !== rowId));
          setMenuPosition({});
        }}
      >
        Delete
      </div>
    </div>
  );
};

export default ContextMenu;
