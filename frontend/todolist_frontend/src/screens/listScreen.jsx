import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GoSync } from "react-icons/go";
import { loggedIn, useAddItemMutation } from "../../store";
import DeleteItemButton from "../components/delete";
function ListScreen() {
  const [newItem, setNewItem] = useState("");
  const dispatch = useDispatch();
  const [addItem, add] = useAddItemMutation();

  const useData = useSelector((state) => {
    return state.auth;
  });

  const handleAdd = async () => {
    if (newItem != "") {
      try {
        const res = await addItem(newItem).unwrap();
        dispatch(loggedIn(res));
      } catch (err) {
        console.log("Error occured: " + err);
      }
      setNewItem("");
    }
  };
  const handleKeyDown = (e) => {
    if (e.key == "Enter") {
      handleAdd();
    }
  };
  const renderedData = useData.userInfo.list.map((d) => {
    return (
      <div className="item" key={d.id}>
        <DeleteItemButton id={d.id} />
        <p>{d.item}</p>
      </div>
    );
  });
  return (
    <>
      <div className="list-component">
        <h1>
          <span>Welcome! </span>
          {useData.userInfo.name}
        </h1>
        <div className="list">
          <div className="add-list-div">
            <input
              type="text"
              value={newItem}
              onChange={(e) => {
                setNewItem(e.target.value);
              }}
              autoComplete="on|off"
              name="newItem"
              onKeyDown={handleKeyDown}
            />
            <button onClick={handleAdd}>
              {add.isLoading ? <GoSync className="spinner" /> : <>Add Item</>}
            </button>
          </div>
          <div className="list-items">{renderedData}</div>
        </div>
        <div className="background-div"></div>
      </div>
    </>
  );
}

export default ListScreen;
