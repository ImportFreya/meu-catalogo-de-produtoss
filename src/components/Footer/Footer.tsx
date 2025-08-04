// src/components/Footer/Footer.tsx
import { CircleDollarSign, RefreshCw, Leaf } from 'lucide-react'; 

export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-12 py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">
          Conheça todas as nossas facilidades
        </h2>
        
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          
          
          <div className="flex flex-col items-center">
            <CircleDollarSign size={48} className="text-blue-400 mb-3" />
            <h3 className="font-bold text-lg mb-2">PAGUE PELO PIX</h3>
            <p className="text-gray-300 text-sm">
              Ganhe 5% OFF em pagamentos via PIX.
            </p>
          </div>

         
          <div className="flex flex-col items-center">
            <RefreshCw size={48} className="text-blue-400 mb-3" />
            <h3 className="font-bold text-lg mb-2">TROCA GRÁTIS</h3>
            <p className="text-gray-300 text-sm">
              Fique livre para trocar em até 30 dias.
            </p>
          </div>

          
          <div className="flex flex-col items-center">
            <Leaf size={48} className="text-blue-400 mb-3" />
            <h3 className="font-bold text-lg mb-2">SUSTENTABILIDADE</h3>
            <p className="text-gray-300 text-sm">
              Moda responsável, que respeita o meio ambiente.
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
};