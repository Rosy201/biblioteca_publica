package br.com.biblioteca.publica.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;

public record EscolaRequest(
        String nome,
        String localizacao,

        @NotBlank
        @JsonProperty("codigo_inep") // Ensina o Spring a ler a chave com underline do JSON
        String codigoINEP
) {}
