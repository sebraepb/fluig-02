function displayFields(form,customHTML){
	
	form.setShowDisabledFields(true);
	form.setHidePrintLink(true);
	
	var mode = form.getFormMode();
	
	var atividade = parseInt(getValue("WKNumState"));
	
	if (mode == "ADD") {
		form.setVisibleById("painel_avalfornecedor", false);
		form.setVisibleById("painel_aprovacoes", false);
		
		var c1 = DatasetFactory.createConstraint("companyId", getValue("WKCompany"), getValue("WKCompany"), ConstraintType.MUST);		
		var c2 = DatasetFactory.createConstraint("colleagueId", getValue("WKUser"), getValue("WKUser"), ConstraintType.MUST);		
		var constraints = new Array(c1, c2);
		var colleague = DatasetFactory.getDataset("colleague", null, constraints, null);
		
		form.setValue('tbNomePessoa', colleague.getValue(0,"colleagueName"));
		form.setValue('tbCodPessoa', colleague.getValue(0,"login"));
	
		
	/*Atividade CLOG Compras*/	
	
	} else if(atividade == 70){ 
		form.setEnabled("rm_dadoscolab", false);
		form.setEnabled("rm_contratosativos", false);
		form.setEnabled("nomeevento", false);
		form.setEnabled("datainicial", false);
		form.setEnabled("datafinal", false);
		form.setEnabled("justinecess", false);
		
		form.setVisibleById("aprovGerente", false);
		form.setVisibleById("obsaprovGerente", false);
		form.setVisibleById("aprovGerenteUGAL", false);
		form.setVisibleById("obsaprovGerenteUGAL", false);
		form.setVisibleById("aprovDIREX", false);
		form.setVisibleById("obsaprovDIREX", false);
		form.setVisibleById("pergAditivo", false);
		form.setVisibleById("obsAditivo", false);
		
		form.setVisibleById("optSimplesNacional", false);
		form.setVisibleById("aprovClogFinalizacao", false);
		form.setVisibleById("obsaprovClogFinalizacao", false);
		form.setVisibleById("aprovPagGerente", false);
		form.setVisibleById("obsaprovPagGerente", false);
		form.setVisibleById("aprovPagDIREX", false);
		form.setVisibleById("obsaprovPagDIREX", false);
		
		form.setVisibleById("painel_avalfornecedor", false);
	
	/*Analisar Planejamento*/
	
	} else if(atividade == 23){ 
		form.setEnabled("rm_dadoscolab", false);
		form.setEnabled("rm_contratosativos", false);
		form.setEnabled("nomeevento", false);
		form.setEnabled("datainicial", false);
		form.setEnabled("datafinal", false);
		form.setEnabled("justinecess", false);
		
		form.setEnabled("certidaoFornec", false);
		form.setEnabled("disponibilFornec", false);
		
		//form.setVisibleById("aprovGerente", false);
		//form.setVisibleById("obsaprovGerente", false);
		
		form.setVisibleById("aprovGerenteUGAL", false);
		form.setVisibleById("obsaprovGerenteUGAL", false);
		form.setVisibleById("aprovDIREX", false);
		form.setVisibleById("obsaprovDIREX", false);
		form.setVisibleById("pergAditivo", false);
		form.setVisibleById("obsAditivo", false);
		
		form.setVisibleById("optSimplesNacional", false);
		form.setVisibleById("aprovClogFinalizacao", false);
		form.setVisibleById("obsaprovClogFinalizacao", false);
		form.setVisibleById("aprovPagGerente", false);
		form.setVisibleById("obsaprovPagGerente", false);
		form.setVisibleById("aprovPagDIREX", false);
		form.setVisibleById("obsaprovPagDIREX", false);
		
		form.setVisibleById("painel_avalfornecedor", false);
	
	/*Atividade Analisar a Adequação do Contrato*/
	
	} else if(atividade == 30){ 
		form.setEnabled("rm_dadoscolab", false);
		form.setEnabled("rm_contratosativos", false);
		form.setEnabled("nomeevento", false);
		form.setEnabled("datainicial", false);
		form.setEnabled("datafinal", false);
		form.setEnabled("justinecess", false);
		
		form.setEnabled("certidaoFornec", false);
		form.setEnabled("disponibilFornec", false);
		form.setEnabled("aprovGerente", false);
		form.setEnabled("obsaprovGerente", false);
		
		//form.setVisibleById("aprovGerenteUGAL", false);
		//form.setVisibleById("obsaprovGerenteUGAL", false);
		
		form.setVisibleById("aprovDIREX", false);
		form.setVisibleById("obsaprovDIREX", false);
		form.setVisibleById("pergAditivo", false);
		form.setVisibleById("obsAditivo", false);
		
		form.setVisibleById("optSimplesNacional", false);
		form.setVisibleById("aprovClogFinalizacao", false);
		form.setVisibleById("obsaprovClogFinalizacao", false);
		form.setVisibleById("aprovPagGerente", false);
		form.setVisibleById("obsaprovPagGerente", false);
		form.setVisibleById("aprovPagDIREX", false);
		form.setVisibleById("obsaprovPagDIREX", false);
		
		form.setVisibleById("painel_avalfornecedor", false);
	
	/*Autorização DIREX*/
	} else if(atividade == 34){ 
		form.setEnabled("rm_dadoscolab", false);
		form.setEnabled("rm_contratosativos", false);
		form.setEnabled("nomeevento", false);
		form.setEnabled("datainicial", false);
		form.setEnabled("datafinal", false);
		form.setEnabled("justinecess", false);
		
		form.setEnabled("certidaoFornec", false);
		form.setEnabled("disponibilFornec", false);
		form.setEnabled("aprovGerente", false);
		form.setEnabled("obsaprovGerente", false);		
		form.setEnabled("aprovGerenteUGAL", false);
		form.setEnabled("obsaprovGerenteUGAL", false);
		
		//form.setVisibleById("aprovDIREX", false);
		//form.setVisibleById("obsaprovDIREX", false);
		
		form.setVisibleById("pergAditivo", false);
		form.setVisibleById("obsAditivo", false);
		
		form.setVisibleById("optSimplesNacional", false);
		form.setVisibleById("aprovClogFinalizacao", false);
		form.setVisibleById("obsaprovClogFinalizacao", false);
		form.setVisibleById("aprovPagGerente", false);
		form.setVisibleById("obsaprovPagGerente", false);
		form.setVisibleById("aprovPagDIREX", false);
		form.setVisibleById("obsaprovPagDIREX", false);
		
		form.setVisibleById("painel_avalfornecedor", false);
	
	/*Emitir OCS*/
	} else if(atividade == 36){ 
		form.setEnabled("rm_dadoscolab", false);
		form.setEnabled("rm_contratosativos", false);
		//form.setEnabled("nomeevento", false);
		//form.setEnabled("datainicial", false);
		//form.setEnabled("datafinal", false);
		form.setEnabled("justinecess", false);
		
		form.setEnabled("certidaoFornec", false);
		form.setEnabled("disponibilFornec", false);
		form.setEnabled("aprovGerente", false);
		form.setEnabled("obsaprovGerente", false);		
		form.setEnabled("aprovGerenteUGAL", false);
		form.setEnabled("obsaprovGerenteUGAL", false);	
		form.setEnabled("aprovDIREX", false);
		form.setEnabled("obsaprovDIREX", false);
		
		form.setVisibleById("pergAditivo", false);
		form.setVisibleById("obsAditivo", false);
		
		form.setVisibleById("optSimplesNacional", false);
		form.setVisibleById("aprovClogFinalizacao", false);
		form.setVisibleById("obsaprovClogFinalizacao", false);
		form.setVisibleById("aprovPagGerente", false);
		form.setVisibleById("obsaprovPagGerente", false);
		form.setVisibleById("aprovPagDIREX", false);
		form.setVisibleById("obsaprovPagDIREX", false);
		
		form.setVisibleById("painel_avalfornecedor", false);
	
	/*Comunicar Fornecedor*/
	} else if(atividade == 76){ 
		form.setEnabled("rm_dadoscolab", false);
		form.setEnabled("rm_contratosativos", false);
		form.setEnabled("nomeevento", false);
		form.setEnabled("datainicial", false);
		form.setEnabled("datafinal", false);
		form.setEnabled("justinecess", false);
		
		form.setEnabled("certidaoFornec", false);
		form.setEnabled("disponibilFornec", false);
		form.setEnabled("aprovGerente", false);
		form.setEnabled("obsaprovGerente", false);		
		form.setEnabled("aprovGerenteUGAL", false);
		form.setEnabled("obsaprovGerenteUGAL", false);
		form.setEnabled("aprovDIREX", false);
		form.setEnabled("obsaprovDIREX", false);
		
		form.setVisibleById("pergAditivo", false);
		form.setVisibleById("obsAditivo", false);
		
		form.setVisibleById("optSimplesNacional", false);
		form.setVisibleById("aprovClogFinalizacao", false);
		form.setVisibleById("obsaprovClogFinalizacao", false);
		form.setVisibleById("aprovPagGerente", false);
		form.setVisibleById("obsaprovPagGerente", false);
		form.setVisibleById("aprovPagDIREX", false);
		form.setVisibleById("obsaprovPagDIREX", false);
		
		form.setVisibleById("painel_avalfornecedor", false);
	
	/*Acompanhar Serviço*/
	} else if(atividade == 43){ 
		form.setEnabled("rm_dadoscolab", false);
		form.setEnabled("rm_contratosativos", false);
		form.setEnabled("nomeevento", false);
		form.setEnabled("datainicial", false);
		form.setEnabled("datafinal", false);
		form.setEnabled("justinecess", false);
		
		form.setEnabled("certidaoFornec", false);
		form.setEnabled("disponibilFornec", false);
		form.setEnabled("aprovGerente", false);
		form.setEnabled("obsaprovGerente", false);		
		form.setEnabled("aprovGerenteUGAL", false);
		form.setEnabled("obsaprovGerenteUGAL", false);
		form.setEnabled("aprovDIREX", false);
		form.setEnabled("obsaprovDIREX", false);
		
		//form.setVisibleById("pergAditivo", false);
		//form.setVisibleById("obsAditivo", false);
		
		form.setVisibleById("optSimplesNacional", false);
		form.setVisibleById("aprovClogFinalizacao", false);
		form.setVisibleById("obsaprovClogFinalizacao", false);
		form.setVisibleById("aprovPagGerente", false);
		form.setVisibleById("obsaprovPagGerente", false);
		form.setVisibleById("aprovPagDIREX", false);
		form.setVisibleById("obsaprovPagDIREX", false);
		
		form.setVisibleById("painel_avalfornecedor", false);
	
	/*Avaliar Fornecedor*/
	} else if(atividade == 47){ 
		form.setEnabled("rm_dadoscolab", false);
		form.setEnabled("rm_contratosativos", false);
		form.setEnabled("nomeevento", false);
		form.setEnabled("datainicial", false);
		form.setEnabled("datafinal", false);
		form.setEnabled("justinecess", false);
		
		form.setEnabled("certidaoFornec", false);
		form.setEnabled("disponibilFornec", false);
		form.setEnabled("aprovGerente", false);
		form.setEnabled("obsaprovGerente", false);		
		form.setEnabled("aprovGerenteUGAL", false);
		form.setEnabled("obsaprovGerenteUGAL", false);
		form.setEnabled("aprovDIREX", false);
		form.setEnabled("obsaprovDIREX", false);
		form.setEnabled("pergAditivo", false);
		form.setEnabled("obsAditivo", false);
		
		form.setVisibleById("optSimplesNacional", false);
		form.setVisibleById("aprovClogFinalizacao", false);
		form.setVisibleById("obsaprovClogFinalizacao", false);
		form.setVisibleById("aprovPagGerente", false);
		form.setVisibleById("obsaprovPagGerente", false);
		form.setVisibleById("aprovPagDIREX", false);
		form.setVisibleById("obsaprovPagDIREX", false);
		
		//form.setVisibleById("painel_avalfornecedor", false);
	}
}