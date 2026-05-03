package br.com.biblioteca.publica.service;

import br.com.biblioteca.publica.dto.request.SupervisorRequest;
import br.com.biblioteca.publica.dto.request.SupervisorUpdateRequest;
import br.com.biblioteca.publica.dto.response.SupervisorResponse;
import br.com.biblioteca.publica.entity.Escola;
import br.com.biblioteca.publica.entity.Supervisor;
import br.com.biblioteca.publica.enums.PerfilEnum;
import br.com.biblioteca.publica.repository.EscolaRepository;
import br.com.biblioteca.publica.repository.SupervisorRepository;
import br.com.biblioteca.publica.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SupervisorService {

    private final SupervisorRepository supervisorRepository;
    private final EscolaRepository escolaRepository;
    private final UsuarioRepository usuarioRepository;

    public List<SupervisorResponse> listarTodos() {
        return supervisorRepository.findAll().stream()
                .map(SupervisorResponse::from).toList();
    }

    public SupervisorResponse buscarPorId(Long id) {
        return SupervisorResponse.from(supervisorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Supervisor não encontrado: " + id)));
    }

    public List<SupervisorResponse> buscarPorEscola(Long escolaId) {
        return supervisorRepository.findByEscolaId(escolaId).stream()
                .map(SupervisorResponse::from).toList();
    }

    public SupervisorResponse criar(SupervisorRequest request) {
        if (usuarioRepository.existsByEmail(request.email())) {
            throw new RuntimeException("E-mail já cadastrado: " + request.email());
        }
        Escola escola = escolaRepository.findById(request.escolaId())
                .orElseThrow(() -> new RuntimeException("Escola não encontrada: " + request.escolaId()));

        Supervisor supervisor = Supervisor.builder()
                .nome(request.nome())
                .email(request.email())
                .senha(request.senha())
                .perfil(PerfilEnum.SUPERVISOR)
                .cargo(request.cargo())
                .departamento(request.departamento())
                .escola(escola)
                .build();
        return SupervisorResponse.from(supervisorRepository.save(supervisor));
    }

    public SupervisorResponse atualizar(Long id, SupervisorUpdateRequest request) {
        Supervisor supervisor = supervisorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Supervisor não encontrado: " + id));

        supervisor.setNome(request.nome());
        supervisor.setEmail(request.email());
        supervisor.setCargo(request.cargo());
        supervisor.setDepartamento(request.departamento());

        if (request.senha() != null && !request.senha().isBlank()) {
            supervisor.setSenha(request.senha());
        }

        if (request.escolaId() != null) {
            Escola escola = escolaRepository.findById(request.escolaId())
                    .orElseThrow(() -> new RuntimeException("Escola não encontrada: " + request.escolaId()));
            supervisor.setEscola(escola);
        }

        return SupervisorResponse.from(supervisorRepository.save(supervisor));
    }

    public void deletar(Long id) {
        if (!supervisorRepository.existsById(id)) {
            throw new RuntimeException("Supervisor não encontrado: " + id);
        }
        supervisorRepository.deleteById(id);
    }
}
