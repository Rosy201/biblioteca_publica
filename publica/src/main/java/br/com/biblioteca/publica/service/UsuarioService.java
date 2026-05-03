package br.com.biblioteca.publica.service;

import br.com.biblioteca.publica.dto.response.UsuarioResumoResponse;
import br.com.biblioteca.publica.enums.PerfilEnum;
import br.com.biblioteca.publica.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    // Lista todos os usuários — útil para o painel admin no front
    public List<UsuarioResumoResponse> listarTodos() {
        return usuarioRepository.findAll().stream()
                .map(UsuarioResumoResponse::from).toList();
    }

    // Filtra por perfil — ex: GET /api/usuarios?perfil=ALUNO
    public List<UsuarioResumoResponse> listarPorPerfil(PerfilEnum perfil) {
        return usuarioRepository.findByPerfil(perfil).stream()
                .map(UsuarioResumoResponse::from).toList();
    }
}
