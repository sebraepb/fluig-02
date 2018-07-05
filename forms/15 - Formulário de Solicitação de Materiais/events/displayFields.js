function displayFields(form,customHTML){
	
	form.setShowDisabledFields(true);
	form.setHidePrintLink(true);
	
	var mode = form.getFormMode();
	
	var atividade = parseInt(getValue("WKNumState"));
	
	if (mode == "ADD") {
		form.setVisibleById("painel_aprov", false);
		var c1 = DatasetFactory.createConstraint("companyId", getValue("WKCompany"), getValue("WKCompany"), ConstraintType.MUST);		
		var c2 = DatasetFactory.createConstraint("colleagueId", getValue("WKUser"), getValue("WKUser"), ConstraintType.MUST);		
		var constraints = new Array(c1, c2);
		var colleague = DatasetFactory.getDataset("colleague", null, constraints, null);
		
		form.setValue('tbNomePessoa', colleague.getValue(0,"colleagueName"));
		form.setValue('tbCodPessoa', colleague.getValue(0,"login"));
		
		if (colleague.rowsCount > 0) {
			
			// Localiza o pesquisador pelo email 
			var c3 = DatasetFactory.createConstraint("PPESSOA.EMAIL", "\'"
					+ colleague.getValue(0, "mail") + "\'", "\'" + colleague.getValue(0, "mail") + "\'",
					ConstraintType.MUST);
			//var c4 = DatasetFactory.createConstraint("ATIVO", "'S'", "'S'", ConstraintType.MUST);
			//var c5 = DatasetFactory.createConstraint("COORDENADOR", "'S'", "'S'", ConstraintType.MUST);
			//var constraintsPesquisador = new Array(c3, c4, c5);
			var constraintsUsuario = new Array(c3);
						
			var usuario = DatasetFactory.getDataset("rm_consulta_chapausuario", null,
					constraintsUsuario, null);
			
			/*
			if (usuario.rowsCount > 0) { 
				
				form.setValue('tbCodPessoa', usuario.getValue(0, "CODPESSOA"));
				form.setValue('tbNomePessoa', usuario.getValue(0, "NOME"));
				form.setValue('tbChapaPessoa', usuario.getValue(0, "CHAPA"));
			}
			*/
		
		}
	} else if(atividade == 2){
		form.setEnabled("rm_dadoscolab", false);
		form.setEnabled("date2", false);
		form.setEnabled("rm_observacao", false);
		form.setEnabled("rmprojeto", false);
		form.setEnabled("rmacao", false);
		form.setEnabled("rmunidade", false);
		form.setEnabled("rmrecurso", false);
		form.setEnabled("rm_depto", false);
	} else if(atividade == 6 || atividade == 8){
		form.setEnabled("rm_dadoscolab", false);
		form.setEnabled("date2", false);
		form.setEnabled("rm_observacao", false);
		form.setEnabled("rmprojeto", false);
		form.setEnabled("rmacao", false);
		form.setEnabled("rmunidade", false);
		form.setEnabled("rmrecurso", false);
		form.setEnabled("rm_depto", false);
		form.setEnabled("aprovGerente", false);
		form.setEnabled("obsaprovGerente", false);
	}
	
	/*
	
	var ativAtual = getValue("WKNumState");
	var codEmpresa = getValue("WKCompany");
	var mode = form.getFormMode();
	
	var userEmail = getUserEmail();
	var dsChapasUsuario = getChapasUsuario(codEmpresa, userEmail);
	form.setValue('ativAtual', ativAtual);
	form.setValue('vl_codcoligada', "1");
	form.setValue('usuarioEmail', userEmail);
	
	var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", getValue("WKUser"), getValue("WKUser"), ConstraintType.MUST);
    var constraints = new Array(c1);
    var colaborador = DatasetFactory.getDataset("colleague",null,constraints,null);
                                                                                                                                                                                              
    form.setValue('tbNomePessoa', colaborador.getValue(0,"colleagueName"));  
	*/
	
	/*
	if(ativAtual == 0 || ativAtual == 1){
		form.setValue('tbCodPessoa', dsChapasUsuario.getValue(0,"CODPESSOA"));
		form.setValue('tbNomePessoa', dsChapasUsuario.getValue(0,"NOME"));
		form.setValue('tbChapaPessoa', dsChapasUsuario.getValue(0,"CHAPA"));
	}
	*/
	
	/*
	form.setShowDisabledFields(true);
	form.setHidePrintLink(true);
	*/
}


function getUserEmail(){
	var cUsuario, constraints = null;
	
	cUsuario = DatasetFactory.createConstraint("colleaguePK.colleagueId", 
			getValue("WKUser"), 
			getValue("WKUser"), 
			ConstraintType.MUST);
	
	constraints = new Array(cUsuario);
	
	var dsUsuario = DatasetFactory.getDataset("colleague", null, constraints, null);
	
	var userEmail = new Array(dsUsuario.getValue(0,"mail"));
	
	return userEmail;
}


function getChapasUsuario(codEmpresa, userEmail){
	var c1, c2, c3, constraints = null;

	c1 = DatasetFactory.createConstraint("RMSContext", 
			'CodColigada=' + codEmpresa,
			'CodColigada=' + codEmpresa,
			ConstraintType.MUST);
	
	c2 = DatasetFactory.createConstraint("RMSFILTER", 
			'PFUNC.CODCOLIGADA = ' + codEmpresa,
			'PFUNC.CODCOLIGADA = ' + codEmpresa,
			ConstraintType.MUST);

	c3 = DatasetFactory.createConstraint("PFUNC.CODSITUACAO", 
			"'D'",
			"'D'", 
			ConstraintType.MUST_NOT);
	
	constraints = new Array(c1, c2, c3);
	
	return DatasetFactory.getDataset("rm_consulta_chapausuario", userEmail, constraints, null);	
}