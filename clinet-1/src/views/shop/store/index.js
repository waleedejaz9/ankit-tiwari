// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import { GiConsoleController } from 'react-icons/gi';
import { customInterIceptors } from '../../../lib/AxiosProvider'
const API = customInterIceptors();
export const getUsers = createAsyncThunk(
    'appEcommerce/getUsers',
    async () => {
        let url = `/user/get_users`;
        const response = await API.get(url);
        return response.data
    }
)

export const getMemberships = createAsyncThunk(
    'appEcommerce/getMemberships',
    async (params) => {
        let url = `/membership/membership_list`;
        const response = await API.get(url, { params });
        return { params, data: response.data.data, total: response.data.total }
    }
)

export const getMembership = createAsyncThunk(
    'appEcommerce/getMembership',
    async (slug) => {
        let url = `/membership/info_membership/${slug}`;
        const response = await API.get(url);
        return response.data
    }
)

export const addMembershipToWishlist = createAsyncThunk(
    'appEcommerce/addMembershipToWishlist',
    async (params, { dispatch, getState }) => {
        let url = `/membership/add_wishlist/${params.id}`;
        const response = await API.post(url, { id: params.id });
        dispatch(getMemberships(getState().shop.params));
        return response
    }
)

export const deleteMembershipWishlist = createAsyncThunk(
    'appEcommerce/deleteMembershipWishlist',
    async (params, { dispatch, getState }) => {
        let url = `/membership/remove_wishlist/${params.id}`;
        const response = await API.post(url, {});
        dispatch(getMemberships(getState().shop.params));
        return response
    }
)

export const addMembershipToWishlistItem = createAsyncThunk(
    'appEcommerce/addMembershipToWishlist',
    async (params, { dispatch }) => {
        let url = `/membership/add_wishlist/${params.id}`;
        const response = await API.post(url, { id: params.id });
        dispatch(getMembership(params.id));
        return response
    }
)

export const deleteMembershipWishlistItem = createAsyncThunk(
    'appEcommerce/deleteMembershipWishlist',
    async (params, { dispatch }) => {
        let url = `/membership/remove_wishlist/${params.id}`;
        const response = await API.post(url, {});
        dispatch(getMembership(params.id));
        return response
    }
)

export const addMembership = createAsyncThunk(
    'appEcommerce/addMembership',
    async (params, { dispatch, getState }) => {
        let url = `/membership/add_membership`;
        const response = await API.post(url, params);
        await dispatch(getMemberships(getState().shop.params));
        return response.data
    }
)

export const addMembershipToCart = createAsyncThunk(
    'appEcommerce/addMembershipToCart',
    async (id, { dispatch }) => {
        let url = `/cart/add_membership`;
        const response = await API.post(url, {
            membershipId: id
        });
        dispatch(getCartItems());
        // await dispatch(getProducts(getState().ecommerce.params))
        return response.data
    }
)

export const deleteMembershipFromCart = createAsyncThunk(
    'appEcommerce/deleteMembershipFromCart',
    async (id, { dispatch }) => {
        let url = `/cart/remove_membership/${id}`;
        const response = await API.post(url, {});
        dispatch(getCartItems());
        // await dispatch(getProducts(getState().ecommerce.params))
        return response.data
    }
)

export const getMembershipWishlistItems = createAsyncThunk(
    'appEcommerce/getMembershipWishlistItems',
    async () => {
        let url = `/fmembership/get_memberships`;
        const response = await API.get(url);
        return response.data
    }
)

export const checkoutMembership = createAsyncThunk(
    'appEcommerce/checkoutMemberships',
    async (params) => {
        let url = `/checkout/membership`;
        const response = await API.post(url, params);
        return response
    }
)

export const getProducts = createAsyncThunk(
    'appEcommerce/getProducts',
    async (params) => {
        const response = await axios.get('/apps/ecommerce/products', { params })
        return { params, data: response.data }
    }
)

export const addToCart = createAsyncThunk(
    'appEcommerce/addToCart',
    async (id, { dispatch, getState }) => {
        const response = await axios.post('/apps/ecommerce/cart', {
            productId: id
        })
        await dispatch(getProducts(getState().ecommerce.params))
        return response.data
    }
)

export const getWishlistItems = createAsyncThunk(
    'appEcommerce/getWishlistItems',
    async () => {
        const response = await axios.get('/apps/ecommerce/wishlist')
        return response.data
    }
)

export const deleteWishlistItem = createAsyncThunk(
    'appEcommerce/deleteWishlistItem',
    async (id, { dispatch }) => {
        const response = await axios.delete(`/apps/ecommerce/wishlist/${id}`)
        dispatch(getWishlistItems())
        return response.data
    }
)

export const getCartItems = createAsyncThunk(
    'appEcommerce/getCartItems',
    async () => {
        const response = await axios.get('/apps/ecommerce/cart')
        return response.data
    }
)

export const getProduct = createAsyncThunk(
    'appEcommerce/getProduct',
    async (slug) => {
        const response = await axios.get(`/apps/ecommerce/products/${slug}`)
        return response.data
    }
)

export const addToWishlist = createAsyncThunk(
    'appEcommerce/addToWishlist',
    async (id) => {
        await axios.post('/apps/ecommerce/wishlist', { productId: id })
        return id
    }
)

export const deleteCartItem = createAsyncThunk(
    'appEcommerce/deleteCartItem',
    async (id, { dispatch }) => {
        await axios.delete(`/apps/ecommerce/cart/${id}`);
        dispatch(getCartItems())
        return id
    }
)

export const appEcommerceSlice = createSlice({
    name: 'appEcommerce',
    initialState: {
        cart: [],
        params: {},
        memberships:[],
        products: [],
        wishlist: [],
        totalProducts: 0,
        productDetail: {},
        totalMemberships:0,
        productDetail: {},
        users:[],
        membershipDetail:{},
        cart:{
            membership_list:[],
            product_list:[]
            },
        productDetail: {}
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.fulfilled, (state, action) => {
                state.users=action.payload.data;
            })
            .addCase(getMemberships.fulfilled, (state, action) => {
                state.params = action.payload.params;
                state.memberships = action.payload.data;
                state.totalMemberships = action.payload.total;
            })
            .addCase(getMembership.fulfilled, (state, action) => {
                state.membershipDetail=action.payload.data;
            })
            .addCase(getMembershipWishlistItems.fulfilled, (state, action) => {
                state.wishmembershiplist = action.payload.data.membership_list
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.params = action.payload.params
                state.products = action.payload.data.products
                state.totalProducts = action.payload.data.total
            })
            .addCase(getWishlistItems.fulfilled, (state, action) => {
                state.wishlist = action.payload.products
            })
            .addCase(getCartItems.fulfilled, (state, action) => {
                state.cart = action.payload.products
            })
            .addCase(getProduct.fulfilled, (state, action) => {
                state.productDetail = action.payload.product
            })
    }
})

export default appEcommerceSlice.reducer
