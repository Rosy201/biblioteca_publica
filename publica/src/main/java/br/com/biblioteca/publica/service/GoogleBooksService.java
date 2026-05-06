package br.com.biblioteca.publica.service;


import br.com.biblioteca.publica.entity.Api.GoogleBooks.GoogleBooksResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

@Service
public class GoogleBooksService {

    private final RestTemplate restTemplate;

    @Value("${api.key}")
    private String apiKey;

    @Value("${endpoint.books}")
    private String apiUrl;

    public GoogleBooksService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    // Busca Genérica
    public GoogleBooksResponse buscarLivroNoGoogle(String termo) {
        return chamarApi(termo);
    }

    // Busca por titulo
    public GoogleBooksResponse buscarPorTitulo(String titulo) {
        return chamarApi("intitle:" + titulo);
    }

    // Busca por autor
    public GoogleBooksResponse buscarPorAutor(String autor) {
        return chamarApi("inauthor:\"" + autor + "\"");
    }

    private GoogleBooksResponse chamarApi(String query) {
        String url = String.format("%s?q=%s&key=%s", apiUrl, query.replace(" ", "+"), apiKey);

        GoogleBooksResponse response = restTemplate.getForObject(url, GoogleBooksResponse.class);

        if (response == null || response.getItems() == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Nenhum livro encontrado.");
        }

        return response;
    }


}