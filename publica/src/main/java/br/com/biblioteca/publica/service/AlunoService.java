package br.com.biblioteca.publica.service;

import br.com.biblioteca.publica.dto.request.AlunoRequest;
import br.com.biblioteca.publica.dto.response.AlunoResponse;
import br.com.biblioteca.publica.entity.Aluno;
import br.com.biblioteca.publica.entity.Escola;
import br.com.biblioteca.publica.enums.PerfilEnum;
import br.com.biblioteca.publica.repository.AlunoRepository;
import br.com.biblioteca.publica.repository.EscolaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AlunoService {

    private final AlunoRepository alunoRepository;
    private final EscolaRepository escolaRepository;

    public List<AlunoResponse> listarTodos() {
        return alunoRepository.findAll().stream()
                .map(AlunoResponse::from).toList();
    }

    public AlunoResponse buscarPorId(Long id) {
        return AlunoResponse.from(alunoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Aluno não encontrado: " + id)));
    }

    public List<AlunoResponse> buscarPorEscola(Long escolaId) {
        return alunoRepository.findByEscolaId(escolaId).stream()
                .map(AlunoResponse::from).toList();
    }

    public AlunoResponse criar(AlunoRequest request) {
        if (alunoRepository.existsByMatricula(request.matricula())) {
            throw new RuntimeException("Matrícula já cadastrada: " + request.matricula());
        }
        Escola escola = escolaRepository.findById(request.escolaId())
                .orElseThrow(() -> new RuntimeException("Escola não encontrada: " + request.escolaId()));

        Aluno aluno = Aluno.builder()
                .nome(request.nome())
                .email(request.email())
                .senha(request.senha())
                .perfil(PerfilEnum.ALUNO)
                .matricula(request.matricula())
                .dataCadastro(LocalDate.now())
                .escola(escola)
                .build();
        return AlunoResponse.from(alunoRepository.save(aluno));
    }

    public void deletar(Long id) {
        alunoRepository.deleteById(id);
    }
}
