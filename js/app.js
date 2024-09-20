
let adicionaBtn = document.querySelector('#adicionar');
let listaTarefas = document.querySelector('#lista-tarefas');
let recarregaBtn = document.querySelector('#recarregar');
let enter = document.querySelector('#entrada-item')

function salvarTarefas() {
    let tarefas = [ ];
    document.querySelectorAll('#lista-tarefas li').forEach(function (tarefaLi) {
        
        let textoTarefa = tarefaLi.querySelector('.texto-tarefa');
        let concluida = textoTarefa.style.textDecoration === 'line-through';
        
        tarefas.push({
            texto: textoTarefa.textContent,
            concluida: concluida
        });
    });
    
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}



function carregarTarefas (){
    //pega o array tarefas salvo no navegador
    let tarefas = JSON.parse(localStorage.getItem('tarefas'));

    //se ele encontra o array
    if(tarefas){

        //ele cria uma funçao para adicionar as tarefas no Dom
        tarefas.forEach(function(tarefa){
            adicionarTarefaDOM(tarefa)
        })
    }
};


recarregaBtn.addEventListener('click', recarregar)
function recarregar(){
    listaTarefas.innerHTML = "";

   salvarTarefas();
};


function adicionarTarefaDOM(tarefa){

      let tarefaTexto = typeof tarefa === 'string' ? tarefa : tarefa.texto;
        
        //cria uma li para cada tarefa
        let novaTarefa = document.createElement('li');

        //corta a primeira letra do texto e a transforma em maiuscula
        let tarefaLetraMaiuscula = tarefaTexto.charAt(0).toUpperCase() + tarefaTexto.slice(1);

        //para cada nova tarefa é adicionado esta estrutura
        novaTarefa.innerHTML =  ` <span class= "texto-tarefa"> ${tarefaLetraMaiuscula} </span>
                 
                  <div>
                      <button class="concluido">
                         <img class="conclu" src="./img/tarefa-concluida.png" alt="Tarefa concluída" width="30px">
                     </button>

                      <button class="remover">
                         <img class="remov" src="./img/remover.png" alt="Remover Tarefa" width="25px">
                      </button>
                  </div>
                `
        
        if (tarefa.concluida) {
            
            novaTarefa.querySelector('.texto-tarefa').style.textDecoration = 'line-through';
        }

        //adiciona a nova tarefa criada dentro da lista de tarefas
        listaTarefas.appendChild(novaTarefa);

        
        //adiciona eventos de click nos botoes de remover e concluir dentro da nova tarefa
         novaTarefa.querySelector('.remover').addEventListener('click', remover);
         novaTarefa.querySelector('.concluido').addEventListener('click', concluir);

         //chama a funçao salvartarefas para salvar as alteracoes
         salvarTarefas();
    
};



function adicionar(){
    let entrada = document.querySelector('#entrada-item').value;


    if(entrada.length == 0){
        alert('Não é possível adicioar uma tarefa vazia!');
    }else{

        //se a entrada nao estiver vazia ele adiciona as tarefas ao DOM com a funcao 
        adicionarTarefaDOM({ texto: entrada, concluida: false });

        //limpa a entrada depois de adicionar a tarefa
        document.querySelector('#entrada-item').value = '';

    }

};



function concluir(event){

    //encontra o elemento li mais próximo do botao clicado
    let tarefaConcluida = event.target.closest('li');

    //seleciona o textoTarefa dentro da li
    let textoTarefa = tarefaConcluida.querySelector('.texto-tarefa');

    if (textoTarefa.style.textDecoration === 'line-through') {
        textoTarefa.style.textDecoration = 'none';  
    } else {
        textoTarefa.style.textDecoration = 'line-through';  
    }

  salvarTarefas();
};



function remover(event){

    //encontra o elemento li mais proximo do botao clicado
    let tarefaRemovida = event.target.closest('li');

    if(tarefaRemovida){
     tarefaRemovida.remove() ;
    }

    salvarTarefas();
};

window.addEventListener('DOMContentLoaded' , carregarTarefas);
adicionaBtn.addEventListener('click', adicionar);

enter.addEventListener('keydown', function(event){
    if (event.key === 'Enter') {
        adicionar();
    }

});
      

    

