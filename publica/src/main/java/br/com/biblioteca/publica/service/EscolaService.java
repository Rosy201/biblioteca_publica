package br.com.biblioteca.publica.service;

import br.com.biblioteca.publica.dto.request.EscolaRequest;
import br.com.biblioteca.publica.dto.response.EscolaResponse;
import br.com.biblioteca.publica.entity.Escola;
import br.com.biblioteca.publica.repository.EscolaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EscolaService {

    private final EscolaRepository escolaRepository;

    public List<EscolaResponse> listarTodas() {
        return escolaRepository.findAll().stream()
                .map(EscolaResponse::from).toList();
    }

    public EscolaResponse buscarPorId(Long id) {
        Escola escola = escolaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Escola não encontrada: " + id));
        return EscolaResponse.from(escola);
    }

    public EscolaResponse criar(EscolaRequest request) {
        if (escolaRepository.existsByCodigoINEP(request.codigoINEP())) {
            throw new RuntimeException("Código INEP já cadastrado: " + request.codigoINEP());
        }
        Escola escola = Escola.builder()
                .nome(request.nome())
                .localizacao(request.localizacao())
                .codigoINEP(request.codigoINEP())
                .build();
        return EscolaResponse.from(escolaRepository.save(escola));
    }

    public EscolaResponse atualizar(Long id, EscolaRequest request) {
        Escola escola = escolaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Escola não encontrada: " + id));
        escola.setNome(request.nome());
        escola.setLocalizacao(request.localizacao());
        escola.setCodigoINEP(request.codigoINEP());
        return EscolaResponse.from(escolaRepository.save(escola));
    }

    public void deletar(Long id) {
        if (!escolaRepository.existsById(id)) {
            throw new RuntimeException("Escola não encontrada: " + id);
        }
        escolaRepository.deleteById(id);
    }
}
