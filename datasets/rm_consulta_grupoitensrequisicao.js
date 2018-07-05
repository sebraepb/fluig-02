function createDataset(fields, constraints, sortFields) {
	var dsRetorno = DatasetBuilder.newDataset();
	
	try{
		//Adiciona colunas
		dsRetorno.addColumn("CODIGOGRUPO");
		dsRetorno.addColumn("PRODUTOGRUPO");
				
		//Preenche dataset com os registros
		dsRetorno.addRow(['01.01', 'MATERIAIS DE INFORMÁTICA']);
		dsRetorno.addRow(['01.02', 'PAPELARIA EM GERAL']);
		dsRetorno.addRow(['01.03', 'MATERIAIS DE LIMPEZA']);
		dsRetorno.addRow(['01.04', 'MATERIAIS DE MANUTENÇÃO E REPARO']);
		dsRetorno.addRow(['01.05', 'MATERIAIS DE NATUREZA PERMANENTE']);
		dsRetorno.addRow(['01.06', 'MATERIAIS TÉCNICO E DIDÁTICO']);
		dsRetorno.addRow(['01.07', 'INVESTIMENTO']);
		dsRetorno.addRow(['01.08', 'IMOBILIZADO']);
		dsRetorno.addRow(['01.09', 'COPA E REFEITÓRIO']);
		dsRetorno.addRow(['01.99', 'OUTROS MATERIAIS']);
		
		return dsRetorno;		
	} catch (exception){
		dsRetorno.addColumn('erro');
		dsRetorno.addRow([exception.message + ' (' + exception.lineNumber + ')']);
		return dsRetorno;
	}
}


/*
function createDataset(fields, constraints, sortFields) {
	
	var NOME_SERVICO = "WSCONSULTASQL";
    var CAMINHO_SERVICO = "com.totvs.WsConsultaSQL";
   
	var dataset = DatasetBuilder.newDataset();
	
	var filt = constraints[0].getInitialValue();
		
    try{
		var servico = ServiceManager.getServiceInstance(NOME_SERVICO);
		log.info("Servico: " + servico);
		var instancia = servico.instantiate(CAMINHO_SERVICO);
		log.info("Instancia: " + instancia);
		var ws = instancia.getRMIwsConsultaSQL();	
		log.info("WS: " + ws);
		
		var serviceHelper = servico.getBean();
		
		var ds_usuariorm = DatasetFactory.getDataset("rm_edu_fontedados_usuariorm", null, null, null);
        var authService = serviceHelper.getBasicAuthenticatedClient(ws, "com.totvs.IwsConsultaSQL", ds_usuariorm.getValue(0, "CODUSUARIO"), ds_usuariorm.getValue(0, "SENHA"));
		
		//var authService = serviceHelper.getBasicAuthenticatedClient(ws, "com.totvs.IwsConsultaSQL", 'mestre', 'rmgeral2017');
		
		// Executa uma consulta previamente disponibilizada e cadastrada no RM
		var result = authService.realizarConsultaSQL("Fluig.SQL.01", 1 , "T", "");	
		
        if ((result != null) && (result.indexOf("===") != -1))
		{
			var msgErro = result.substring(0, result.indexOf("==="));
			
			throw msgErro;
		}
        
		var xmlResultados = new XML(result);  

		dataset.addColumn("CODIGOGRUPO");
		dataset.addColumn("PRODUTOGRUPO");

		for each(consql in xmlResultados.Resultado) {
			dataset.addRow(new Array(
					consql.CODIGOPRD.toString(),
					consql.PRODUTO.toString()
			));        
		}
		
		return dataset;
		
	} catch (e) {
		if (e == null)	e = "Erro desconhecido; verifique o log do AppServer";
		var mensagemErro = "Erro na comunicação com o Progress OpenEdge: " + e;
		log.error(mensagemErro);
		dataset.addColumn("ERROR");
		dataset.addRow(new Array(mensagemErro));
		return dataset;
	}	
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
    			filter += con.getFinalValue()
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
*/