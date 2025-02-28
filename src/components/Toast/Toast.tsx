import { FaTimes } from 'react-icons/fa';
import HistoryCard from 'history/HistoryCard';
import { ToastProps } from './interface';

const Toast = ({ lastPokemonSelected, onCloseToast }: ToastProps) => {
  return (
    <div className='fixed bottom-4 right-4 animate-fade-in-up'>
      <div className='relative bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4'>
        <button
          onClick={onCloseToast}
          className='absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 shadow-md transition-colors duration-200'
          aria-label='Cerrar'
        >
          <FaTimes className='w-4 h-4' />
        </button>
        <HistoryCard pokemon={lastPokemonSelected} />
      </div>
    </div>
  );
};
export default Toast;
