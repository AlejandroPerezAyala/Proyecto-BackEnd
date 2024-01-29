let btns = document.querySelectorAll('#addBtn')


btns.forEach(btn => {
    btn.addEventListener('click', async (e) => {
        e.preventDefault()

        const productId = e.target.getAttribute('data-id')
        console.log("El ID del producto es: " + productId)

        const result = await fetch('/api/user', {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await result.json()
        const cartId = data.cart
        console.log(cartId)

        await fetch(`/api/carts/${cartId}/product/${productId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(result => result.json()).then(json => console.log(json))

    

        Swal.fire({
            position: 'bottom-end',
            title: 'se agrego el producto al carrito',
            showConfirmButton: false,
            toast: true,
            timer: 2000,
            timerProgressBar:true,
            showClass: {
                popup: 'animate__animated animate__backInUp'
              },
              hideClass: {
                popup: 'animate__animated animate__backOutDown'
              }
        })
    })
})