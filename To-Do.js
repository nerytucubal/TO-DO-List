let button = document.querySelector('#btn')
let ul = document.querySelector('#tarea')
let ingreso = document.querySelector('#ingreso')
let body = document.querySelector('body')
const agregar = () => {
    let tarea = document.querySelector('#ingreso').value
    tarea = tarea.trim()
    if (tarea.length != 0) {
        let li = document.createElement('li')
        li.classList.add('my-3')
        let div = document.createElement('div')
        div.classList.add('form-group', 'd-flex', 'gap-2', 'flex-wrap', 'flex-md-nowrap', 'justify-content-center')
        let input = document.createElement('input')
        input.classList.add('form-control', 'rounded-4', 'shadow-none', 'border', 'border-primary')
        input.type = 'text'
        input.value = tarea
        input.setAttribute('readonly', true)
        let btn_eliminar = document.createElement('button')
        btn_eliminar.innerText = 'Eliminar'
        btn_eliminar.classList.add('btn', 'btn-danger')
        let btn_completado = document.createElement('button')
        btn_completado.innerText = 'Completado'
        btn_completado.classList.add('btn', 'btn-success')
        li.appendChild(div)
        div.appendChild(input)
        div.appendChild(btn_eliminar)
        div.appendChild(btn_completado)
        ul.appendChild(li)
        document.querySelector('#ingreso').value = ''

        btn_completado.addEventListener('click', () => {
            input.classList.add('text-decoration-line-through-success', 'border', 'border-success')
            btn_completado.remove()
        })

        btn_eliminar.addEventListener('click', () => {
            ul.removeChild(li)
        })

        btn_eliminar.addEventListener('mouseover', () => {
            input.classList.remove('border-primary')
            input.classList.add('border', 'border-danger')
        })
        btn_eliminar.addEventListener('mouseout', () => {
            input.classList.remove('border', 'border-danger')
            input.classList.add('border-primary')
        })
    }
    else {
        ingreso.classList.add('border', 'border-danger')
        ingreso.placeholder = 'No hay tarea por ingresar'
    }
}

button.addEventListener('click', () => {
    agregar()
})
body.addEventListener('keydown', (event) => {
    if (event.key == 'Enter') {
        agregar()
    }
})