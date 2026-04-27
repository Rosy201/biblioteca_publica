package br.com.biblioteca.publica.service;

import br.com.biblioteca.publica.dto.request.LivroRequest;
import br.com.biblioteca.publica.dto.response.LivroResponse;
import br.com.biblioteca.publica.entity.Livro;
import br.com.biblioteca.publica.enums.CategoriaEnum;
import br.com.biblioteca.publica.repository.LivroRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LivroService {

    private final LivroRepository livroRepository;

    public List<LivroResponse> listarTodos() {
        return livroRepository.findAll().stream()
                .map(LivroResponse::from).toList();
    }

    public LivroResponse buscarPorId(Long id) {
        return LivroResponse.from(livroRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Livro não encontrado: " + id)));
    }

    public List<LivroResponse> buscarPorCategoria(CategoriaEnum categoria) {
        return livroRepository.findByCategoria(categoria).stream()
                .map(LivroResponse::from).toList();
    }

    public LivroResponse criar(LivroRequest request) {
        Livro livro = Livro.builder()
                .titulo(request.titulo())
                .autor(request.autor())
                .urlConteudo(request.urlConteudo())
                .categoria(request.categoria())
                .build();
        return LivroResponse.from(livroRepository.save(livro));
    }

    public LivroResponse atualizar(Long id, LivroRequest request) {
        Livro livro = livroRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Livro não encontrado: " + id));
        livro.setTitulo(request.titulo());
        livro.setAutor(request.autor());
        livro.setUrlConteudo(request.urlConteudo());
        livro.setCategoria(request.categoria());
        return LivroResponse.from(livroRepository.save(livro));
    }

    public void deletar(Long id) {
        livroRepository.deleteById(id);
    }
}
