package br.com.biblioteca.publica.controller;

import br.com.biblioteca.publica.dto.response.DashboardResponse;
import br.com.biblioteca.publica.service.RelatorioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/relatorios")
@RequiredArgsConstructor
public class RelatorioController {

    private final RelatorioService relatorioService;

    @GetMapping("/dashboard")
    public ResponseEntity<DashboardResponse> obterDashboard() {
        return ResponseEntity.ok(relatorioService.gerarDashboardAdmin());
    }
}