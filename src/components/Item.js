import React from "react";

function Item({ item, onUpdateItem, onDeleteItem }) {
  const { id, name, category, isInCart } = item;

  function handleAddToCartClick() {
    const updatedItem = {
      ...item,
      isInCart: !isInCart,
    };

    fetch(`http://localhost:4000/items/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isInCart: updatedItem.isInCart,
      }),
    })
      .then((r) => r.json())
      .then(onUpdateItem);
  }

  function handleDeleteClick() {
    fetch(`http://localhost:4000/items/${id}`, {
      method: "DELETE",
    })
      .then((r) => {
        if (r.ok) {
          onDeleteItem(item);
        }
      })
      .catch((error) => {
        console.error("Failed to delete item:", error);
      });
  }

  return (
    <li className={isInCart ? "in-cart" : ""}>
      <span>{name}</span>
      <span className="category">{category}</span>
      <button
        className={isInCart ? "remove" : "add"}
        onClick={handleAddToCartClick}
      >
        {isInCart ? "Remove From Cart" : "Add to Cart"}
      </button>
      <button className="delete" onClick={handleDeleteClick}>
        Delete
      </button>
    </li>
  );
}

export default Item;
