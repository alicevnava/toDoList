const button = document.querySelector('.buttonAddTask')
const input = document.querySelector('.inputTask')
const completeList = document.querySelector('.listTask')

let itemsList = []

function addNewTask(){
    //console.log(input.value) // pega o valor do input

    // remove espaços em branco no começo e no final
    const taskText = input.value.trim() 
    // não pode add tarefa vazia
    if (taskText === '') {
        alert('Por favor, digite uma tarefa antes de adicionar.')
        return // impede que continue
    }
    // add no array
    itemsList.push({
        chore: input.value, // pega o valor do input
        complete: false // se a tarefa está completa ou não
    })
    //console.log(itemsList) --< adicionar no final do array
    input.value = '' // limpa o input

    showTasks() // chama a função para mostrar as tarefas
}
    
function showTasks(){
    let newList = ''

    itemsList.forEach ((item, index) => {
        // pega o item que já tem e adiocna o novo item
       newList = newList +
       `<li class="task ${item.complete && 'done'}">
            <img src="assets/icons/feito.png" alt="check" onclick="checkItem(${index})">
            <p>${item.chore}</p>
            <img src="assets/icons/excluir.png" alt="deletar" onclick="deleteItem(${index})">
       </li>`
    })//fim forEach

    completeList.innerHTML = newList

    // armazenamento no localStorage
    localStorage.setItem('list',JSON.stringify(itemsList)) 
    //stringify transforma objeto em string. json só aceita strin e não objeto
} 

// concluir tarefa
function checkItem(index){
    //console.log(index)
    itemsList[index].complete = !itemsList[index].complete // inverte o valor de complete

    showTasks()
}

// adicionar tarefa
button.addEventListener('click', addNewTask)


// deletar
function deleteItem (index){
    //console.log(index)
    //itemsList.splice(index, 1) //qual posição vai deletar e quantos
    //showTasks() // chama a função para mostrar as tarefas
    
    const taskItems = document.querySelectorAll('.task');
    const itemToRemove = taskItems[index];

    //Animate.css
    itemToRemove.classList.add('animate__animated', 'animate__fadeOut');

    setTimeout(() => {
        itemsList.splice(index, 1);
        showTasks();
    }, 600);
}


// salvar no localStorage
function refreshPage(){
    const localStorageTasks = localStorage.getItem('list') // pega o item do localStorage
    //console.log(localStorageTasks)

    if (localStorageTasks){
        itemsList = JSON.parse(localStorageTasks) // transforma a string em objeto
    }

   

    showTasks() // chama a função para mostrar as tarefas
}
refreshPage()