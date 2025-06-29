type TabParamList = {
    Home: undefined,
    Login: undefined,
    Favourite: undefined,
    ProductDetails: { productId: number; sourceScreen?: 'Home' | 'Favourite' | 'Map' },
    Map: undefined
}

export { type TabParamList };