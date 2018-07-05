function createDataset(fields, constraints, sortFields) {
	var dsRetorno = DatasetBuilder.newDataset();
	
	try{
		//Adiciona colunas
		dsRetorno.addColumn("CODIGOGRUPO");
		dsRetorno.addColumn("PRODUTOGRUPO");
				
		//Preenche dataset com os registros
		dsRetorno.addRow(['02.01', 'SERVIÇOS CONTRATADOS']);
		dsRetorno.addRow(['02.02', 'VIAGENS']);
		dsRetorno.addRow(['02.03', 'ADIANTAMENTOS']);
		dsRetorno.addRow(['02.04', 'SERVIÇOS ESPECIALIZADOS']);
		dsRetorno.addRow(['02.05', 'ALUGUÉIS E ENCARGOS']);
		dsRetorno.addRow(['02.06', 'DIVULGAÇÃO, ANUNCIOS, PUBLICIDADE E PROPAGANDA']);
		dsRetorno.addRow(['02.07', 'SERVIÇOS GRÁFICOS E DE REPRODUÇÃO']);
		dsRetorno.addRow(['02.08', 'SERVIÇOS DE COMUNICAÇÃO EM GERAL']);
		dsRetorno.addRow(['02.09', 'DEMAIS CUSTOS E DESPESAS GERAIS']);
		
		dsRetorno.addRow(['03.01', 'TRANSFERÊNCIAS']);
		dsRetorno.addRow(['03.02', 'IMPOSTOS E TAXAS']);
		dsRetorno.addRow(['03.03', 'FOLHA DE PAGAMENTO']);
		dsRetorno.addRow(['03.04', 'DIVERSOS']);
		dsRetorno.addRow(['03.05', 'CONVENIO DE RECEITAS']);
		
		dsRetorno.addRow(['04.01', 'RECEITAS']);
		dsRetorno.addRow(['04.02', 'CURSOS']);
		dsRetorno.addRow(['04.03', 'CRÉDITO ORIENTADO']);
		
		return dsRetorno;		
	} catch (exception){
		dsRetorno.addColumn('erro');
		dsRetorno.addRow([exception.message + ' (' + exception.lineNumber + ')']);
		return dsRetorno;
	}
}