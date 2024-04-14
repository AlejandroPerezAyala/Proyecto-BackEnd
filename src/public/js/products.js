let btns = document.querySelectorAll('#addBtn')
const btnDel = document.getElementById("btnDel")
const btnsDelProd = document.querySelectorAll('#delProd')
const cartTitle = document.getElementById("empty")
const list = document.getElementById("list")


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

btnsDelProd.forEach( btnDelProd => {

    btnDelProd.addEventListener("click", async (e) =>{
        e.preventDefault()
    
        const productId = e.target.getAttribute('data-id')
    
        const result = await fetch("/api/user")
        const user = await result.json()
    
        const data = await fetch(`/api/carts/${user.cart}`)
        const cart = await data.json()
    
        const productos = cart.productos
    
    
        const newArray = productos.filter(producto => producto.producto._id !== productId)
    
        await fetch(`/api/carts/${user.cart}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newArray)
        }).then(result => result.json()).then(json => console.log(json))
    

        Swal.fire({
            position: 'bottom-end',
            title: 'se elimino el producto al carrito',
            showConfirmButton: false,
            toast: true,
            timer: 1000,
            timerProgressBar:true,
            showClass: {
                popup: 'animate__animated animate__backInUp'
              },
              hideClass: {
                popup: 'animate__animated animate__backOutDown'
              }
        })

        setInterval("location.reload()", 1000)

    })
})

btnDel.addEventListener("click" , async (e) => {
    e.preventDefault()

    const result = await fetch("/api/user")
    const user = await result.json()

    console.log(user.cart)

    const data = await fetch(`/api/carts/${user.cart}`)
    const cart = await data.json()

    console.log(cart.productos)

    if(cart.productos == []) {
        cartTitle.innerHTML = "CARRITO VACIO"
        cartTitle.classList.remove("hidden")
        list.classList.add("hidden")
        btnDel.addClass("disabled")
    }

    await fetch(`/api/carts/${cart._id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
        }
    })
    

    setInterval("location.reload()", 1000)
})

