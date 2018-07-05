function createDataset(fields, constraints, sortFields) {
	
	var NOME_SERVICO = "WSCONSULTASQL";
    var CAMINHO_SERVICO = "com.totvs.WsConsultaSQL";
   
	var dataset = DatasetBuilder.newDataset();
	
	var filtro = constraints[0].getInitialValue();
		
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
		var result = authService.realizarConsultaSQL("Fluig.SQL.07", 1 , "T", "CODFILIAL="+filtro);	
		
        if ((result != null) && (result.indexOf("===") != -1))
		{
			var msgErro = result.substring(0, result.indexOf("==="));
			
			throw msgErro;
		}
        
		var xmlResultados = new XML(result);  

		dataset.addColumn("CODFILIALDEPTO");
		dataset.addColumn("CODDEPARTAMENTO");
		dataset.addColumn("DEPARTAMENTO");

		for each(consql in xmlResultados.Resultado) {
			dataset.addRow(new Array(
					consql.CODFILIALDEPTO.toString(),
					consql.CODDEPARTAMENTO.toString(),
					consql.DEPARTAMENTO.toString()
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