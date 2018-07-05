function createDataset(fields, constraints, sortFields) {
	//Cria dataset de retorno
	var dsRetorno = DatasetBuilder.newDataset();
	
	try{
		//Adiciona colunas
		dsRetorno.addColumn("CODUSUARIO");
		dsRetorno.addColumn("NOME");
		dsRetorno.addColumn("SENHA");
		dsRetorno.addColumn("EMAIL");
				
		//Preenche dataset com os registros
		dsRetorno.addRow(['mestre', 'Usuário mestre', 'rmgeral2017', '']);
		
		return dsRetorno;		
	} catch (exception){
		dsRetorno.addColumn('erro');
		dsRetorno.addRow([exception.message + ' (' + exception.lineNumber + ')']);
		return dsRetorno;
	}
}