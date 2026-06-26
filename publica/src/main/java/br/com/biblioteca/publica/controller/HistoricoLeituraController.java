package br.com.biblioteca.publica.controller;

import br.com.biblioteca.publica.dto.request.HistoricoLeituraRequest;
import br.com.biblioteca.publica.dto.response.HistoricoResponse;
import br.com.biblioteca.publica.service.HistoricoLeituraService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/historicos")
@RequiredArgsConstructor
public class HistoricoLeituraController {
    private final HistoricoLeituraService historicoService;

    @GetMapping("/aluno/{alunoId}")
    public ResponseEntity<List<HistoricoResponse>> listarPorAluno(@PathVariable Long alunoId) {
        return ResponseEntity.ok(historicoService.listarPorAluno(alunoId));
    }

    // Endpoint unificado (Upsert): Inicia ou atualiza a leitura de forma transparente para o Front-End
    @PostMapping("/progresso")
    public ResponseEntity<HistoricoResponse> registrarOuAtualizarProgresso(@RequestBody @Valid HistoricoLeituraRequest request) {
        // O Service que criamos no passo anterior já faz essa lógica de buscar ou criar!
        return ResponseEntity.ok(historicoService.registrarProgresso(request));
    }

    // Mantemos a conclusão separada, pois é um evento de negócio específico (ex: emitir certificado/badge)
    @PatchMapping("/{id}/concluir")
    public ResponseEntity<HistoricoResponse> concluir(@PathVariable Long id) {
        return ResponseEntity.ok(historicoService.concluirLeitura(id));
    }
}