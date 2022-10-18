import { createSlice } from '@reduxjs/toolkit'

export const orderSlice = createSlice({
  name: 'order',
  initialState: {
    value: 0,
    tableStatus: false,
    selected: {},
  },
  reducers: {
    counter: (state, action) => {
        state.value += action.payload;
    },
    changeTableStatus: (state, action) => {
        state.tableStatus = action.payload;
    },
    selectedOrder: (state, action) => {
        state.selected = action.payload;
    }
  }
})

// Action creators are generated for each case reducer function
export const { counter, changeTableStatus, selectedOrder } = orderSlice.actions

export default orderSlice.reducer