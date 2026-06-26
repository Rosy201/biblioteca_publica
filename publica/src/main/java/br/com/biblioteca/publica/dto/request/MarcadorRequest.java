package br.com.biblioteca.publica.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record MarcadorRequest(
        @NotNull Long historicoId,
        @NotNull @Min(1) Integer posicao
) {}