/* eslint-disable react/prop-types */
import { useDeleteItemMutation } from "../../store";
import { useDispatch } from "react-redux";
import { loggedIn } from "../../store";
import { GoTrash, GoSync } from "react-icons/go";

function DeleteItemButton({ id }) {
  const [deleteItem, results] = useDeleteItemMutation();
  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    try {
      const res = await deleteItem(id).unwrap();
      dispatch(loggedIn(res));
    } catch (err) {
      console.log("Error occured:" + err);
    }
  };

  return (
    <div className="delete-btn" onClick={() => handleDelete(id)}>
      {results.isLoading ? <GoSync className="spinner" /> : <GoTrash />}
    </div>
  );
}

export default DeleteItemButton;
