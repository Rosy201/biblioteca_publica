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

import java.util.List;

@Service
@RequiredArgsConstructor
public class HistoricoLeituraService {

    private final HistoricoLeituraRepository historicoRepository;
    private final AlunoRepository alunoRepository;
    private final LivroRepository livroRepository;

    public List<HistoricoResponse> listarPorAluno(Long alunoId) {
        return historicoRepository.findByAlunoId(alunoId).stream()
                .map(HistoricoResponse::from).toList();
    }

    public HistoricoResponse iniciarLeitura(HistoricoLeituraRequest request) {
        Aluno aluno = alunoRepository.findById(request.alunoId())
                .orElseThrow(() -> new RuntimeException("Aluno não encontrado: " + request.alunoId()));
        Livro livro = livroRepository.findById(request.livroId())
                .orElseThrow(() -> new RuntimeException("Livro não encontrado: " + request.livroId()));

        HistoricoLeitura historico = HistoricoLeitura.builder()
                .aluno(aluno)
                .livro(livro)
                .build();
        return HistoricoResponse.from(historicoRepository.save(historico));
    }

    public HistoricoResponse atualizarProgresso(Long id, int pagina) {
        HistoricoLeitura historico = historicoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Histórico não encontrado: " + id));
        historico.atualizarProgresso(pagina);
        return HistoricoResponse.from(historicoRepository.save(historico));
    }

    public HistoricoResponse concluirLeitura(Long id) {
        HistoricoLeitura historico = historicoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Histórico não encontrado: " + id));
        historico.setConcluido(true);
        return HistoricoResponse.from(historicoRepository.save(historico));
    }
}
