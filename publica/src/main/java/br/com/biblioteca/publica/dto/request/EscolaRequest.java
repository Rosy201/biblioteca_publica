package br.com.biblioteca.publica.dto.request;

public record EscolaRequest(
        String nome,
        String localizacao,
        String codigoINEP
) {}
