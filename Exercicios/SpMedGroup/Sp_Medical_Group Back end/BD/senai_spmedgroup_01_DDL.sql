CREATE DATABASE SPMedGroup;
GO

USE SPMedGroup;
GO

CREATE TABLE Clinica
(
	idClinica INT PRIMARY KEY IDENTITY
	, NomeClinica VARCHAR(200) NOT NULL
	, cnpj CHAR(14) UNIQUE NOT NULL
	, RazaoSocial VARCHAR(200)
	, EnderecoClinica VARCHAR(200)
	, HorarioAbertura TIME NOT NULL
	, HorarioFechamento TIME NOT NULL
);
GO

CREATE TABLE TipoUsuario
(
	idTipoUsuario INT PRIMARY KEY IDENTITY
	, TipoUsuario VARCHAR(200) NOT NULL UNIQUE
);
GO

CREATE TABLE SituacaoConsulta
(
	idSituacao INT PRIMARY KEY IDENTITY
	, Situacao VARCHAR(200) NOT NULL UNIQUE
);
GO

CREATE TABLE Especialidade
(
	idEspecialidade INT PRIMARY KEY IDENTITY
	, Especialidade VARCHAR(200) UNIQUE NOT NULL
);
GO

CREATE TABLE Usuario
(
	idUsuario INT PRIMARY KEY IDENTITY
	, idTipoUsuario INT FOREIGN KEY REFERENCES TipoUsuario(idTipoUsuario)
	, Email VARCHAR(200) UNIQUE NOT NULL
	, Senha VARCHAR(200) NOT NULL
);
GO

CREATE TABLE Paciente
(
	idPaciente INT PRIMARY KEY IDENTITY
	, idUsuario INT FOREIGN KEY REFERENCES Usuario(idUsuario)
	, NomePaciente VARCHAR(200) NOT NULL
	, Telefone VARCHAR(200)
	, rg CHAR(9) UNIQUE NOT NULL
	, cpf CHAR(11) UNIQUE
	, DataNascimento DATE NOT NULL
	, Endereco VARCHAR(200) 
);
GO

CREATE TABLE Medico
(
	idMedico INT PRIMARY KEY IDENTITY
	, idEspecialidade INT FOREIGN KEY REFERENCES Especialidade(idEspecialidade) NOT NULL
	, idClinica INT FOREIGN KEY REFERENCES Clinica(idCLinica) NOT NULL
	, idUsuario INT FOREIGN KEY REFERENCES Usuario(idUsuario) NOT NULL
	, NomeMedico VARCHAR(200) NOT NULL
	, crm CHAR(7) UNIQUE NOT NULL
);
GO

CREATE TABLE Consulta
(
	idConsulta INT PRIMARY KEY IDENTITY
	, idMedico INT FOREIGN KEY REFERENCES Medico(idMedico) NOT NULL
	, idPaciente INT FOREIGN KEY REFERENCES Paciente(idPaciente) NOT NULL
	, idSituacao INT FOREIGN KEY REFERENCES SituacaoConsulta(idSituacao) NOT NULL DEFAULT 1
	, DataConsulta DATETIME NOT NULL
	, Descricao VARCHAR(200) 
);
GO