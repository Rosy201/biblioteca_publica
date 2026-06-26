package br.com.biblioteca.publica.service;

import br.com.biblioteca.publica.dto.request.HistoricoLeituraRequest;
import br.com.biblioteca.publica.dto.response.HistoricoResponse;
import br.com.biblioteca.publica.entity.Aluno;
import br.com.biblioteca.publica.entity.HistoricoLeitura;
import br.com.biblioteca.publica.entity.Livro;
import br.com.biblioteca.publica.repository.AlunoRepository;
import br.com.biblioteca.publica.repository.HistoricoLeituraRepository;
import br.com.biblioteca.publica.repository.LivroRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class HistoricoLeituraService {

    private final HistoricoLeituraRepository historicoRepository;
    private final AlunoRepository alunoRepository;
    private final LivroRepository livroRepository;

    // Método para o GET: Lista todos os históricos de um aluno
    @Transactional(readOnly = true)
    public List<HistoricoResponse> listarPorAluno(Long alunoId) {
        return historicoRepository.findByAlunoId(alunoId).stream()
                .map(HistoricoResponse::from)
                .toList();
    }

    // Método para o POST (Upsert): Inicia leitura ou atualiza a página
    @Transactional
    public HistoricoResponse registrarProgresso(HistoricoLeituraRequest request) {
        HistoricoLeitura historico = historicoRepository
                .findByAlunoIdAndLivroId(request.alunoId(), request.livroId())
                .orElseGet(() -> criarNovoHistorico(request.alunoId(), request.livroId()));

        historico.atualizarProgresso(request.paginaAtual());

        return HistoricoResponse.from(historicoRepository.save(historico));
    }

    // Método para o PATCH: Marca o livro como concluído
    @Transactional
    public HistoricoResponse concluirLeitura(Long id) {
        HistoricoLeitura historico = historicoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Histórico de leitura não encontrado: " + id));

        historico.setConcluido(true); // Se você usou primitivo (boolean) na entidade, é setConcluido(true)

        return HistoricoResponse.from(historicoRepository.save(historico));
    }

    // Método auxiliar privado
    private HistoricoLeitura criarNovoHistorico(Long alunoId, Long livroId) {
        Aluno aluno = alunoRepository.findById(alunoId)
                .orElseThrow(() -> new RuntimeException("Aluno não encontrado: " + alunoId));
        Livro livro = livroRepository.findById(livroId)
                .orElseThrow(() -> new RuntimeException("Livro não encontrado: " + livroId));

        HistoricoLeitura build = HistoricoLeitura.builder()
                .aluno(aluno)
                .livro(livro)
                .build();
        return build;
    }
}