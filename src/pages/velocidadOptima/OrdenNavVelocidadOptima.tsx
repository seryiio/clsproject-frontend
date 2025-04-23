import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IEmbarcacionesFaena } from "@/interfaces/IEmbarcacionesFaena";
import { OrdenNavegacion } from "@/interfaces/OrdenNavegacion";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getEmbarcacionesEnFaena } from "@/services/EmbarcacionesEnFaenaServices";
import {
  getOrdenNavegacionOptima,
  URL_ORDEN_NAVEGACION,
} from "@/services/OrdenNavegacionServices";
import {
  getVelocidadPorEmbarcacion,
} from "@/services/VelocidadOptimaServices";
import { Label } from "@radix-ui/react-label";
import axios from "axios";
import { AlertCircle, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { Form } from "react-router-dom";

const usuario = import.meta.env.VITE_USUARIO

const OrdenNavVelocidadOptima = () => {
  const [listarEmbarcacionesFaena, setEmbarcacionesFaena] = useState<IEmbarcacionesFaena[]>([]);
  const [ordenNavegacionOptima, setOrdenNavegacionOptima] = useState<OrdenNavegacion[]>([]);

  const [selectedEmbarcacion, setSelectedEmbarcacion] = useState<string>("");
  const [embarcacionSeleccionada, setEmbarcacionSeleccionada] = useState("");
  const [velocidadOptima, setVelocidadOptima] = useState<number>(0);

  const [id, setId] = useState<number | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [velocidadOptimaEmbarcacionSeleccionada, setVelocidadOptimaEmbarcacionSeleccionada] = useState(0);
  const [usuarioMaquina, setUsuarioMaquina] = useState<string>(usuario);

  const [showAlert, setShowAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState<number | undefined>(undefined);

  useEffect(() => {
    getEmbarcacionesEnFaena(setEmbarcacionesFaena);
    getOrdenNavegacionOptima(setOrdenNavegacionOptima);
  }, []);

  useEffect(() => {
    if (selectedEmbarcacion && usuarioMaquina) {
      const fetchVelocidad = async () => {
        try {
          const velocidadData = await getVelocidadPorEmbarcacion(selectedEmbarcacion);
          setVelocidadOptima(velocidadData);
          setEmbarcacionSeleccionada(selectedEmbarcacion);
          setVelocidadOptimaEmbarcacionSeleccionada(velocidadData);
        } catch (error) {
          console.error("Error al obtener la velocidad óptima:", error);
        }
      };
      fetchVelocidad();
    }
  }, [selectedEmbarcacion]);

  const validate = async () => {
    if (selectedEmbarcacion.trim() === "" || velocidadOptimaEmbarcacionSeleccionada === 0) {
      setErrorAlert(true);
      setTimeout(() => setErrorAlert(false), 3000);
      return;
    }

    setIsSubmitting(true);

    let parameters: OrdenNavegacion = {
      fecha_hora: new Date().toLocaleString('es-ES', { hour12: false }),
      embarcacion: embarcacionSeleccionada.trim(),
      velocidad_optima: velocidadOptimaEmbarcacionSeleccionada,
      usuario: usuarioMaquina,
    };

    await sendRequest("POST", parameters);
    setIsSubmitting(false);
  };

  const sendRequest = async (method: string, parameters: OrdenNavegacion) => {
    try {
      await axios({
        method: method,
        url: URL_ORDEN_NAVEGACION,
        data: parameters,
      });

      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    } catch (error) {
      alert("Hubo un error");
    }
    getOrdenNavegacionOptima(setOrdenNavegacionOptima);
  };

  const deleteOrden = async (id: number | undefined) => {
    if (usuarioMaquina) {
      setId(id);
      await axios({ method: 'DELETE', url: URL_ORDEN_NAVEGACION + `/${id}`, data: id });
      setDeleteAlert(true);
      setTimeout(() => setDeleteAlert(false), 3000);
      getOrdenNavegacionOptima(setOrdenNavegacionOptima);

    }
  };

  return (
    <div className="flex flex-col w-full p-4 mx-4 rounded-xl bg-white gap-8">
      <h1 className="text-2xl font-bold mb-4">Registrar Velocidad Óptima</h1>

      <div className="justify-start flex flex-wrap items-end w-full gap-8">
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
            {listarEmbarcacionesFaena.map((e, index) => (
              <option key={e.EMBARCACION} value={e.EMBARCACION}>
                {index + 1}. {e.EMBARCACION}
              </option>
            ))}
          </select>
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
          type="button"
          className="text-white bg-green-500"
          onClick={validate}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Registrando..." : "Registrar"}
        </Button>

      </div>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="px-4 py-2 border">#</th>
            <th className="px-4 py-2 border">Embarcación</th>
            <th className="px-4 py-2 border">Velocidad Óptima</th>
            <th className="px-4 py-2 border">Fecha y Hora</th>
            <th className="px-4 py-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {[...ordenNavegacionOptima]
            .sort((a, b) => {
              const idA = a.id ?? 0;
              const idB = b.id ?? 0;
              return idB - idA;
            })
            .map((registro, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{index + 1}</td>
                <td className="px-4 py-2 border">{registro.embarcacion}</td>
                <td className="px-4 py-2 border">{registro.velocidad_optima}</td>
                <td className="px-4 py-2 border">{registro.fecha_hora}</td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => {
                      setIdToDelete(registro.id);
                      setShowConfirmModal(true);
                    }}
                  >
                    <span className="flex justify-center items-center p-1 bg-red-500 rounded-2xl">
                      <Trash color="white" />
                    </span>
                  </button>
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
            Se ha registrado correctamente la velocidad óptima a la embarcación seleccionada.
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


      {deleteAlert && (
        <Alert className="text-red-500 bg-red-100">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>ELIMINADO</AlertTitle>
          <AlertDescription className="text-red-500">
            Se eliminó correctamente el registro.
          </AlertDescription>
        </Alert>
      )}

      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4">
              ¿Estás seguro de eliminar este registro?
            </h2>
            <div className="flex justify-end gap-4">
              <Button
                className="bg-gray-300 text-black hover:bg-gray-400"
                onClick={() => setShowConfirmModal(false)}
              >
                No
              </Button>
              <Button
                className="bg-red-500 text-white hover:bg-red-600"
                onClick={async () => {
                  await deleteOrden(idToDelete);
                  setShowConfirmModal(false);
                }}
              >
                Sí
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdenNavVelocidadOptima;
