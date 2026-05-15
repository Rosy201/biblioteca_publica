package br.com.biblioteca.publica.service;

import br.com.biblioteca.publica.dto.request.LivroRequest;
import br.com.biblioteca.publica.dto.response.LivroResponse;
import br.com.biblioteca.publica.entity.Api.GoogleBooks.GoogleBooksResponse;
import br.com.biblioteca.publica.entity.Escola;
import br.com.biblioteca.publica.entity.Livro;
import br.com.biblioteca.publica.enums.CategoriaEnum;
import br.com.biblioteca.publica.repository.EscolaRepository;
import br.com.biblioteca.publica.repository.LivroRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LivroService {

    private final LivroRepository livroRepository;
    private final EscolaRepository escolaRepository;
    private final GoogleBooksService googleBooksService;

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

    @Transactional
    public LivroResponse criar(LivroRequest request) {
        // Busca a escola no banco para garantir a integridade da FK
        Escola escola = escolaRepository.findById(request.escolaId())
                .orElseThrow(() -> new RuntimeException("Escola não encontrada com o ID: " + request.escolaId()));

        Livro livro = Livro.builder()
                .titulo(request.titulo())
                .autor(request.autor())
                .urlConteudo(request.urlConteudo())
                .categoria(request.categoria())
                .escola(escola)
                .build();

        return LivroResponse.from(livroRepository.save(livro));
    }

    @Transactional
    public LivroResponse atualizar(Long id, LivroRequest request) {
        Livro livro = livroRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Livro não encontrado: " + id));

        // Busca a nova escola caso tenha sido alterada
        Escola escola = escolaRepository.findById(request.escolaId())
                .orElseThrow(() -> new RuntimeException("Escola não encontrada"));

        livro.setTitulo(request.titulo());
        livro.setAutor(request.autor());
        livro.setUrlConteudo(request.urlConteudo());
        livro.setCategoria(request.categoria());
        livro.setEscola(escola); // Atualiza o vínculo com a escola
        
        return LivroResponse.from(livroRepository.save(livro));
    }

    @Transactional
    public void deletar(Long id) {
        if (!livroRepository.existsById(id)) {
            throw new RuntimeException("Livro não encontrado para exclusão.");
        }
        livroRepository.deleteById(id);
    }

    @Transactional
    public LivroResponse importarLivroPeloTitulo(String titulo) {

        GoogleBooksResponse response = googleBooksService.buscarPorTitulo(titulo);

        if (response.getItems() == null || response.getItems().isEmpty()) {
            throw new RuntimeException("Nenhum livro encontrado no Google para o título: " + titulo);
        }

        var item = response.getItems().get(0);
        var info = item.getVolumeInfo();


        Livro novoLivro = Livro.builder()
                .titulo(info.getTitle())
                .autor(info.getAuthors() != null && !info.getAuthors().isEmpty()
                        ? info.getAuthors().get(0)
                        : "Autor Desconhecido")
                .categoria(CategoriaEnum.OUTROS)
                // Usando o ID do Google para montar uma URL de visualização
                .urlConteudo("https://books.google.com.br/books?id=" + item.getId())
                .build();


        Livro livroSalvo = livroRepository.save(novoLivro);
        return LivroResponse.from(livroSalvo);
    }
}