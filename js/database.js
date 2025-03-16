import { supabase } from './supabase.js'

// Profile functions
export async function getProfile() {
    const user = supabase.auth.user()
    if (!user) return null

    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()
    
    if (error) {
        console.error('Error fetching profile:', error.message)
        return null
    }
    
    return data
}

export async function updateProfile(profileData) {
    const user = supabase.auth.user()
    if (!user) return false

    const { error } = await supabase
        .from('profiles')
        .update(profileData)
        .eq('id', user.id)
    
    if (error) {
        console.error('Error updating profile:', error.message)
        return false
    }
    
    return true
}

// Product functions (publicly accessible)
export async function getAllProducts() {
    const { data, error } = await supabase
        .from('products')
        .select(`
            *,
            categories(name),
            reviews(
                rating,
                comment,
                created_at,
                profiles(full_name)
            )
        `)
    
    if (error) {
        console.error('Error fetching products:', error.message)
        return []
    }
    
    return data
}

export async function getProductById(id) {
    const { data, error } = await supabase
        .from('products')
        .select(`
            *,
            categories(name),
            reviews(
                rating,
                comment,
                created_at,
                profiles(full_name)
            )
        `)
        .eq('id', id)
        .single()
    
    if (error) {
        console.error('Error fetching product:', error.message)
        return null
    }
    
    return data
}

// Cart functions (protected by RLS)
export async function addToCart(productId, quantity = 1) {
    const user = supabase.auth.user()
    if (!user) return { success: false, error: 'Authentication required' }

    const { data, error } = await supabase
        .from('cart_items')
        .upsert([
            { 
                user_id: user.id,
                product_id: productId,
                quantity: quantity
            }
        ], {
            onConflict: 'user_id,product_id',
            returning: true
        })
    
    if (error) {
        console.error('Error adding to cart:', error.message)
        return { success: false, error: error.message }
    }
    
    return { success: true, data }
}

export async function getCartItems() {
    const user = supabase.auth.user()
    if (!user) return []

    const { data, error } = await supabase
        .from('cart_items')
        .select(`
            *,
            products (
                id,
                name,
                price,
                image_url,
                stock_quantity
            )
        `)
        .eq('user_id', user.id)
    
    if (error) {
        console.error('Error fetching cart:', error.message)
        return []
    }
    
    return data
}

export async function removeFromCart(productId) {
    const user = supabase.auth.user()
    if (!user) return false

    const { error } = await supabase
        .from('cart_items')
        .delete()
        .match({ user_id: user.id, product_id: productId })
    
    if (error) {
        console.error('Error removing from cart:', error.message)
        return false
    }
    
    return true
}

// Order functions (protected by RLS)
export async function createOrder(shippingAddress, cartItems) {
    const user = supabase.auth.user()
    if (!user) return { success: false, error: 'Authentication required' }

    // Start a transaction
    const totalAmount = cartItems.reduce((sum, item) => 
        sum + (item.products.price * item.quantity), 0)

    const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert([
            {
                user_id: user.id,
                total_amount: totalAmount,
                shipping_address: shippingAddress,
                status: 'pending',
                payment_status: 'pending'
            }
        ])
        .select()
        .single()

    if (orderError) {
        console.error('Error creating order:', orderError.message)
        return { success: false, error: orderError.message }
    }

    // Create order items
    const orderItems = cartItems.map(item => ({
        order_id: order.id,
        product_id: item.product_id,
        quantity: item.quantity,
        price_at_time: item.products.price
    }))

    const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems)

    if (itemsError) {
        console.error('Error creating order items:', itemsError.message)
        return { success: false, error: itemsError.message }
    }

    // Clear the cart
    const { error: cartError } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id)

    if (cartError) {
        console.error('Error clearing cart:', cartError.message)
        return { success: false, error: cartError.message }
    }

    return { success: true, order }
}

export async function getUserOrders() {
    const user = supabase.auth.user()
    if (!user) return []

    const { data, error } = await supabase
        .from('orders')
        .select(`
            *,
            order_items (
                quantity,
                price_at_time,
                products (
                    name,
                    image_url
                )
            )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching orders:', error.message)
        return []
    }

    return data
}

// Review functions
export async function createReview(productId, rating, comment) {
    const user = supabase.auth.user()
    if (!user) return { success: false, error: 'Authentication required' }

    const { data, error } = await supabase
        .from('reviews')
        .insert([
            {
                user_id: user.id,
                product_id: productId,
                rating,
                comment
            }
        ])
        .select()
        .single()

    if (error) {
        console.error('Error creating review:', error.message)
        return { success: false, error: error.message }
    }

    return { success: true, data }
}
