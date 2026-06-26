package br.com.biblioteca.publica.service;

import br.com.biblioteca.publica.dto.request.MarcadorRequest;
import br.com.biblioteca.publica.dto.response.MarcadorResponse;
import br.com.biblioteca.publica.entity.HistoricoLeitura;
import br.com.biblioteca.publica.entity.MarcadorPagina;
import br.com.biblioteca.publica.repository.HistoricoLeituraRepository;
import br.com.biblioteca.publica.repository.MarcadorPaginaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class MarcadorPaginaService {

    private final MarcadorPaginaRepository marcadorRepository;
    private final HistoricoLeituraRepository historicoRepository;

    @Transactional
    public MarcadorResponse salvarOuAtualizarMarcador(MarcadorRequest request) {
        HistoricoLeitura historico = historicoRepository.findById(request.historicoId())
                .orElseThrow(() -> new RuntimeException("Histórico de leitura não encontrado."));

        // Busca o marcador existente ou instancia um novo em memória
        MarcadorPagina marcador = marcadorRepository.findByHistoricoId(request.historicoId())
                .orElseGet(() -> MarcadorPagina.builder().historico(historico).build());

        // Atualiza a posição da página
        marcador.setPosicao(request.posicao());

        MarcadorPagina salvo = marcadorRepository.save(marcador);
        return MarcadorResponse.from(salvo);
    }

    public MarcadorResponse buscarPorHistorico(Long historicoId) {
        MarcadorPagina marcador = marcadorRepository.findByHistoricoId(historicoId)
                .orElseThrow(() -> new RuntimeException("Nenhum marcador encontrado para este histórico."));
        return MarcadorResponse.from(marcador);
    }
}