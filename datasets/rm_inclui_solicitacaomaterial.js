function createDataset(fields, constraints, sortFields) {
	var NOME_SERVICO = "WSDATASERVER";
	var CAMINHO_SERVICO = "com.totvs.WsDataServer";	
   
	var dataset = DatasetBuilder.newDataset();
	
    try{
    	var servico = ServiceManager.getServiceInstance(NOME_SERVICO);
		log.info("Servico: " + servico);
		
		var serviceHelper = servico.getBean();
        var instancia = servico.instantiate(CAMINHO_SERVICO);
        log.info("Instancia: " + instancia);

        var ws = instancia.getRMIwsDataServer();     
        log.info("WS: " + ws);
        
        var ds_usuariorm = DatasetFactory.getDataset("rm_edu_fontedados_usuariorm", null, null, null);
        
        var authenticatedService = serviceHelper.getBasicAuthenticatedClient(ws, "com.totvs.IwsDataServer", ds_usuariorm.getValue(0, "CODUSUARIO"), ds_usuariorm.getValue(0, "SENHA"));
		
		log.error(ws);		
		
		var //fieldsXml = "<MovMovimento>";
			fieldsXml = "<TMOV>";
					fieldsXml += ValidaCampo("CODCOLIGADA", "1");
					fieldsXml += ValidaCampo("CODFILIAL", fields[0]);
					fieldsXml += ValidaCampo("IDMOV", "-1");
					//fieldsXml += ValidaCampo("CODCFO", "C00011");
					//fieldsXml += ValidaCampo("CODCOLCFO", "1");
					fieldsXml += ValidaCampo("CODTMV", "1.1.01");
					fieldsXml += ValidaCampo("INTEGRAAPLICACAO", "T");
					
					//fieldsXml += ValidaCampo("VALORBRUTOORIG", "50");
					
					fieldsXml += ValidaCampo("SERIE", "RQM");
					fieldsXml += ValidaCampo("STATUS", "A");
					//fieldsXml += ValidaCampo("DATAEMISSAO", "2017-10-10T00:00:00.00");
					fieldsXml += ValidaCampo("DATAEMISSAO", fields[1]);
					fieldsXml += ValidaCampo("CODCCUSTO", fields[2]);
					fieldsXml += ValidaCampo("CODDEPARTAMENTO", fields[3]);
					fieldsXml += ValidaCampo("CODVEN2", fields[5]);
					fieldsXml += ValidaCampo("NUMEROMOV", "-1");
			
				fieldsXml += "<TITMMOV>";
					fieldsXml += ValidaCampo("CODCOLIGADA", "1");
					fieldsXml += ValidaCampo("IDMOV", "-1");
					fieldsXml += ValidaCampo("NUMEROSEQUENCIAL", "1");
					fieldsXml += ValidaCampo("NSEQITMMOV", "1");
					fieldsXml += ValidaCampo("CODFILIAL", fields[0]);
					//fieldsXml += ValidaCampo("IDPRD", "6");
					fieldsXml += ValidaCampo("CODIGOPRD", fields[8]);
					fieldsXml += ValidaCampo("IDPRD", fields[9]);
					//fieldsXml += ValidaCampo("PRECOUNITARIOSELEC", "1");
					//fieldsXml += ValidaCampo("PRECOTABELA", "10");
					fieldsXml += ValidaCampo("QUANTIDADE", fields[7]);
					fieldsXml += ValidaCampo("CODDEPARTAMENTO", fields[3]);
					fieldsXml += ValidaCampo("CODTB2FAT", fields[10]);
					//fieldsXml += ValidaCampo("PRECOUNITARIO", "4");
				fieldsXml += "</TITMMOV>";
				/*
				fieldsXml += "<TITMMOV>";
					fieldsXml += ValidaCampo("CODCOLIGADA", "1");
					fieldsXml += ValidaCampo("IDMOV", "-1");
					fieldsXml += ValidaCampo("NUMEROSEQUENCIAL", "2");
					fieldsXml += ValidaCampo("NSEQITMMOV", "2");
					fieldsXml += ValidaCampo("CODFILIAL", "1");
					fieldsXml += ValidaCampo("IDPRD", "5");
					fieldsXml += ValidaCampo("CODIGOPRD", "01.02");
					fieldsXml += ValidaCampo("PRECOUNITARIOSELEC", "1");
					fieldsXml += ValidaCampo("PRECOTABELA", "10");
					fieldsXml += ValidaCampo("QUANTIDADE", "1");
					fieldsXml += ValidaCampo("PRECOUNITARIO", "2");
				fieldsXml += "</TITMMOV>";
				*/
				
				fieldsXml += "<TMOVCOMPL>";
					fieldsXml += ValidaCampo("CODCOLIGADA", "1");
					fieldsXml += ValidaCampo("IDMOV", "-1");
					fieldsXml += ValidaCampo("NUMPROCFLUIG", fields[6]);
				fieldsXml += "</TMOVCOMPL>";
			
			fieldsXml += "</TMOV>";
		
		//fieldsXml = "</MovMovimento>";
		
		log.error(fieldsXml);
		
		log.info("DataSet enviado para o TBC " + fieldsXml);		
		
		var result = authenticatedService.saveRecord("MovMovimentoTBCData", fieldsXml, parseContext(constraints));
	
		if ((result != null) && (result.indexOf("===") != -1))
		{
			var msgErro = result.substring(0, result.indexOf("==="));
			
			throw msgErro;
		}
		
		dataset.addColumn("RESULT");
		dataset.addRow(new Array(result));  
		
		return dataset;		
	}
    catch (e) {
    	
		if (e == null)	
			e = "Erro desconhecido; verifique o log do AppServer";
		
		var mensagemErro = "Erro na comunicação com o TOTVS TBC: " + e;
		log.error(mensagemErro);
		dataset.addColumn("ERROR");
		dataset.addRow(new Array(e));
		
		return dataset;
	}
}

function ValidaCampo(campo, valor)
{
	if ((valor != null) && (valor != ""))
	{
		return "<"+campo+">"+valor+"</"+ campo + "> ";
	}
	else
		return "";
}

function getDataFormatDB(dataIn){
	
	var result = "";
	
	if (dataIn != '' && dataIn != null && dataIn != undefined){
	
		//dd/mm/yyyy ou dd/MM/yyyy HH:mm:ss
		var vDataHora = dataIn.split(' ');
		
		//dd/mm/yyyy
		var aData = vDataHora[0].split('/');
			
		//yyyy-mm-dd
		result = aData[2] + '-' + aData[1] + '-' + aData[0];
			
		//Adiciona as horas (HH:mm:ss), caso tenha
		if (vDataHora.length > 1) {
			result += " " + vDataHora[1];			
		}
	}
				
	return result;
}

function parseContext(constraints)
{
	var context = "";
	if ((constraints != null) && (constraints.length > 0) && (constraints[0].getFieldName() == "RMSContext"))
		{
			context = constraints[0].getInitialValue();
		}
	
	return context;
}