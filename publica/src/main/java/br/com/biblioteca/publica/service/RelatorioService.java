package br.com.biblioteca.publica.service;

import br.com.biblioteca.publica.dto.response.CategoriaEngajamentoResponse;
import br.com.biblioteca.publica.dto.response.DashboardResponse;
import br.com.biblioteca.publica.repository.HistoricoLeituraRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RelatorioService {

    private final HistoricoLeituraRepository historicoRepository;

    // A anotação @Cacheable avisa o Spring para guardar o resultado deste método na memória.
    // Na próxima vez que a rota for chamada, ele devolve o cache em vez de ir ao banco.
    @Cacheable("dashboardAdmin")
    @Transactional(readOnly = true)
    public DashboardResponse gerarDashboardAdmin() {
        Long concluidos = historicoRepository.countLivrosConcluidos();

        // Define o que é um aluno ativo (ex: acessou nos últimos 7 dias)
        LocalDateTime dataCorte = LocalDateTime.now().minusDays(7);
        Long ativos = historicoRepository.countAlunosAtivos(dataCorte);

        // O repositório já devolve o DTO instanciado e pronto para uso graças ao JPA Projection!
        List<CategoriaEngajamentoResponse> engajamento = historicoRepository.countEngajamentoPorCategoria();

        return new DashboardResponse(concluidos, ativos, engajamento);
    }
}