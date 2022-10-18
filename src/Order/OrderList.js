import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import OrderEdit from "./OrderEdit";
import { changeTableStatus, counter, selectedOrder } from "./OrderSlice";

const OrderList = () => {
  // State
  const [orders, setOrders] = useState([]);
  const [getOrderName, setOrderName] = useState("");
  const [getPrice, setPrice] = useState("");
  const [getDiscounted, setDiscounted] = useState("");
  const [totalRegular, setTotalRegular] = useState([]);
  const [totalDiscounted, setTotalDiscounted] = useState([]);

  // Swal
  const MySwal = withReactContent(Swal);

  // Redux
  const totalCount = useSelector((state) => state.order.value);
  const tableStatus = useSelector((state) => state.order.tableStatus);
  const dispatch = useDispatch();

  // Import API
  const listOrders = async () => {
    try {
      const response = await axios.get(`http://localhost:9000/orders`);
      const data = await response.data.data;
      setOrders(data);
    } catch (error) {
      console.log("Error ==>", error);
      MySwal.fire({
        title: <strong>Sorry!</strong>,
        text: `Cannot load details. Something went wrong.`,
        icon: "error",
      });
    }
  };

  const [errorRegular, setErrorRegular] = useState("");
  const getTotalRegular = async () => {
    try {
      const response = await axios.get(
        `http://localhost:9000/orders/total-regular`
      );
      const data = await response.data;
      setTotalRegular(data);
    } catch (error) {
      setErrorRegular("Cannot load details. Something went wrong.");
    }
  };

  const [errorDiscounted, setErrorDiscounted] = useState("");
  const getTotalDiscounted = async () => {
    try {
      const response = await axios.get(
        `http://localhost:9000/orders/total-discounted`
      );
      const data = await response.data;
      setTotalDiscounted(data);
    } catch (error) {
      setErrorDiscounted("Cannot load details. Something went wrong.");
    }
  };

  const checkboxHandler = (e) => {
    if (e.target.checked === true) {
      setDiscounted(true);
    } else {
      setDiscounted(false);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    // Check Table Status
    if (tableStatus === false) {
      // Api Add
      try {
        const response = await axios.post(`http://localhost:9000/orders`, {
          orderName: getOrderName,
          price: getPrice,
          discounted: getDiscounted,
        });
        const data = response.data;
        dispatch(counter(1));
        MySwal.fire({
          title: <strong>Congrats!</strong>,
          text: `${data.message}`,
          icon: "success",
          timer: 1000,
        });
        console.log(response);
      } catch (error) {
        console.log(`Error Post`, error);
        MySwal.fire({
          title: <strong>Sorry!</strong>,
          text: `Unable to add order. Something went wrong`,
          icon: "error",
        });
      }
    }
    setOrderName("");
    setPrice("");
    setDiscounted(false);
  };

  const editHandler = async (id) => {
    dispatch(changeTableStatus(true));
    try {
      const response = await axios.get(`http://localhost:9000/orders/${id}`);
      const data = response.data.data;
      dispatch(selectedOrder(data));
    } catch (error) {
      MySwal.fire({
        title: <strong>Sorry!</strong>,
        text: `Unable to load details. Something went wrong`,
        icon: "error",
      });
    }
  };

  const deleteHandler = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:9000/orders/${id}`);
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
      console.log(`Error Delete`, error);
      MySwal.fire({
        title: <strong>Sorry!</strong>,
        text: `Unable to delete item. Something went wrong.`,
        icon: "error",
      });
    }
  };

  let regularBill = Number(totalRegular.data).toFixed(2);
  let discountedBill = Number(totalDiscounted.data).toFixed(2);

  useEffect(() => {
    listOrders();
    getTotalRegular();
    getTotalDiscounted();
    setDiscounted(false);
  }, [totalCount]);

  return (
    <div className="overflow-x-auto">
      <form className="mb-4" onSubmit={submitHandler}>
        <table className="table table-compact w-full">
          <thead className="text-center">
            <tr>
              <th>Order Item</th>
              <th>Price</th>
              <th>On 5% Promo</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            <tr>
              <td>
                <input
                  type="text"
                  id="orderNameCreate"
                  placeholder="Type here"
                  className="input input-xs w-full max-w-xs shadow"
                  value={getOrderName}
                  onChange={(e) => setOrderName(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  id="orderPriceCreate"
                  placeholder="Type here"
                  className="input input-xs w-full max-w-xs shadow"
                  value={getPrice}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  id="orderDiscountedCreate"
                  className="checkbox"
                  onChange={checkboxHandler}
                  checked={getDiscounted}
                />
              </td>
              <td>
                <button
                  type="submit"
                  id="orderSubmitCreate"
                  className="btn btn-success btn-xs"
                >
                  Place Order
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
      <div className="mx-auto mb-3">Attending Clerk: Roseanne Park</div>
      <table className="table table-compact w-full">
        <thead className="text-center">
          <tr>
            <th>Order Item</th>
            <th>Price</th>
            <th>On 5% Promo?</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {orders?.map((data) => (
            <tr key={data.id}>
              <th className="text-left">{data.orderName}</th>
              <td className="text-right">{data.price}</td>
              <td>
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={data.discounted === true ? "checked" : ""}
                  disabled
                />
              </td>
              <td>
                <button
                  id="btnOrderEdit"
                  className="btn btn-outline btn-primary btn-xs"
                  onClick={() => editHandler(data.id)}
                >
                  Edit
                </button>
                <button
                  id="btnOrderDelete"
                  className="btn btn-outline btn-error btn-xs"
                  data-id={data.id}
                  onClick={() => deleteHandler(data.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <OrderEdit></OrderEdit>
      <table className="table table-compact w-full">
        <tbody className="text-center">
          <tr>
            <td colSpan="4">
              Total Regular Bill:{" "}
              <b>$ {errorRegular ? <span className="bg-red-700 text-white p-2">{errorRegular}</span> : regularBill}</b>
            </td>
          </tr>
          <tr>
            <td colSpan="4">
              Total Discounted Bill:{" "}
              <b>$ {errorDiscounted ? <span className="bg-red-700 text-white p-2">{errorDiscounted}</span> : discountedBill}</b>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;
