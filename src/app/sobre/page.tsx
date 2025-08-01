
import React from 'react';

function SobreNosPage() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Sobre a Connect Store
      </h1>
      
      <div className="space-y-4 text-gray-600">
        <p>
          Bem-vindo à Connect Store! Nascemos da paixão por tecnologia e da vontade de conectar pessoas aos produtos que elas amam, de forma simples, rápida e segura. Nossa missão é oferecer uma seleção curada dos melhores produtos do mercado, desde eletrônicos de ponta até joias e vestuário que definem tendências.
        </p>
        <p>
          Este projeto foi desenvolvido como um desafio técnico para demonstrar habilidades em desenvolvimento Full-Stack com as tecnologias mais modernas do mercado, incluindo Next.js, React, Tailwind CSS e TypeScript. Cada linha de código foi escrita com o objetivo de criar uma experiência de usuário limpa, eficiente e agradável.
        </p>
        
        <h2 className="text-2xl font-bold text-gray-800 pt-4 mt-6 border-t">
          Nossos Valores
        </h2>
        
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>Qualidade e Curadoria:</strong> Selecionamos apenas produtos que atendem a um alto padrão de qualidade.
          </li>
          <li>
            <strong>Foco no Cliente:</strong> Nosso sucesso é medido pela satisfação dos nossos clientes. O carrinho de compras, os filtros e a navegação foram pensados para você.
          </li>
          <li>
            <strong>Inovação:</strong> Estamos sempre aprendendo e aplicando as melhores práticas e tecnologias para melhorar nossa plataforma.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SobreNosPage;