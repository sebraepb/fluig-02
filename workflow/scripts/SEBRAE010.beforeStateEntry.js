var ATIVIDADE = 2;
var EMITIROCS = 76;

function beforeStateEntry(sequenceId){
	
	//LOG
	log.info("######## ENTRANDO NO BEFORESTATEENTRY ########");
	
	if (sequenceId == EMITIROCS)
	{
		//LOG
		log.info("######## INCLUINDO OS DADOS NO BEFORESTATEENTRY DA MEDICAO CONTRATO ########");
		
		//Recupera mapeamento de todos campos do formulário
		var camposFichario = new java.util.HashMap();
		camposFichario = hAPI.getCardData(getValue("WKNumProces"));				
		
		var tableXml = "";
		
		SalvaMedicaoContrato(camposFichario, tableXml);
	}
	
}

function SalvaMedicaoContrato(camposFichario, xmlTables)
{
	var NOME_SERVICO = "WSDATASERVER";
    var CAMINHO_SERVICO = "com.totvs.WsDataServer";
    
    var IdProcesso = getValue("WKNumProces"); 
    
    var servico = ServiceManager.getServiceInstance(NOME_SERVICO);
	
	var serviceHelper = servico.getBean();
    var instancia = servico.instantiate(CAMINHO_SERVICO);

    var ws = instancia.getRMIwsDataServer();
    
    var ds_usuariorm = DatasetFactory.getDataset("rm_edu_fontedados_usuariorm", null, null, null);
    
    var authenticatedService = serviceHelper.getBasicAuthenticatedClient(ws, "com.totvs.IwsDataServer", ds_usuariorm.getValue(0, "CODUSUARIO"), ds_usuariorm.getValue(0, "SENHA"));	

    log.error(ws);		
	
	var fieldsXml = "<DATASET>";
				
		fieldsXml += getXMLItensMedicaContrato(camposFichario);
		
		fieldsXml += "</DATASET>";
	
	//Cria contexto RM
	var contexto = DatasetFactory.createConstraint("RMSContext","CodColigada= 1;CodFilial=1;CodTipoCurso=1;CodSistema=T", "", ConstraintType.MUST);
	
	try{
		//Salva movimento e outros
		var result = authenticatedService.saveRecord("RMSPRJ4238336Server", fieldsXml, contexto);
		
		if ((result != null) && (result.indexOf("===") != -1))
		{
			var msgErro = result.substring(0, result.indexOf("==="));
			
			throw msgErro;
		}
	}
	catch (e){
		
		if (e == null)
		{
			e = "Erro desconhecido; verifique o log do AppServer";
    	}
		
		var mensagemErro = "Erro na comunicação com o TOTVS TBC: " + e;
		log.error(mensagemErro + " ---> " + fieldsXml);
		
		throw mensagemErro;
	}	
}

function getXMLItensMedicaContrato(camposFichario){
	
	var numSolicitacao    = getValue("WKNumProces");
	
	var codigoservico = "FLUIG" + numSolicitacao;
	
	var xml = "";
	
	var arrayCampos = getIndiceFields(camposFichario, "rm_itemcontrato");
	
	for ( var i = 0; i < arrayCampos.length; i++) {
		var idx = arrayCampos[i];
		
		xml += "<ZMDMEDICAOCONTRATO> ";
		xml += ValidaCampo("ID", 						"-1"); // Setamos um número negativo, pois esse será gerado ao salvar o registro RM (AUTOINC)
		xml += ValidaCampo("IDCNT",						camposFichario.get("tbIdCnt")); 
		xml += ValidaCampo("NSEQITMCNT", 				camposFichario.get("rm_prodseq___" + idx));
		xml += ValidaCampo("STATUS",					"0");
		xml += ValidaCampo("CODCOLIGADA",				"1");
		xml += ValidaCampo("DATA", 						(new Date()).toLocaleDateString());
		xml += ValidaCampo("QUANTIDADE", 				camposFichario.get("rmquant___" + idx));
		xml += ValidaCampo("VALOR", 					camposFichario.get("rmvalor___" + idx));
		xml += ValidaCampo("CODIGOSERVICO",				codigoservico);
		
		xml += "</ZMDMEDICAOCONTRATO> ";
	}
	
	return xml;
}

function getIndiceFields(camposFichario, nomePesquisa){
	
	//Cria array para armazenar os campos do dataset
	var indiceFields = new Array();
	
	var percorre = camposFichario.keySet().iterator();
	
	while (percorre.hasNext()){
		
		var campo = percorre.next();
		
		// Busca somente os campos filhos (todos utilizam o padrão "___")
		if (campo.indexOf('___') >= 0){
			
			var nomecampo = String(campo.split('___')[0]);
			var indice = campo.split('___')[1];
			
			if (nomecampo == nomePesquisa){
				indiceFields.push(indice);
			}		
		}
	}
	
	return indiceFields;
}


function ValidaCampo(campo, valor)
{
	if ((valor != null) && (valor != ""))
	{
		return "<"+campo+">"+valor+"</"+ campo + "> ";
	}
	else
	{
		return "";
	}
}