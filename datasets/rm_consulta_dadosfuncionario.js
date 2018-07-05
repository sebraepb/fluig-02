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

		//verificar usuário e senha
		var result = authenticatedService.readLookupView("FopFuncData", 
														 parseConstraints(constraints), 
														 parseContext(constraints),
														 '');
		
		var xmlResultados = new XML(result);
		dataset.addColumn("CODPESSOA");
		dataset.addColumn("CHAPA");
		dataset.addColumn("EMAIL");
		dataset.addColumn("CODFILIAL");
		dataset.addColumn("NOME");

		for	(index in xmlResultados.PFUNC) {			
			var row = new XML(xmlResultados.PFUNC[index]);
			
			dataset.addRow([
			    row.CODPESSOA.toString(),
			    row.CHAPA.toString(),
			    row.EMAIL.toString(),
			    row.CODFILIAL.toString(),
			    row.NOME.toString()
			]);
		}
				 		
		return dataset;
		
	}
    catch (e) {
    	
		if (e == null)	
			e = "Erro desconhecido; verifique o log do AppServer";
		
		var mensagemErro = "Erro na comunica��o com o TOTVS TBC: " + e;
		log.error(mensagemErro);
		dataset.addColumn("erro");
		dataset.addRow(new Array(mensagemErro));
		
		return dataset;
	}
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

//Transforma o conceito de constraints do Fluig para o Filtro do TBC.
function parseConstraints(constraints)
{
	var filter = "";
    
	for (var i = 0; i < constraints.length; i++) {
		var con = constraints[i];
    	
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
			filter += con.getFinalValue()();			
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
					filter += con.getInitialValue();
				}
				else if (ConstraintType.MUST_NOT == con.getConstraintType())
				{
					if (con.getInitialValue() == "\'\'")
						filter += " IS NOT NULL ";
					else
					{
						filter += " <> ";
						filter += con.getInitialValue();
					}
				}
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