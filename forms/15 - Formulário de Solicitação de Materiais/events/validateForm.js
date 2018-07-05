function validateForm(form){
	
	var activity = getValue('WKNumState');
	
	if ((form.getValue("tbGerente") == null || form.getValue("tbGerente") == "") && (getValue('WKNumProces') == null || (getValue('WKNumProces') > 0 && getValue('WKCompletTask') == 'true'))) {
        throw "Favor, selecionar os dados do colaborador.";
    }
	
	if ((form.getValue("date2") == null || form.getValue("date2") == "") && (getValue('WKNumProces') == null || (getValue('WKNumProces') > 0 && getValue('WKCompletTask') == 'true'))) {
        throw "Favor, informar a data da solicitação.";
    }
	
	if ((form.getValue("rmprojeto") == null || form.getValue("rmprojeto") == "") && (getValue('WKNumProces') == null || (getValue('WKNumProces') > 0 && getValue('WKCompletTask') == 'true'))) {
        throw "Favor, informar o Projeto.";
    }
	
	if ((form.getValue("rmacao") == null || form.getValue("rmacao") == "") && (getValue('WKNumProces') == null || (getValue('WKNumProces') > 0 && getValue('WKCompletTask') == 'true'))) {
        throw "Favor, informar a Ação.";
    }
	
	if ((form.getValue("rm_codunidade") == null || form.getValue("rm_codunidade") == "") && (getValue('WKNumProces') == null || (getValue('WKNumProces') > 0 && getValue('WKCompletTask') == 'true'))) {
        throw "Favor, informar o Recurso.";
    }
	
	if ((form.getValue("rm_depto") == null || form.getValue("rm_depto") == "") && (getValue('WKNumProces') == null || (getValue('WKNumProces') > 0 && getValue('WKCompletTask') == 'true'))) {
        throw "Favor, informar o Departamento.";
    }
	
	if (activity == 2){		
	
		if ((form.getValue("aprovGerente") == null || form.getValue("aprovGerente") == "") && (getValue('WKNumProces') == null || (getValue('WKNumProces') > 0 && getValue('WKCompletTask') == 'true'))) {
	        throw "Favor, marcar a opção do parecer.";
	    }
		
		if ((form.getValue("obsaprovGerente") == null || form.getValue("obsaprovGerente") == "") && (getValue('WKNumProces') == null || (getValue('WKNumProces') > 0 && getValue('WKCompletTask') == 'true'))) {
	        throw "Favor, informar o parecer.";
	    }
	
	}
	
	/*
	if ((form.getValue("rm_grupoprod") == null || form.getValue("rm_grupoprod") == "") && (getValue('WKNumProces') == null || (getValue('WKNumProces') > 0 && getValue('WKCompletTask') == 'true'))) {
        throw "Favor, selecione o Grupo de Materiais.";
    }
	
	if ((form.getValue("rm_produto") == null || form.getValue("rm_produto") == "") && (getValue('WKNumProces') == null || (getValue('WKNumProces') > 0 && getValue('WKCompletTask') == 'true'))) {
        throw "Favor, selecione os Itens da Solicitação.";
    }
	
	if ((form.getValue("rmquant") == null || form.getValue("rmquant") == "") && (getValue('WKNumProces') == null || (getValue('WKNumProces') > 0 && getValue('WKCompletTask') == 'true'))) {
        throw "Favor, informe a quantidade do item selecionado.";
    }
    */
}