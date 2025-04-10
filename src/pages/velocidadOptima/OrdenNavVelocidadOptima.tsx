import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CodigoOperacion } from "@/interfaces/CodigoOperacion";
import { OrdenNavegacion } from "@/interfaces/OrdenNavegacion";
import { VelocidadOptimaInterface } from "@/interfaces/VelocidadOptimaInterface";
import {
  getCodigoOperacion,
  getCodigoOperacionporEmbarcacion,
} from "@/services/CodigoOperacionServices";
import {
  getOrdenNavegacionOptima,
  URL_ORDEN_NAVEGACION,
} from "@/services/OrdenNavegacionServices";
import {
  getVelocidadOptima,
  getVelocidadPorEmbarcacion,
} from "@/services/VelocidadOptimaServices";
import { Label } from "@radix-ui/react-label";
import axios from "axios";
import { AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Form } from "react-router-dom";

const OrdenNavVelocidadOptima = () => {
  const [listarEmbarcaciones, setEmbarcaciones] = useState<
    VelocidadOptimaInterface[]
  >([]);
  const [listarCodigoOperacion, setCodigoOperacion] = useState<
    CodigoOperacion[]
  >([]);
  const [ordenNavegacionOptima, setOrdenNavegacionOptima] = useState<
    OrdenNavegacion[]
  >([]);

  const [selectedEmbarcacion, setSelectedEmbarcacion] = useState<string>("");
  const [codigoOperacion, setCodigoOperacionInput] = useState<string>("");
  const [velocidadOptima, setVelocidadOptima] = useState<number>(0);

  const [usuario, setUsuario] = useState("");
  const [fechaHora, setFechaHora] = useState(new Date());
  const [embarcacionSeleccionada, setEmbarcacionSeleccionada] = useState("");
  const [
    codigoOperacionEmbarcacionSeleccionada,
    setCodigoOperacionEmbarcacionSeleccionada,
  ] = useState("");
  const [
    velocidadOptimaEmbarcacionSeleccionada,
    setVelocidadOptimaEmbarcacionSeleccionada,
  ] = useState(0);

  console.log(listarCodigoOperacion,setUsuario,setFechaHora,fechaHora)
  const [showAlert, setShowAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);

  useEffect(() => {
    getVelocidadOptima(setEmbarcaciones);
    getCodigoOperacion(setCodigoOperacion);
    getOrdenNavegacionOptima(setOrdenNavegacionOptima);
  }, []);

  useEffect(() => {
    if (selectedEmbarcacion) {
      const fetchVelocidad = async () => {
        try {
          const velocidadData = await getVelocidadPorEmbarcacion(
            selectedEmbarcacion
          );
          setVelocidadOptima(velocidadData);
          setEmbarcacionSeleccionada(selectedEmbarcacion);
          setVelocidadOptimaEmbarcacionSeleccionada(velocidadData);
        } catch (error) {
          console.error("Error al obtener la velocidad óptima:", error);
        }
      };
      fetchVelocidad();

      const fetchCodigoOperacion = async () => {
        try {
          const codOperacionData = await getCodigoOperacionporEmbarcacion(
            selectedEmbarcacion
          );
          setCodigoOperacionInput(codOperacionData);
          setCodigoOperacionEmbarcacionSeleccionada(codOperacionData);
        } catch (error) {
          console.error("Error al obtener el código de operación:", error);
        }
      };
      fetchCodigoOperacion();
    }
  }, [selectedEmbarcacion]);

  const validate = async () => {
    if (selectedEmbarcacion.trim() === "") {
      setErrorAlert(true);
      setTimeout(() => setErrorAlert(false), 3000);
      return;
    }

    let parameters: OrdenNavegacion = {
      usuario: usuario.trim(),
      fecha_hora: new Date(),
      embarcacion: embarcacionSeleccionada.trim(),
      codigo_operacion: codigoOperacionEmbarcacionSeleccionada.trim(),
      velocidad_optima: velocidadOptimaEmbarcacionSeleccionada,
    };

    await sendRequest("POST", parameters);
  };

  const sendRequest = async (method: string, parameters: OrdenNavegacion) => {
    try {
      await axios({
        method: method,
        url: URL_ORDEN_NAVEGACION,
        data: parameters,
      });

      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    } catch (error) {
      alert("Hubo un error");
    }
    getOrdenNavegacionOptima(setOrdenNavegacionOptima);
  };

  return (
    <div className="flex flex-col w-full p-4 mx-4 rounded-xl bg-white gap-8">
      <h1 className="text-2xl font-bold mb-4">Registrar Velocidad Óptima</h1>

      <Form
        action="/ordenNavegacionVelocidadOptima"
        method="post"
        className="justify-start flex flex-wrap items-end w-full gap-8"
      >
        <div>
          <Label>Embarcación</Label>
          <select
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setSelectedEmbarcacion(e.target.value)
            }
            value={selectedEmbarcacion}
            className="w-full border rounded p-2"
          >
            <option value="">Seleccionar</option>
            {listarEmbarcaciones.map((e) => (
              <option key={e.embarcacion} value={e.embarcacion}>
                {e.embarcacion}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="codigo">Código de Operación</Label>
          <Input
            id="codigo"
            type="text"
            placeholder="Código de operación"
            value={codigoOperacion}
            onChange={(e) => setCodigoOperacionInput(e.target.value)}
            disabled
          />
        </div>
        <div>
          <Label htmlFor="velocidad">Velocidad Óptima</Label>
          <Input
            id="velocidad"
            type="number"
            placeholder="Velocidad óptima"
            value={velocidadOptima}
            onChange={(e) => setVelocidadOptima(Number(e.target.value))}
            disabled
          />
        </div>

        <Button
          type="submit"
          className="text-white bg-green-500"
          onClick={(e) => {
            e.preventDefault();
            validate();
          }}
        >
          Registrar
        </Button>
      </Form>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="px-4 py-2 border">#</th>
            <th className="px-4 py-2 border">Embarcación</th>
            <th className="px-4 py-2 border">Código Operación</th>
            <th className="px-4 py-2 border">Velocidad Óptima</th>
            <th className="px-4 py-2 border">Usuario</th>
            <th className="px-4 py-2 border">Fecha y Hora</th>
          </tr>
        </thead>
        <tbody>
          {ordenNavegacionOptima.map((registro, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-4 py-2 border">{index + 1}</td>
              <td className="px-4 py-2 border">{registro.embarcacion}</td>
              <td className="px-4 py-2 border">{registro.codigo_operacion}</td>
              <td className="px-4 py-2 border">{registro.velocidad_optima}</td>
              <td className="px-4 py-2 border">{registro.usuario}</td>
              <td className="px-4 py-2 border">
                {new Date(registro.fecha_hora).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showAlert && (
        <Alert className="text-green-500 bg-green-100">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>REGISTRADOS</AlertTitle>
          <AlertDescription className="text-green-500">
            Se ha registrado correctamente la velocidad óptima a la embarcación
            seleccionada.
          </AlertDescription>
        </Alert>
      )}

      {errorAlert && (
        <Alert className="text-red-500 bg-red-100">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>ERROR</AlertTitle>
          <AlertDescription className="text-red-500">
            Favor seleccionar una embarcación antes de registrar.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default OrdenNavVelocidadOptima;
