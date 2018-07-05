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
        
        //var authenticatedService = serviceHelper.getBasicAuthenticatedClient(ws, "com.totvs.IwsDataServer", 'mestre', 'totvs');
        
		//verificar usuário e senha
        var result = authenticatedService.readViewEmail("FopFuncUsuarioData", 
        		parseConstraints(constraints), 
        		parseContext(constraints),
        		fields[0]);
		
		if ((result != null) && (result.indexOf("===") != -1))
		{
			var msgErro = result.substring(0, result.indexOf("==="));
			
			throw msgErro;
		}
		
		var xmlResultados = new XML(result);  

		dataset.addColumn("CHAPA");
		dataset.addColumn("CODCOLIGADA");
		dataset.addColumn("CODFILIAL");
		dataset.addColumn("CODSECAO");
		dataset.addColumn("NOME_SECAO");
		dataset.addColumn("NOME");
		dataset.addColumn("CODPESSOA");


		for	each(pFunc in xmlResultados.PFunc) {
			dataset.addRow(new Array(pFunc.CHAPA.toString(),
					pFunc.CODCOLIGADA.toString(),
					pFunc.CODFILIAL.toString(),
					pFunc.CODSECAO.toString(),
					pFunc.NOME_SECAO.toString(),
					pFunc.NOME.toString(),
					pFunc.CODPESSOA.toString())); 
		}

		return dataset;
	}catch (e) {
		if (e == null)	e = "Erro desconhecido; verifique o log do AppServer";
		var mensagemErro = "Erro na comunicação com o Progress OpenEdge: " + e;
		log.error(mensagemErro);
		dataset.addColumn("Erro");
		dataset.addRow(new Array(mensagemErro));
		return dataset;
	}
}


function ValidaCampo(campo, valor){
	if ((valor != null) && (valor != ""))
	{
		return "<"+campo+">"+valor+"</"+ campo + ">";
	}
	else
		return "<"+campo+"></"+ campo + ">";
}

function parseContext(constraints){
	var context = "";
	if ((constraints != null) && (constraints.length > 0) && (constraints[0].getFieldName() == "RMSContext"))
		{
			context = constraints[0].getInitialValue();
		}
	
	return context;
}

//Transforma o conceito de constraints do Fluig para o Filtro do TBC.
function parseConstraints(constraints)
{
	var filter = "";
    for	each(con in constraints) {
    	
    	if (con.getFieldName().toUpperCase() == "RMSCONTEXT")
    		continue;
    	
    	filter += "(";
    	
    	if (con.getFieldName().toUpperCase() == "RMSFILTER")
		{
    		filter += con.getInitialValue();
		}
    	else if (con.getConstraintType() == ConstraintType.SHOULD)
		{
    		filter += "(";
			filter += con.getFieldName();
			filter += "=";
			filter += con.getInitialValue();			
			filter += ")";
			filter += " OR ";
			filter += "(";
			filter += con.getFieldName();
			filter += "=";
			filter += con.getFinalValue();			
			filter += ")";
		}
    	else
		{
    		if (con.getInitialValue() == con.getFinalValue())
			{
				filter += con.getFieldName();
				
				if (ConstraintType.MUST == con.getConstraintType())
				{
					filter += " = ";
				}
				else if (ConstraintType.MUST_NOT == con.getConstraintType())
				{
					filter += " <> ";
				}
				
				filter += con.getInitialValue();
			}
    		else
			{
    			filter += con.getFieldName();
    			filter += " BETWEEN ";
    			filter += con.getInitialValue();
    			filter += " AND ";
    			filter += con.getFinalValue();
			}
		}
    	
		filter += ")";

		filter += " AND ";
	}
    
    if (filter.length == 0)
    {
    	filter = "1=1";    	
    }
    else
    	filter = filter.substring(0, filter.length-5);
    
    return filter;
}