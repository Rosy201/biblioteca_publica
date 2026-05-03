package br.com.biblioteca.publica.service;

import br.com.biblioteca.publica.dto.request.AdministradorRequest;
import br.com.biblioteca.publica.dto.response.AdministradorResponse;
import br.com.biblioteca.publica.entity.Administrador;
import br.com.biblioteca.publica.enums.PerfilEnum;
import br.com.biblioteca.publica.repository.AdministradorRepository;
import br.com.biblioteca.publica.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdministradorService {

    private final AdministradorRepository administradorRepository;
    private final UsuarioRepository usuarioRepository;

    public List<AdministradorResponse> listarTodos() {
        return administradorRepository.findAll().stream()
                .map(AdministradorResponse::from).toList();
    }

    public AdministradorResponse buscarPorId(Long id) {
        return AdministradorResponse.from(administradorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Administrador não encontrado: " + id)));
    }

    public AdministradorResponse criar(AdministradorRequest request) {
        if (usuarioRepository.existsByEmail(request.email())) {
            throw new RuntimeException("E-mail já cadastrado: " + request.email());
        }
        Administrador admin = Administrador.builder()
                .nome(request.nome())
                .email(request.email())
                .senha(request.senha())
                .perfil(PerfilEnum.ADMINISTRADOR)
                .build();
        return AdministradorResponse.from(administradorRepository.save(admin));
    }

    public AdministradorResponse atualizar(Long id, AdministradorRequest request) {
        Administrador admin = administradorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Administrador não encontrado: " + id));

        admin.setNome(request.nome());
        admin.setEmail(request.email());
        if (request.senha() != null && !request.senha().isBlank()) {
            admin.setSenha(request.senha());
        }
        return AdministradorResponse.from(administradorRepository.save(admin));
    }

    public void deletar(Long id) {
        if (!administradorRepository.existsById(id)) {
            throw new RuntimeException("Administrador não encontrado: " + id);
        }
        administradorRepository.deleteById(id);
    }
}
