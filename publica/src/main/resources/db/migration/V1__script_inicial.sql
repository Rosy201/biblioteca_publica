 CREATE TABLE escolas (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    localizacao VARCHAR(255),
    codigo_inep VARCHAR(50) UNIQUE NOT NULL
) ENGINE=InnoDB;

CREATE TABLE livros (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    autor VARCHAR(255),
    url_conteudo VARCHAR(500),
    categoria VARCHAR(50) NOT NULL,
    escola_id BIGINT,
    CONSTRAINT fk_livro_escola FOREIGN KEY (escola_id) REFERENCES escolas(id) ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE usuarios (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    perfil VARCHAR(30) NOT NULL,
    escola_id BIGINT NULL,
    CONSTRAINT fk_usuario_escola FOREIGN KEY (escola_id) REFERENCES escolas(id) ON DELETE SET NULL
) ENGINE=InnoDB;


CREATE TABLE alunos (
    usuario_id BIGINT PRIMARY KEY,
    matricula VARCHAR(50) UNIQUE NOT NULL,
    data_cadastro DATE,
    escola_id BIGINT,
    CONSTRAINT fk_aluno_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    CONSTRAINT fk_aluno_escola FOREIGN KEY (escola_id) REFERENCES escolas(id)
) ENGINE=InnoDB;


CREATE TABLE supervisores (
    usuario_id BIGINT PRIMARY KEY,
    cargo VARCHAR(100),
    departamento VARCHAR(100),
    escola_id BIGINT,
    CONSTRAINT fk_supervisor_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    CONSTRAINT fk_supervisor_escola FOREIGN KEY (escola_id) REFERENCES escolas(id)
) ENGINE=InnoDB;


CREATE TABLE administradores (
    usuario_id BIGINT PRIMARY KEY,
    CONSTRAINT fk_admin_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
) ENGINE=InnoDB;


CREATE TABLE historicos_leitura (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    progresso_pagina INT DEFAULT 0,
    data_acesso DATETIME DEFAULT CURRENT_TIMESTAMP,
    concluido BOOLEAN DEFAULT FALSE,
    aluno_id BIGINT NOT NULL,
    livro_id BIGINT NOT NULL,
    CONSTRAINT fk_historico_aluno FOREIGN KEY (aluno_id) REFERENCES alunos(usuario_id) ON DELETE CASCADE,
    CONSTRAINT fk_historico_livro FOREIGN KEY (livro_id) REFERENCES livros(id)
) ENGINE=InnoDB;

CREATE TABLE marcadores_pagina (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    posicao INT NOT NULL,
    data_criacao DATE,
    historico_id BIGINT UNIQUE NOT NULL,
    CONSTRAINT fk_marcador_historico FOREIGN KEY (historico_id) REFERENCES historicos_leitura(id) ON DELETE CASCADE
) ENGINE=InnoDB;


CREATE TABLE escola_livros (
    escola_id BIGINT NOT NULL,
    livro_id BIGINT NOT NULL,
    PRIMARY KEY (escola_id, livro_id),
    CONSTRAINT fk_associacao_escola FOREIGN KEY (escola_id) REFERENCES escolas(id) ON DELETE CASCADE,
    CONSTRAINT fk_associacao_livro FOREIGN KEY (livro_id) REFERENCES livros(id) ON DELETE CASCADE
) ENGINE=InnoDB;