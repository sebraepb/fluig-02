function validateForm(form){
	
	var activity = getValue('WKNumState');
	
	if ((form.getValue("tbGerente") == null || form.getValue("tbGerente") == "") && (getValue('WKNumProces') == null || (getValue('WKNumProces') > 0 && getValue('WKCompletTask') == 'true'))) {
        throw "Favor, selecionar os dados do colaborador.";
    }
	
	if ((form.getValue("rm_contratosativos") == null || form.getValue("rm_contratosativos") == "") && (getValue('WKNumProces') == null || (getValue('WKNumProces') > 0 && getValue('WKCompletTask') == 'true'))) {
        throw "Favor, informe o contrato.";
    }
	
	if ((form.getValue("nomeevento") == null || form.getValue("nomeevento") == "") && (getValue('WKNumProces') == null || (getValue('WKNumProces') > 0 && getValue('WKCompletTask') == 'true'))) {
        throw "Favor, informe o nome do evento.";
    }
	
	if ((form.getValue("datainicial") == null || form.getValue("datainicial") == "") && (getValue('WKNumProces') == null || (getValue('WKNumProces') > 0 && getValue('WKCompletTask') == 'true'))) {
        throw "Favor, informe a data inicial do evento.";
    }
	
	if ((form.getValue("datafinal") == null || form.getValue("datafinal") == "") && (getValue('WKNumProces') == null || (getValue('WKNumProces') > 0 && getValue('WKCompletTask') == 'true'))) {
		throw "Favor, informe a data final do evento.";
    }
	
}