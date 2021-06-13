USE SPMedGroup;
GO

--Mostrou a quantidade de usuários após realizar a importação do banco de dados
SELECT COUNT(idUsuario) AS Numero_de_Usuarios FROM Usuario;

--Calculou a idade do usuário a partir da data de nascimento
SELECT NomePaciente,
(
	CASE
		WHEN
			MONTH (GETDATE()) > MONTH (DataNascimento)
		OR
		(
			MONTH (GETDATE()) = MONTH (DataNascimento)
			AND DAY (GETDATE()) > DAY (DataNascimento)
		)
		THEN DATEDIFF (YEAR, DataNascimento, GETDATE())
		ELSE DATEDIFF (YEAR, DataNascimento, GETDATE()) -1
	END
) AS Idade_dos_Pacientes FROM Paciente
GO

--O médico poderá ver os agendamentos (consultas) associados a ele
SELECT M.NomeMedico, P.NomePaciente, SC.Situacao, CONVERT(NVARCHAR, DataConsulta, 103) AS Data_da_Consulta, C.Descricao FROM Medico M
INNER JOIN Consulta C
ON M.idMedico = C.idMedico
INNER JOIN SituacaoConsulta SC
ON C.idSituacao = SC.idSituacao
INNER JOIN Paciente P
ON P.idPaciente = C.idPaciente
WHERE M.idMedico = 3;
GO

--O paciente poderá visualizar suas próprias consultas
SELECT P.NomePaciente, M.NomeMedico, SC.Situacao, CONVERT(NVARCHAR, DataConsulta, 103) AS Data_da_Consulta, C.Descricao FROM Paciente P
INNER JOIN Consulta C
ON P.idPaciente = C.idMedico
INNER JOIN SituacaoConsulta SC
ON C.idSituacao = SC.idSituacao
INNER JOIN Medico M
ON M.idMedico = C.idMedico
WHERE P.idPaciente = 3;
GO

--Converteu a data de nascimento do usuário para o formato (mm-dd-yyyy) na exibição
SELECT idPaciente, NomePaciente, CONVERT(NVARCHAR, DataNascimento, 101) AS Data_de_Nascimento FROM Paciente;
GO

--Criou uma função para retornar a quantidade de médicos de uma determinada especialidade
CREATE FUNCTION ContarMedicos(@Especialidade VARCHAR(200))
RETURNS INT
AS
BEGIN
	DECLARE @Numero INT
	SET @Numero = (SELECT COUNT(idMedico) FROM Medico M
					INNER JOIN Especialidade E
					ON M.idEspecialidade = E.idEspecialidade
					WHERE Especialidade = @Especialidade)
	RETURN @Numero
END
SELECT Numero_de_Medicos_da_Especialidade = dbo.ContarMedicos('Anestesiologia');



--Criou uma função para que retorne a idade do usuário a partir de uma determinada stored procedure
CREATE FUNCTION RetornarDataNascimento (@NomeRecebido VARCHAR(200))
RETURNS DATE
AS
BEGIN
	DECLARE @Nascimento DATE
	SET @Nascimento = (SELECT DataNascimento FROM Paciente WHERE NomePaciente = @NomeRecebido)

	RETURN @Nascimento
END

CREATE PROCEDURE IdadeDoPaciente (@NomePaciente VARCHAR(200))
AS
DECLARE @DataNascimento DATE
		, @Idade INT
	SET @DataNascimento = dbo.RetornarDataNascimento(@NomePaciente)
		

	
	IF MONTH (GETDATE()) > MONTH (@DataNascimento)
		SET @Idade = DATEDIFF (YEAR, @DataNascimento, GETDATE())
	ELSE
		IF MONTH (GETDATE()) = MONTH (@DataNascimento) AND DAY (GETDATE()) > DAY (@DataNascimento)
			SET @Idade = DATEDIFF (YEAR, @DataNascimento, GETDATE())
		ELSE
			SET @Idade = DATEDIFF (YEAR, @DataNascimento, GETDATE()) -1

	SELECT @Idade AS Idade_do_Paciente
GO

EXEC IdadeDoPaciente @NomePaciente = 'Mariana'