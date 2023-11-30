const socket = io()

const productForm = document.getElementById('form')
const title = document.getElementById('title')
const description = document.getElementById('description')
const price = document.getElementById('price')
const thumbnail = document.getElementById('thumbnailInput')
const stock = document.getElementById('stock')
const code = document.getElementById('code')
const products = document.getElementById('productList')
const deleteButton = document.querySelectorAll('#btnDelete')



productForm.addEventListener('submit', async e =>{
    try{
        e.preventDefault()
        const data = new FormData(form)
    
        console.log({data})
        
        await fetch('/api/products', {
            method: 'POST',
            body: data
        }).then(result => result.json())
        .then(product => {title.value = ''
        description.value = ''
        price.value = ''
        thumbnail.value = null
        stock.value = ''
        code.value = ''} )
    } catch (error) {
        console.log(error)
    }
 
})

const deleteProduct = async (id) => {
    try{

        console.log(id)

        await fetch(`/api/products/${id}`, {
            method: 'DELETE'
        }).then(res => res.json()).then(json => console.log(json))


    } catch (error) {
        console.log(error)
    }
}

const createHtml = (data) =>{

    if(data){
        return data.length ? 
        data.map(newProduct => {
            products.innerHTML += `
            <div id="products" class="max-w-sm bg-amber-100 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                    <img class="rounded-t-lg" src="${newProduct.thumbnail}" alt="" />
                </a>
                <div class="p-5">
                    <a href="#">
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${newProduct.title}</h5>
                    </a>
                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">${newProduct.description}</p>
                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400"><span class="font-bold">stock:</span> ${newProduct.stock}</p>
                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400"><span class="font-bold">price: $</span>${newProduct.price}</p>
                    <div class=" flex justify-between" >
                            <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Read more
                                <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                </svg>
                            </a>
                            <button href="#" id="btnDelete" onclick="deleteProduct(${newProduct.id})" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-black bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                                Delete
                            </button>
                        </div>
                </div>
            <div>
            `
        })
        
        :products.innerHTML += `
            <div id="products" class="max-w-sm bg-amber-100 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                    <img class="rounded-t-lg" src="${data.thumbnail}" alt="" />
                </a>
                <div class="p-5">
                    <a href="#">
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${data.title}</h5>
                    </a>
                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">${data.description}</p>
                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400"><span class="font-bold">stock:</span> ${data.stock}</p>
                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400"><span class="font-bold">price: $</span>${data.price}</p>
                    <div class=" flex justify-between" >
                            <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Read more
                                <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                </svg>
                            </a>
                            <button href="#" id="btnDelete" onclick="deleteProduct(${data.id})" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-black bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                                Delete
                            </button>
                        </div>
                </div>
            <div>
        `
    } else if (data == null)
    {
        return '<h2> NO HAY PRODUCTOS </h2>'
    }
    

    
}

socket.on('newProduct', (data) => {
    products.innerHTML = ""
    createHtml(data)
})

socket.on('deleteProduct', (data) => {
    products.innerHTML = ""
    createHtml(data)
})



