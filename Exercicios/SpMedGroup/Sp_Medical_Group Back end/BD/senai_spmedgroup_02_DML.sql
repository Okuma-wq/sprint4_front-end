USE SPMedGroup;

INSERT INTO Clinica (NomeClinica, cnpj, RazaoSocial, EnderecoClinica, HorarioAbertura, HorarioFechamento)
VALUES	('Clinica Possarle', 86400902000130, 'SP Medical Group', 'Av. Bar�o Limeira, 532, S�o Paulo, SP', '07:00', '20:00');
GO

INSERT INTO TipoUsuario (TipoUsuario)
VALUES	('administrador')
		, ('M�dico')
		, ('Paciente');
GO

INSERT INTO SituacaoConsulta (Situacao)
VALUES	('Agendada')
		, ('Cancelada')
		, ('Realizada');
GO

INSERT INTO Especialidade (Especialidade)
VALUES	('Acupuntura')
		, ('Anestesiologia')
		, ('Angiologia')
		, ('Cardiologia')
		, ('Cirurgia Cardiovascular')
		, ('Cirurgia da M�o')
		, ('Cirurgia do Aparelho Digestivo')
		, ('Cirurgia Geral')
		, ('Cirurgia Pedi�trica')
		, ('Cirurgia Pl�stica')
		, ('Cirurgia Tor�cica')
		, ('Cirurgia Vascular')
		, ('Dermatologia')
		, ('Radioterapia')
		, ('Urologia')
		, ('Pediatria')
		, ('Psiquiatria');
Go

INSERT INTO Usuario (idTipoUsuario, Email, Senha)
VALUES	(1, 'administrador@adm.com', 'userADM')
		, (2, 'ricardo.lemos@spmedicalgroup.com.br' , '12345')
		, (2, 'roberto.possarle@spmedicalgroup.com.br', '54321')
		, (2, 'helena.souza@spmedicalgroup.com.br', '13254')
		, (3, 'ligia@gmail.com', 'paciente1')
		, (3, 'alexandre@gmail.com', 'paciente2')
		, (3, 'fernando@gmail.com', 'paciente3')
		, (3, 'henrique@gmail.com', 'paciente4')
		, (3,'joao@hotmail.com', 'paciente5')
		, (3, 'bruno@gmail.com', 'paciente6')
		, (3, 'mariana@outlook.com', 'paciente7');
GO


--Converteu a data de nascimento do usu�rio para o formato (mm-dd-yyyy) na exibi��o
SET DATEFORMAT MDY;
INSERT INTO Paciente (idUsuario, NomePaciente, Telefone, rg, cpf, DataNascimento , Endereco)
VALUES	(5, 'Ligia', '11 3456-7654', '435225435', '94839859000', '10/13/1983', 'Rua Estado de Israel 240,�S�o Paulo, Estado de S�o Paulo, 04022-000')
		, (6, 'Alexandre', '11 98765-6543', '326543457', '73556944057', '7/23/2001', 'Av. Paulista, 1578 - Bela Vista, S�o Paulo - SP, 01310-200')
		, (7, 'Fernando', '11 97208-4453', '546365253', '16839338002', '10/10/1978', 'Av. Ibirapuera - Indian�polis, 2927,  S�o Paulo - SP, 04029-200')
		, (8, 'Henrique', '11 3456-6543', '543663625', '14332654765', '10/13/1985', 'R. Vit�ria, 120 - Vila Sao Jorge, Barueri - SP, 06402-030')
		, (9, 'Jo�o', '11 7656-6377', '532544441', '91305348010', '8/27/1975', 'R. Ver. Geraldo de Camargo, 66 - Santa Luzia, Ribeir�o Pires - SP, 09405-380')
		, (10, 'Bruno', '11 95436-8769', '545662667', '79799299004', '3/21/1972', 'Alameda dos Arapan�s, 945 - Indian�polis, S�o Paulo - SP, 04524-001')
		, (11, 'Mariana', '', '545662668', '13771913039', '3/5/2018', 'R Sao Antonio, 232 - Vila Universal, Barueri - SP, 06407-140');
GO

INSERT INTO Medico (idEspecialidade, idClinica, idUsuario, NomeMedico, crm)
VALUES	(2, 1, 2, 'Ricardo Lemos', '54356SP')
		, (17, 1, 3, 'Roberto Possarle', '53452SP')
		, (16, 1, 4, 'Helena Strada', '65463SP');
GO

INSERT INTO Consulta (idMedico, idPaciente, idSituacao, DataConsulta)
VALUES	(3, 7, 3, '1/20/20 15:00')
		, (2, 2, 2, '1/6/20 10:00')
		, (2, 3, 3, '2/7/20 11:00')
		, (2, 2, 3, '2/6/18 10:00')
		, (1, 4, 2, '2/7/19 11:00')
		, (3, 7, 1, '3/8/20 15:00')
		, (1, 4, 1, '3/9/20 11:00');
GO

--O administrador poder� cancelar o agendamento
UPDATE Consulta
SET idSituacao = 2
WHERE idConsulta = 2;

--O m�dico poder� incluir a descri��o da consulta que estar� vinculada ao paciente (prontu�rio)
UPDATE Consulta
SET Descricao = 'Caiu e quebrou o bra�o'
WHERE idConsulta = 1;