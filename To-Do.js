let button = document.querySelector('#btn')
let ul = document.querySelector('#tarea')
let ingreso = document.querySelector('#ingreso')
let tareas = []
let filtro = document.querySelector('#filtro')
let filtrobuscador = document.querySelector('#filtrobusca')

const agregar = () => {
    let tarea = document.querySelector('#ingreso').value
    tarea = tarea.trim()

    let nuevaTarea = {
        texto: tarea,
        iscompleted: false,
        html: '',
    }


    if (tarea.length != 0) {
        let li = document.createElement('li')
        li.classList.add('my-3')
        let div = document.createElement('div')
        div.classList.add('form-group', 'd-flex', 'gap-2', 'flex-wrap', 'flex-md-nowrap', 'justify-content-center')
        let input = document.createElement('input')
        input.classList.add('form-control', 'rounded-4', 'shadow-none', 'border', 'border-primary')
        input.type = 'text'
        input.value = nuevaTarea.texto
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
        nuevaTarea.html = li
        document.querySelector('#ingreso').value = ''

        btn_completado.addEventListener('click', () => {
            input.classList.add('text-decoration-line-through-success', 'border', 'border-success')
            btn_completado.remove()
            tareas = tareas.map(item => {
                if (item.texto == input.value) {
                    item.iscompleted = true
                }
                return item
            })
        })

        btn_eliminar.addEventListener('click', () => {
            ul.removeChild(li)
            tareas = tareas.filter(item => item.texto != input.value)
            console.log(tareas)
        })

        btn_eliminar.addEventListener('mouseover', () => {
            input.classList.remove('border-primary')
            input.classList.add('border', 'border-danger')
        })
        btn_eliminar.addEventListener('mouseout', () => {
            input.classList.remove('border', 'border-danger')
            input.classList.add('border-primary')
        })
        tareas.push(nuevaTarea)
        console.log(tareas)
    }
    else {
        ingreso.classList.add('border', 'border-danger')
        ingreso.placeholder = 'No hay tarea por ingresar'
    }
}


const filtrotareas = (value) => {
    let filtros = []
    if (value == 'Pendientes') {
        ul.innerHTML = ''
        filtros = tareas.filter(item => item.iscompleted == false)
        filtros.forEach(item => {
            ul.appendChild(item.html)
        })
    }
    else if (value == 'Completadas') {
        ul.innerHTML = ''
        filtros = tareas.filter(item => item.iscompleted == true)
        filtros.forEach(item => {
            ul.appendChild(item.html)
        })
    }
    else {
        filtros = tareas
        filtros.forEach(item => {
            ul.appendChild(item.html)
        })
    }

    console.log(filtros)
}

const filtrotareasbusca = (value) => {
    let busca = tareas.filter(item => item.texto.includes(value))
    ul.innerHTML = ""
    busca.filter(item => {
        ul.appendChild(item.html)
    })
}

filtrobuscador.addEventListener('keyup', (event) => {
    filtrotareasbusca(event.target.value)
    if(filtrobuscador.value==''){
        filtro.value=0
    }
})

button.addEventListener('click', () => {
    agregar()
})

ingreso.addEventListener('keydown', (event) => {
    if (event.key == 'Enter') {
        agregar()
    }
})

const changeconinput = (value) => {
    let newfiltro = []
    if (value == 'Pendientes') {
        ul.innerHTML = ''
        newfiltro = tareas.filter(item => item.texto.includes(filtrobuscador.value) && item.iscompleted == false)
        newfiltro.forEach(item => {
            ul.appendChild(item.html)
        })
    }
    else if (value == 'Completadas') {
        ul.innerHTML = ''
        newfiltro = tareas.filter(item => item.texto.includes(filtrobuscador.value) && item.iscompleted == true)
        newfiltro.forEach(item => {
            ul.appendChild(item.html)
        })
    }
    else if (value == 'Todos') {
        ul.innerHTML = ''
        newfiltro = tareas.filter(item => item.texto.includes(filtrobuscador.value))
        newfiltro.forEach(item => {
            ul.appendChild(item.html)
        })
    }
    else {
        newfiltro = tareas
        newfiltro.forEach(item => {
            ul.appendChild(item.html)
        })
    }
}

filtro.addEventListener('change', (event) => {
    if (filtrobuscador.value == '') {
        filtrotareas(event.target.value)
    } else {
        changeconinput(event.target.value)
    }
})