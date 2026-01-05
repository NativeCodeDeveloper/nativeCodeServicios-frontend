import Image from "next/image";

export default function MediaCardImage({ imagenProducto, tituloProducto, valorProducto }) {
  return (
    <div className="relative w-[180px] h-[180px]  md:w-[250px] overflow-hidden ">
      <img
        src={imagenProducto}
        alt={tituloProducto}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
      />
    </div>
  );
}