import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { changeTableStatus, counter, selectedOrder } from "./OrderSlice";

const OrderEdit = (props) => {
  // State
  const [orders, setOrders] = useState([]);
  const [getOrderName, setOrderName] = useState("");
  const [getPrice, setPrice] = useState("");
  const [getDiscounted, setDiscounted] = useState("");

  // Swal
  const MySwal = withReactContent(Swal);

  // Redux
  const selected = useSelector((state) => state.order.selected);
  const tableStatus = useSelector((state) => state.order.tableStatus);  
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:9000/orders/${selected.id}`,
        {
          orderName: getOrderName,
          price: getPrice,
          discounted: getDiscounted,
        }
      );
      const data = response.data;
      dispatch(counter(1));
      MySwal.fire({
        title: <strong>Congrats!</strong>,
        text: `${data.message}`,
        icon: "success",
        timer: 1000
      });
      dispatch(changeTableStatus(false));
      dispatch(selectedOrder({}));
    } catch (error) {
      console.log(`Error Put`, error);
      MySwal.fire({
        title: <strong>Sorry!</strong>,
        text: `Unable to update order. Something went wrong`,
        icon: "error",
      });
    }

    setOrderName("");
    setPrice("");
    setDiscounted(false);
  };

  const checkboxHandler = (e) => {
    if (e.target.checked === true) {
      setDiscounted(true);
    } else {
      setDiscounted(false);
    }
  };

  const cancelHandler = () => {
    dispatch(changeTableStatus(false));
    dispatch(selectedOrder({}));
    setOrderName("");
    setPrice("");
    setDiscounted(false);
  };

  useEffect(() => {
    setOrderName(selected.orderName)
    setPrice(selected.price)
    setDiscounted(selected.discounted)
  }, [selected])

  return (
    <>
      <form onSubmit={submitHandler}>
        <table className="table table-compact w-full bg-base-300">
          {tableStatus === true && (
            <tr>
              <td>
                <input
                  type="text"
                  id="orderNameEdit"
                  placeholder="Type here"
                  className="input input-xs w-full max-w-xs shadow"
                  value={getOrderName}
                  onChange={(e) => setOrderName(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  id="orderPriceEdit"
                  placeholder="Type here"
                  className="input input-xs w-full max-w-xs shadow"
                  value={getPrice}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  id="orderDiscountedEdit"
                  className="checkbox"
                  onChange={checkboxHandler}
                  checked={getDiscounted == true ? 'checked' : ''}
                />
              </td>
              <td>
                <button type="submit" id="orderSubmitEdit" className="btn btn-primary btn-xs">
                  Update
                </button>
                <button
                  type="button"
                  className="btn btn-error btn-xs"
                  onClick={() => cancelHandler()}
                >
                  Cancel
                </button>
              </td>
            </tr>
          )}
        </table>
      </form>
    </>
  );
};

export default OrderEdit;
