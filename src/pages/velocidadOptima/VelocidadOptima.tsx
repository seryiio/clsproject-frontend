import { VelocidadOptimaInterface } from "@/interfaces/VelocidadOptimaInterface";
import { getVelocidadOptima } from "@/services/VelocidadOptimaServices";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const VelocidadOptima = () => {
  const [listarVelocidadesOptima, setListarVelocidadesOptima] = useState<VelocidadOptimaInterface[]>([]);

  useEffect(() => {
    getVelocidadOptima(setListarVelocidadesOptima);
  }, []);

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-auto-col gap-x-4 gap-y-8 p-2 text-white">
        {listarVelocidadesOptima.map((velocidades) => (
          <Link
            to={`${velocidades.embarcacion}`}
            className="flex justify-center items-center rounded-md bg-cyan-400/5"
          >
            {velocidades.velocidad_optima}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default VelocidadOptima;
