import { useState } from "react";

function useBoundedArray(initialItems = [], maxItems = 10) {
  const [items, setItems] = useState(initialItems);

  const addItem = (newItem) => {
    setItems((prevItems) => {
      if (prevItems.find((dup) => dup.mbid === newItem.mbid)) {
        return prevItems;
      }
      if (prevItems.length >= maxItems) {
        return [...prevItems.slice(0, 9), newItem];
      }
      return [...prevItems, newItem];
    });
  };

  return [items, addItem];
}

export default useBoundedArray;
