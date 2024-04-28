function limpa_formulário_cep() {
    //Limpa valores do formulário de cep.
    document.getElementById('txt_rua').innerHTML=("");
    document.getElementById('txt_bairro').innerHTML=("");
    document.getElementById('txt_cidade').innerHTML=("");
    document.getElementById('txt_estado').innerHTML=("");
}

function meu_callback(conteudo) {
if (!("erro" in conteudo)) {
    //Atualiza os campos com os valores.
    document.getElementById('txt_rua').innerHTML=(conteudo.logradouro);
    document.getElementById('txt_bairro').innerHTML=(conteudo.bairro);
    document.getElementById('txt_cidade').innerHTML=(conteudo.localidade);
    document.getElementById('txt_estado').innerHTML=(conteudo.uf);
} //end if.
else {
    //CEP não Encontrado.
    limpa_formulário_cep();
    alert("CEP não encontrado.");
}
}

function pesquisacep() {

let valor = document.getElementById('i_cep').value;
let div_resp = document.getElementById('resp');

div_resp.style.display="block";

//Nova variável "cep" somente com dígitos.
var cep = valor.replace(/\D/g, '');

//Verifica se campo cep possui valor informado.
if (cep != "") {

    //Expressão regular para validar o CEP.
    var validacep = /^[0-9]{8}$/;

    //Valida o formato do CEP.
    if(validacep.test(cep)) {

        //Preenche os campos com "..." enquanto consulta webservice.
        document.getElementById('txt_rua').innerHTML="...";
        document.getElementById('txt_bairro').innerHTML="...";
        document.getElementById('txt_cidade').innerHTML="...";
        document.getElementById('txt_estado').innerHTML="...";

        //Cria um elemento javascript.
        var script = document.createElement('script');

        //Sincroniza com o callback.
        script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';

        //Insere script no documento e carrega o conteúdo.
        document.body.appendChild(script);

    } //end if.
    else {
        //cep é inválido.
        limpa_formulário_cep();
        alert("Formato de CEP inválido.");
    }
} //end if.
else {
    //cep sem valor, limpa formulário.
    limpa_formulário_cep();
}
};