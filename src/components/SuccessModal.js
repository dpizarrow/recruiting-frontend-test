import { CheckCircleIcon } from "@heroicons/react/solid";

function SuccessModal({ isOpen, onClose }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-1/3 flex flex-col items-center">
        <CheckCircleIcon className="h-12 w-12 text-green-500 mb-4" />{" "}
        {/* Adjusted size and margin */}
        <h2 className="text-2xl font-bold text-center">
          Nota de crédito asignada correctamente
        </h2>
        <button
          onClick={onClose}
          className="mt-4 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
        >
          Seguir asignando
        </button>
      </div>
    </div>
  );
}

export default SuccessModal;
