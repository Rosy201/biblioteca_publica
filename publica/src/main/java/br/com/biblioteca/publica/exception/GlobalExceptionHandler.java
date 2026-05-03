package br.com.biblioteca.publica.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Map<String, Object>> handleRuntimeException(RuntimeException ex) {

        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;

        String msg = ex.getMessage() != null ? ex.getMessage().toLowerCase() : "";
        if (msg.contains("não encontrado") || msg.contains("nao encontrado")) {
            status = HttpStatus.NOT_FOUND;
        } else if (msg.contains("já cadastrado") || msg.contains("ja cadastrado")
                || msg.contains("já existe") || msg.contains("ja existe")) {
            status = HttpStatus.CONFLICT;
        } else if (msg.contains("inválido") || msg.contains("invalido")) {
            status = HttpStatus.BAD_REQUEST;
        }

        return ResponseEntity.status(status).body(Map.of(
                "timestamp", LocalDateTime.now().toString(),
                "status", status.value(),
                "erro", ex.getMessage() != null ? ex.getMessage() : "Erro interno"
        ));
    }
}
