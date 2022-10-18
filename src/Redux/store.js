import { configureStore } from '@reduxjs/toolkit'
import OrderSlice from '../Order/OrderSlice'

export default configureStore({
  reducer: {
    order: OrderSlice
  }
})