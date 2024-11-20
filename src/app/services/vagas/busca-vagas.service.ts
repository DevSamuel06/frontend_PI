import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BuscaVagasService {

  private apiUrl: string = 'https://backend-pi-node.onrender.com/vagas';

  constructor() { }

  // Simula a busca de vagas
  getVagas(tipo?: string): Observable<any[]> {
    console.log(`Fetching vagas (mocked)`); // Log para depuração

    // Dados mockados
    const vagasMock = [
      { id: 1, titulo: 'Desenvolvedor Frontend', tipo: 'front-end', localizacao: 'São Paulo - SP', descricao: 'Vaga para desenvolvedor frontend com experiência em Angular.', data_publicacao: '2024-11-01', link: 'https://www.linkedin.com/search/results/all/?keywords=vagas&origin=GLOBAL_SEARCH_HEADER&sid=SPD', requisitos: 'Experiência com Angular, HTML, CSS, e JavaScript.' },
      { id: 2, titulo: 'Desenvolvedor Backend', tipo: 'back-end', localizacao: 'Remoto', descricao: 'Vaga para desenvolvedor backend com experiência em Node.js.', data_publicacao: '2024-11-02', link: 'https://www.linkedin.com/search/results/all/?keywords=vagas&origin=GLOBAL_SEARCH_HEADER&sid=SPD', requisitos: 'Experiência com Node.js, Express, e bancos de dados relacionais.' },
      { id: 3, titulo: 'Analista de Sistemas', tipo: 'outros', localizacao: 'Rio de Janeiro - RJ', descricao: 'Vaga para analista de sistemas com experiência em processos de TI.', data_publicacao: '2024-11-03', link: 'https://www.linkedin.com/search/results/all/?keywords=vagas&origin=GLOBAL_SEARCH_HEADER&sid=SPD', requisitos: 'Experiência em análise de sistemas, documentação técnica, e levantamento de requisitos.' },
      { id: 4, titulo: 'Desenvolvedor Full Stack', tipo: 'front-end', localizacao: 'São Paulo - SP', descricao: 'Vaga para desenvolvedor full-stack com conhecimento em Angular e Node.js.', data_publicacao: '2024-11-04', link: 'https://www.linkedin.com/search/results/all/?keywords=vagas&origin=GLOBAL_SEARCH_HEADER&sid=SPD', requisitos: 'Experiência com Angular, Node.js, e desenvolvimento de APIs RESTful.' },
      { id: 5, titulo: 'DevOps Engineer', tipo: 'outros', localizacao: 'Belo Horizonte - MG', descricao: 'Vaga para engenheiro DevOps com experiência em CI/CD e automação de infraestrutura.', data_publicacao: '2024-11-05', link: 'https://www.linkedin.com/search/results/all/?keywords=vagas&origin=GLOBAL_SEARCH_HEADER&sid=SPD', requisitos: 'Experiência com Docker, Kubernetes, CI/CD e AWS.' },
      { id: 6, titulo: 'Gerente de TI', tipo: 'outros', localizacao: 'Curitiba - PR', descricao: 'Vaga para gerente de TI com experiência em gestão de equipes de desenvolvimento.', data_publicacao: '2024-11-06', link: 'https://www.linkedin.com/search/results/all/?keywords=vagas&origin=GLOBAL_SEARCH_HEADER&sid=SPD', requisitos: 'Experiência em gestão de equipes de TI, metodologias ágeis e estratégia de TI.' },
      { id: 7, titulo: 'Desenvolvedor Frontend', tipo: 'front-end', localizacao: 'Porto Alegre - RS', descricao: 'Vaga para desenvolvedor frontend com experiência em React.', data_publicacao: '2024-11-07', link: 'https://www.linkedin.com/search/results/all/?keywords=vagas&origin=GLOBAL_SEARCH_HEADER&sid=SPD', requisitos: 'Experiência com React, JavaScript, HTML e CSS.' },
      { id: 8, titulo: 'Desenvolvedor Backend', tipo: 'back-end', localizacao: 'Remoto', descricao: 'Vaga para desenvolvedor backend com experiência em Java e Spring Boot.', data_publicacao: '2024-11-08', link: 'https://www.linkedin.com/search/results/all/?keywords=vagas&origin=GLOBAL_SEARCH_HEADER&sid=SPD', requisitos: 'Experiência com Java, Spring Boot, e bancos de dados relacionais.' },
      { id: 9, titulo: 'Analista de Banco de Dados', tipo: 'outros', localizacao: 'Salvador - BA', descricao: 'Vaga para analista de banco de dados com conhecimento em SQL e MongoDB.', data_publicacao: '2024-11-09', link: 'https://www.linkedin.com/search/results/all/?keywords=vagas&origin=GLOBAL_SEARCH_HEADER&sid=SPD', requisitos: 'Experiência com SQL, MongoDB, e otimização de queries.' },
      { id: 10, titulo: 'Desenvolvedor iOS', tipo: 'front-end', localizacao: 'São Paulo - SP', descricao: 'Vaga para desenvolvedor iOS com experiência em Swift.', data_publicacao: '2024-11-10', link: 'https://www.linkedin.com/search/results/all/?keywords=vagas&origin=GLOBAL_SEARCH_HEADER&sid=SPD', requisitos: 'Experiência com Swift, UIKit e desenvolvimento de apps nativos iOS.' },
      { id: 11, titulo: 'Desenvolvedor Android', tipo: 'front-end', localizacao: 'Rio de Janeiro - RJ', descricao: 'Vaga para desenvolvedor Android com experiência em Kotlin.', data_publicacao: '2024-11-11', link: 'https://www.linkedin.com/search/results/all/?keywords=vagas&origin=GLOBAL_SEARCH_HEADER&sid=SPD', requisitos: 'Experiência com Kotlin, Android SDK, e design patterns.' },
      { id: 12, titulo: 'Designer UX/UI', tipo: 'outros', localizacao: 'Belo Horizonte - MG', descricao: 'Vaga para designer UX/UI com experiência em ferramentas como Figma e Adobe XD.', data_publicacao: '2024-11-12', link: 'https://www.linkedin.com/search/results/all/?keywords=vagas&origin=GLOBAL_SEARCH_HEADER&sid=SPD', requisitos: 'Experiência com design de interfaces, prototipagem e ferramentas como Figma.' },
      { id: 13, titulo: 'Analista de Suporte', tipo: 'outros', localizacao: 'Recife - PE', descricao: 'Vaga para analista de suporte com experiência em resolução de problemas técnicos.', data_publicacao: '2024-11-13', link: 'https://www.linkedin.com/search/results/all/?keywords=vagas&origin=GLOBAL_SEARCH_HEADER&sid=SPD', requisitos: 'Experiência com suporte técnico, atendimento ao cliente e troubleshooting.' },
      { id: 14, titulo: 'Desenvolvedor React', tipo: 'front-end', localizacao: 'Fortaleza - CE', descricao: 'Vaga para desenvolvedor React com experiência em Redux e hooks.', data_publicacao: '2024-11-14', link: 'https://www.linkedin.com/search/results/all/?keywords=vagas&origin=GLOBAL_SEARCH_HEADER&sid=SPD', requisitos: 'Experiência com React, Redux, hooks, e JavaScript.' },
      { id: 15, titulo: 'Desenvolvedor Node.js', tipo: 'back-end', localizacao: 'São Paulo - SP', descricao: 'Vaga para desenvolvedor backend com experiência em Node.js e Express.', data_publicacao: '2024-11-15', link: 'https://www.linkedin.com/search/results/all/?keywords=vagas&origin=GLOBAL_SEARCH_HEADER&sid=SPD', requisitos: 'Experiência com Node.js, Express, e desenvolvimento de APIs REST.' },
      { id: 16, titulo: 'Analista de Qualidade', tipo: 'outros', localizacao: 'Porto Alegre - RS', descricao: 'Vaga para analista de qualidade com experiência em testes manuais e automatizados.', data_publicacao: '2024-11-16', link: 'https://www.linkedin.com/search/results/all/?keywords=vagas&origin=GLOBAL_SEARCH_HEADER&sid=SPD', requisitos: 'Experiência com testes manuais, automatizados e ferramentas como Selenium.' },
      { id: 17, titulo: 'Desenvolvedor Python', tipo: 'back-end', localizacao: 'São Paulo - SP', descricao: 'Vaga para desenvolvedor Python com experiência em Django e Flask.', data_publicacao: '2024-11-17', link: 'https://www.linkedin.com/search/results/all/?keywords=vagas&origin=GLOBAL_SEARCH_HEADER&sid=SPD', requisitos: 'Experiência com Python, Django, Flask e desenvolvimento de APIs.' },
      { id: 18, titulo: 'Desenvolvedor Java', tipo: 'back-end', localizacao: 'Curitiba - PR', descricao: 'Vaga para desenvolvedor Java com experiência em Spring Framework.', data_publicacao: '2024-11-18', link: 'https://www.linkedin.com/search/results/all/?keywords=vagas&origin=GLOBAL_SEARCH_HEADER&sid=SPD', requisitos: 'Experiência com Java, Spring Framework, e bancos de dados relacionais.' },
      { id: 19, titulo: 'Arquiteto de Software', tipo: 'outros', localizacao: 'Rio de Janeiro - RJ', descricao: 'Vaga para arquiteto de software com experiência em design de sistemas e microserviços.', data_publicacao: '2024-11-19', link: 'https://www.linkedin.com/search/results/all/?keywords=vagas&origin=GLOBAL_SEARCH_HEADER&sid=SPD', requisitos: 'Experiência em design de software, microserviços e arquitetura de sistemas.' },
      { id: 20, titulo: 'Administrador de Redes', tipo: 'outros', localizacao: 'São Paulo - SP', descricao: 'Vaga para administrador de redes com experiência em configuração de servidores e redes.', data_publicacao: '2024-11-20', link: 'https://www.linkedin.com/search/results/all/?keywords=vagas&origin=GLOBAL_SEARCH_HEADER&sid=SPD', requisitos: 'Experiência com configuração de redes, servidores e troubleshooting de infraestrutura.' },
      { id: 42, titulo: 'Desenvolvedor Go', tipo: 'back-end', localizacao: 'São Paulo - SP', descricao: 'Vaga para desenvolvedor Go com experiência em aplicações de alto desempenho.', data_publicacao: '2024-11-21', link: 'https://www.linkedin.com/search/results/all/?keywords=vagas&origin=GLOBAL_SEARCH_HEADER&sid=SPD', requisitos: 'Experiência com Go, APIs RESTful, e microserviços.' },
      { id: 43, titulo: 'Desenvolvedor .NET Core', tipo: 'back-end', localizacao: 'Curitiba - PR', descricao: 'Vaga para desenvolvedor .NET Core com experiência em APIs e integração de sistemas.', data_publicacao: '2024-11-22', link: 'https://www.linkedin.com/search/results/all/?keywords=vagas&origin=GLOBAL_SEARCH_HEADER&sid=SPD', requisitos: 'Experiência com .NET Core, APIs, e integração de sistemas.' },
      { id: 44, titulo: 'Engenheiro de Software Java', tipo: 'back-end', localizacao: 'Rio de Janeiro - RJ', descricao: 'Vaga para engenheiro de software Java com experiência em desenvolvimento de sistemas corporativos.', data_publicacao: '2024-11-23', link: 'https://www.linkedin.com/search/results/all/?keywords=vagas&origin=GLOBAL_SEARCH_HEADER&sid=SPD', requisitos: 'Experiência com Java, Spring Boot, Hibernate e bancos de dados relacionais.' },
      { id: 45, titulo: 'Desenvolvedor PHP', tipo: 'back-end', localizacao: 'São Paulo - SP', descricao: 'Vaga para desenvolvedor PHP com experiência em desenvolvimento de sistemas de alto tráfego.', data_publicacao: '2024-11-24', link: 'https://www.linkedin.com/search/results/all/?keywords=vagas&origin=GLOBAL_SEARCH_HEADER&sid=SPD', requisitos: 'Experiência com PHP, Laravel, e sistemas de alto desempenho.' },
      { id: 46, titulo: 'Desenvolvedor C#', tipo: 'back-end', localizacao: 'Belo Horizonte - MG', descricao: 'Vaga para desenvolvedor C# com experiência em desenvolvimento de APIs e integração com bancos de dados.', data_publicacao: '2024-11-25', link: 'https://www.linkedin.com/search/results/all/?keywords=vagas&origin=GLOBAL_SEARCH_HEADER&sid=SPD', requisitos: 'Experiência com C#, ASP.NET, e integração de APIs com bancos de dados SQL.' },
      { id: 47, titulo: 'Desenvolvedor Frontend Vue.js', tipo: 'front-end', localizacao: 'São Paulo - SP', descricao: 'Vaga para desenvolvedor frontend com experiência em Vue.js e Vuex.', data_publicacao: '2024-11-26', link: 'https://www.linkedin.com/search/results/all/?keywords=vagas&origin=GLOBAL_SEARCH_HEADER&sid=SPD', requisitos: 'Experiência com Vue.js, Vuex, JavaScript e design responsivo.' },
      { id: 48, titulo: 'Desenvolvedor Frontend Angular', tipo: 'front-end', localizacao: 'Curitiba - PR', descricao: 'Vaga para desenvolvedor frontend com experiência em Angular e TypeScript.', data_publicacao: '2024-11-27', link: 'https://www.linkedin.com/search/results/all/?keywords=vagas&origin=GLOBAL_SEARCH_HEADER&sid=SPD', requisitos: 'Experiência com Angular, TypeScript, HTML5 e CSS3.' },
      { id: 49, titulo: 'Desenvolvedor Frontend React Native', tipo: 'front-end', localizacao: 'Recife - PE', descricao: 'Vaga para desenvolvedor frontend com experiência em React Native para desenvolvimento mobile.', data_publicacao: '2024-11-28', link: 'https://www.linkedin.com/search/results/all/?keywords=vagas&origin=GLOBAL_SEARCH_HEADER&sid=SPD', requisitos: 'Experiência com React Native, JavaScript, e desenvolvimento mobile.' },
      { id: 50, titulo: 'Desenvolvedor Frontend SASS/SCSS', tipo: 'front-end', localizacao: 'Porto Alegre - RS', descricao: 'Vaga para desenvolvedor frontend com experiência em SASS/SCSS e pré-processadores CSS.', data_publicacao: '2024-11-29', link: 'https://www.linkedin.com/search/results/all/?keywords=vagas&origin=GLOBAL_SEARCH_HEADER&sid=SPD', requisitos: 'Experiência com SASS/SCSS, pré-processadores CSS, e frameworks como Bootstrap.' },
      { id: 51, titulo: 'Desenvolvedor Frontend Ember.js', tipo: 'front-end', localizacao: 'São Paulo - SP', descricao: 'Vaga para desenvolvedor frontend com experiência em Ember.js e Ember CLI.', data_publicacao: '2024-11-30', link: 'https://www.linkedin.com/search/results/all/?keywords=vagas&origin=GLOBAL_SEARCH_HEADER&sid=SPD', requisitos: 'Experiência com Ember.js, Ember CLI, JavaScript e desenvolvimento SPA.' }
    ];

    // Filtra os dados mockados por tipo, se fornecido
    if (tipo) {
      return of(vagasMock.filter(vaga => vaga.tipo === tipo));
    } else {
      return of(vagasMock);
    }
  }

  getVagaPorId(id: string): Observable<any> {
    console.log(`Fetching vaga by ID (mocked): ${id}`); // Log para depuração

    // Dados mockados
    const vagasMock = [
      { id: 1, titulo: 'Desenvolvedor Frontend', tipo: 'front-end', localizacao: 'São Paulo - SP', descricao: 'Vaga para desenvolvedor frontend com experiência em Angular.', data_publicacao: '2024-11-01', link: 'https://www.linkedin.com/search/results/all/?keywords=vagas&origin=GLOBAL_SEARCH_HEADER&sid=SPD', requisitos: 'Experiência com Angular, HTML, CSS, e JavaScript.' },
      { id: 2, titulo: 'Desenvolvedor Backend', tipo: 'back-end', localizacao: 'Remoto', descricao: 'Vaga para desenvolvedor backend com experiência em Node.js.', data_publicacao: '2024-11-02', link: 'https://www.linkedin.com/search/results/all/?keywords=vagas&origin=GLOBAL_SEARCH_HEADER&sid=SPD', requisitos: 'Experiência com Node.js, Express, e bancos de dados relacionais.' },
      { id: 3, titulo: 'Analista de Sistemas', tipo: 'outros', localizacao: 'Rio de Janeiro - RJ', descricao: 'Vaga para analista de sistemas com experiência em processos de TI.', data_publicacao: '2024-11-03', link: 'https://www.linkedin.com/search/results/all/?keywords=vagas&origin=GLOBAL_SEARCH_HEADER&sid=SPD', requisitos: 'Experiência em análise de sistemas, documentação técnica, e levantamento de requisitos.' },
      { id: 4, titulo: 'Desenvolvedor Full Stack', tipo: 'front-end', localizacao: 'São Paulo - SP', descricao: 'Vaga para desenvolvedor full-stack com conhecimento em Angular e Node.js.', data_publicacao: '2024-11-04', link: 'https://www.linkedin.com/search/results/all/?keywords=vagas&origin=GLOBAL_SEARCH_HEADER&sid=SPD', requisitos: 'Experiência com Angular, Node.js, e desenvolvimento de APIs RESTful.' },
      { id: 5, titulo: 'DevOps Engineer', tipo: 'outros', localizacao: 'Belo Horizonte - MG', descricao: 'Vaga para engenheiro DevOps com experiência em CI/CD e automação de infraestrutura.', data_publicacao: '2024-11-05', link: 'https://www.linkedin.com/search/results/all/?keywords=vagas&origin=GLOBAL_SEARCH_HEADER&sid=SPD', requisitos: 'Experiência com Docker, Kubernetes, CI/CD e AWS.' },
      { id: 6, titulo: 'Gerente de TI', tipo: 'outros', localizacao: 'Curitiba - PR', descricao: 'Vaga para gerente de TI com experiência em gestão de equipes de desenvolvimento.', data_publicacao: '2024-11-06', link: 'https://www.linkedin.com/search/results/all/?keywords=vagas&origin=GLOBAL_SEARCH_HEADER&sid=SPD', requisitos: 'Experiência em gestão de equipes de TI, metodologias ágeis e estratégia de TI.' },
      { id: 7, titulo: 'Desenvolvedor Frontend', tipo: 'front-end', localizacao: 'Porto Alegre - RS', descricao: 'Vaga para desenvolvedor frontend com experiência em React.', data_publicacao: '2024-11-07', link: 'https://www.linkedin.com/search/results/all/?keywords=vagas&origin=GLOBAL_SEARCH_HEADER&sid=SPD', requisitos: 'Experiência com React, JavaScript, HTML e CSS.' },
      { id: 8, titulo: 'Desenvolvedor Backend', tipo: 'back-end', localizacao: 'Remoto', descricao: 'Vaga para desenvolvedor backend com experiência em Java e Spring Boot.', data_publicacao: '2024-11-08', link: 'https://www.linkedin.com/search/results/all/?keywords=vagas&origin=GLOBAL_SEARCH_HEADER&sid=SPD', requisitos: 'Experiência com Java, Spring Boot, e bancos de dados relacionais.' },
      { id: 9, titulo: 'Analista de Banco de Dados', tipo: 'outros', localizacao: 'Salvador - BA', descricao: 'Vaga para analista de banco de dados com conhecimento em SQL e MongoDB.', data_publicacao: '2024-11-09', link: 'https://www.linkedin.com/search/results/all/?keywords=vagas&origin=GLOBAL_SEARCH_HEADER&sid=SPD', requisitos: 'Experiência com SQL, MongoDB, e otimização de queries.' },
      { id: 10, titulo: 'Desenvolvedor iOS', tipo: 'front-end', localizacao: 'São Paulo - SP', descricao: 'Vaga para desenvolvedor iOS com experiência em Swift.', data_publicacao: '2024-11-10', link: 'https://www.linkedin.com/search/results/all/?keywords=vagas&origin=GLOBAL_SEARCH_HEADER&sid=SPD', requisitos: 'Experiência com Swift, UIKit e desenvolvimento de apps nativos iOS.' },
      { id: 11, titulo: 'Desenvolvedor Android', tipo: 'front-end', localizacao: 'Rio de Janeiro - RJ', descricao: 'Vaga para desenvolvedor Android com experiência em Kotlin.', data_publicacao: '2024-11-11', link: 'https://www.linkedin.com/search/results/all/?keywords=vagas&origin=GLOBAL_SEARCH_HEADER&sid=SPD', requisitos: 'Experiência com Kotlin, Android SDK, e design patterns.' },
      { id: 12, titulo: 'Designer UX/UI', tipo: 'outros', localizacao: 'Belo Horizonte - MG', descricao: 'Vaga para designer UX/UI com experiência em ferramentas como Figma e Adobe XD.', data_publicacao: '2024-11-12', link: 'https://www.linkedin.com/search/results/all/?keywords=vagas&origin=GLOBAL_SEARCH_HEADER&sid=SPD', requisitos: 'Experiência com design de interfaces, prototipagem e ferramentas como Figma.' },
      { id: 13, titulo: 'Analista de Suporte', tipo: 'outros', localizacao: 'Recife - PE', descricao: 'Vaga para analista de suporte com experiência em resolução de problemas técnicos.', data_publicacao: '2024-11-13', link: 'https://www.linkedin.com/search/results/all/?keywords=vagas&origin=GLOBAL_SEARCH_HEADER&sid=SPD', requisitos: 'Experiência com suporte técnico, atendimento ao cliente e troubleshooting.' },
      { id: 14, titulo: 'Desenvolvedor React', tipo: 'front-end', localizacao: 'Fortaleza - CE', descricao: 'Vaga para desenvolvedor React com experiência em Redux e hooks.', data_publicacao: '2024-11-14', link: 'https://www.linkedin.com/search/results/all/?keywords=vagas&origin=GLOBAL_SEARCH_HEADER&sid=SPD', requisitos: 'Experiência com React, Redux, hooks, e JavaScript.' },
      { id: 15, titulo: 'Desenvolvedor Node.js', tipo: 'back-end', localizacao: 'São Paulo - SP', descricao: 'Vaga para desenvolvedor backend com experiência em Node.js e Express.', data_publicacao: '2024-11-15', link: 'https://www.linkedin.com/search/results/all/?keywords=vagas&origin=GLOBAL_SEARCH_HEADER&sid=SPD', requisitos: 'Experiência com Node.js, Express, e desenvolvimento de APIs REST.' },
      { id: 16, titulo: 'Analista de Qualidade', tipo: 'outros', localizacao: 'Porto Alegre - RS', descricao: 'Vaga para analista de qualidade com experiência em testes manuais e automatizados.', data_publicacao: '2024-11-16', link: 'https://www.linkedin.com/search/results/all/?keywords=vagas&origin=GLOBAL_SEARCH_HEADER&sid=SPD', requisitos: 'Experiência com testes manuais, automatizados e ferramentas como Selenium.' },
      { id: 17, titulo: 'Desenvolvedor Python', tipo: 'back-end', localizacao: 'São Paulo - SP', descricao: 'Vaga para desenvolvedor Python com experiência em Django e Flask.', data_publicacao: '2024-11-17', link: 'https://www.linkedin.com/search/results/all/?keywords=vagas&origin=GLOBAL_SEARCH_HEADER&sid=SPD', requisitos: 'Experiência com Python, Django, Flask e desenvolvimento de APIs.' },
      { id: 18, titulo: 'Desenvolvedor Java', tipo: 'back-end', localizacao: 'Curitiba - PR', descricao: 'Vaga para desenvolvedor Java com experiência em Spring Framework.', data_publicacao: '2024-11-18', link: 'https://www.linkedin.com/search/results/all/?keywords=vagas&origin=GLOBAL_SEARCH_HEADER&sid=SPD', requisitos: 'Experiência com Java, Spring Framework, e bancos de dados relacionais.' },
      { id: 19, titulo: 'Arquiteto de Software', tipo: 'outros', localizacao: 'Rio de Janeiro - RJ', descricao: 'Vaga para arquiteto de software com experiência em design de sistemas e microserviços.', data_publicacao: '2024-11-19', link: 'https://www.linkedin.com/search/results/all/?keywords=vagas&origin=GLOBAL_SEARCH_HEADER&sid=SPD', requisitos: 'Experiência em design de software, microserviços e arquitetura de sistemas.' },
      { id: 20, titulo: 'Administrador de Redes', tipo: 'outros', localizacao: 'São Paulo - SP', descricao: 'Vaga para administrador de redes com experiência em configuração de servidores e redes.', data_publicacao: '2024-11-20', link: 'https://www.linkedin.com/search/results/all/?keywords=vagas&origin=GLOBAL_SEARCH_HEADER&sid=SPD', requisitos: 'Experiência com configuração de redes, servidores e troubleshooting de infraestrutura.' },
      { id: 42, titulo: 'Desenvolvedor Go', tipo: 'back-end', localizacao: 'São Paulo - SP', descricao: 'Vaga para desenvolvedor Go com experiência em aplicações de alto desempenho.', data_publicacao: '2024-11-21', link: 'https://www.linkedin.com/search/results/all/?keywords=vagas&origin=GLOBAL_SEARCH_HEADER&sid=SPD', requisitos: 'Experiência com Go, APIs RESTful, e microserviços.' },
      { id: 43, titulo: 'Desenvolvedor .NET Core', tipo: 'back-end', localizacao: 'Curitiba - PR', descricao: 'Vaga para desenvolvedor .NET Core com experiência em APIs e integração de sistemas.', data_publicacao: '2024-11-22', link: 'https://www.linkedin.com/search/results/all/?keywords=vagas&origin=GLOBAL_SEARCH_HEADER&sid=SPD', requisitos: 'Experiência com .NET Core, APIs, e integração de sistemas.' },
      { id: 44, titulo: 'Engenheiro de Software Java', tipo: 'back-end', localizacao: 'Rio de Janeiro - RJ', descricao: 'Vaga para engenheiro de software Java com experiência em desenvolvimento de sistemas corporativos.', data_publicacao: '2024-11-23', link: 'https://www.linkedin.com/search/results/all/?keywords=vagas&origin=GLOBAL_SEARCH_HEADER&sid=SPD', requisitos: 'Experiência com Java, Spring Boot, Hibernate e bancos de dados relacionais.' },
      { id: 45, titulo: 'Desenvolvedor PHP', tipo: 'back-end', localizacao: 'São Paulo - SP', descricao: 'Vaga para desenvolvedor PHP com experiência em desenvolvimento de sistemas de alto tráfego.', data_publicacao: '2024-11-24', link: 'https://www.linkedin.com/search/results/all/?keywords=vagas&origin=GLOBAL_SEARCH_HEADER&sid=SPD', requisitos: 'Experiência com PHP, Laravel, e sistemas de alto desempenho.' },
      { id: 46, titulo: 'Desenvolvedor C#', tipo: 'back-end', localizacao: 'Belo Horizonte - MG', descricao: 'Vaga para desenvolvedor C# com experiência em desenvolvimento de APIs e integração com bancos de dados.', data_publicacao: '2024-11-25', link: 'https://www.linkedin.com/search/results/all/?keywords=vagas&origin=GLOBAL_SEARCH_HEADER&sid=SPD', requisitos: 'Experiência com C#, ASP.NET, e integração de APIs com bancos de dados SQL.' },
      { id: 47, titulo: 'Desenvolvedor Frontend Vue.js', tipo: 'front-end', localizacao: 'São Paulo - SP', descricao: 'Vaga para desenvolvedor frontend com experiência em Vue.js e Vuex.', data_publicacao: '2024-11-26', link: 'https://www.linkedin.com/search/results/all/?keywords=vagas&origin=GLOBAL_SEARCH_HEADER&sid=SPD', requisitos: 'Experiência com Vue.js, Vuex, JavaScript e design responsivo.' },
      { id: 48, titulo: 'Desenvolvedor Frontend Angular', tipo: 'front-end', localizacao: 'Curitiba - PR', descricao: 'Vaga para desenvolvedor frontend com experiência em Angular e TypeScript.', data_publicacao: '2024-11-27', link: 'https://www.linkedin.com/search/results/all/?keywords=vagas&origin=GLOBAL_SEARCH_HEADER&sid=SPD', requisitos: 'Experiência com Angular, TypeScript, HTML5 e CSS3.' },
      { id: 49, titulo: 'Desenvolvedor Frontend React Native', tipo: 'front-end', localizacao: 'Recife - PE', descricao: 'Vaga para desenvolvedor frontend com experiência em React Native para desenvolvimento mobile.', data_publicacao: '2024-11-28', link: 'https://www.linkedin.com/search/results/all/?keywords=vagas&origin=GLOBAL_SEARCH_HEADER&sid=SPD', requisitos: 'Experiência com React Native, JavaScript, e desenvolvimento mobile.' },
      { id: 50, titulo: 'Desenvolvedor Frontend SASS/SCSS', tipo: 'front-end', localizacao: 'Porto Alegre - RS', descricao: 'Vaga para desenvolvedor frontend com experiência em SASS/SCSS e pré-processadores CSS.', data_publicacao: '2024-11-29', link: 'https://www.linkedin.com/search/results/all/?keywords=vagas&origin=GLOBAL_SEARCH_HEADER&sid=SPD', requisitos: 'Experiência com SASS/SCSS, pré-processadores CSS, e frameworks como Bootstrap.' },
      { id: 51, titulo: 'Desenvolvedor Frontend Ember.js', tipo: 'front-end', localizacao: 'São Paulo - SP', descricao: 'Vaga para desenvolvedor frontend com experiência em Ember.js e Ember CLI.', data_publicacao: '2024-11-30', link: 'https://www.linkedin.com/search/results/all/?keywords=vagas&origin=GLOBAL_SEARCH_HEADER&sid=SPD', requisitos: 'Experiência com Ember.js, Ember CLI, JavaScript e desenvolvimento SPA.' }
    ];

    // Busca a vaga pelo ID na lista mockada
    const vaga = vagasMock.find(v => v.id === parseInt(id, 10)); // Converte id para número, caso necessário

    if (vaga) {
      return of(vaga); // Retorna a vaga encontrada como um Observable
    } else {
      console.error('Vaga não encontrada!');
      return of(null); // Caso a vaga não seja encontrada, retorna null
    }
  }
}