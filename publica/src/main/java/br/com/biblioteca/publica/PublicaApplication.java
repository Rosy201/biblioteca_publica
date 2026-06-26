package br.com.biblioteca.publica;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching; // <-- IMPORTANTE

@EnableCaching // <-- HABILITA O CACHE GLOBALMENTE
@SpringBootApplication
public class PublicaApplication {

	public static void main(String[] args) {
		SpringApplication.run(PublicaApplication.class, args);
	}
}