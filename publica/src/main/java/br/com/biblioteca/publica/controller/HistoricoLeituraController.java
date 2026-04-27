package br.com.biblioteca.publica.controller;

import br.com.biblioteca.publica.dto.request.HistoricoLeituraRequest;
import br.com.biblioteca.publica.dto.response.HistoricoResponse;
import br.com.biblioteca.publica.service.HistoricoLeituraService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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

    @PostMapping
    public ResponseEntity<HistoricoResponse> iniciarLeitura(@RequestBody HistoricoLeituraRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(historicoService.iniciarLeitura(request));
    }

    @PatchMapping("/{id}/progresso")
    public ResponseEntity<HistoricoResponse> atualizarProgresso(
            @PathVariable Long id,
            @RequestParam int pagina) {
        return ResponseEntity.ok(historicoService.atualizarProgresso(id, pagina));
    }

    @PatchMapping("/{id}/concluir")
    public ResponseEntity<HistoricoResponse> concluir(@PathVariable Long id) {
        return ResponseEntity.ok(historicoService.concluirLeitura(id));
    }
}
