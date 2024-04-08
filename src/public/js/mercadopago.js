const quantity = document.getElementById("qty")
const amount = document.getElementById("amount")

const mp = new MercadoPago('TEST-fc5dd30c-28f4-403d-82cc-e22ffb3f2b32', {
    locale: "es-AR"
})

const checkOut = async () => {

    try {
            const orderData = {
            title: "FakeShoes",
            quantity: quantity.innerText,
            price: amount.innerText
        }

        const response = await fetch('/api/create_preference', {
            method: 'POST',
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(orderData)
        })

        const preference = await response.json()

        console.log(preference)

        createCheckOutButton(preference.id)
    } catch (error) {
        alert(error)
    }
}

const createCheckOutButton = (preferenceId) => {
    const bricksBuilder = mp.bricks()

    const renderComponent = async () => {
        await bricksBuilder.create("wallet", "wallet_container", {
            initialization: {
                preferenceId: preferenceId,
            }
        })
    }

    renderComponent()
}

checkOut()

