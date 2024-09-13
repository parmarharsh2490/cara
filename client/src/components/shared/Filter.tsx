import { IFilter } from '@/types/index';
import  { ChangeEvent, useState } from 'react';

const Filter = () => {
    const [filters, setFilters] = useState<IFilter>({
        price: '',
        sleeves: '',
        colors: '',
    });

    const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFilters({
            ...filters,
            [name]: value
        });
    };

    const resetFilter = () => {
        setFilters({
            price: '',
            sleeves: '',
            colors: '',
        });
    };

    return (
        <div className="filter hidden min-h-screen bg-white z-50 fixed top-0 sm:relative sm:z-0 md:block w-fullz duration-1000  sm:w-full max-w-[305px] border border-1">
            <div className="py-5 px-5 flex justify-between items-center border-b-2">
                <p className="text-lg">Filter</p>
                <button onClick={resetFilter} className="text-sm font-semibold text-red-500 cursor-pointer">
                    RESET
                </button>
            </div>
            <div className="sm:hidden flex fixed bottom-0 h-14 bg-white shadow-2xl border-t w-full justify-between items-center">
                <div className="sort w-1/2 flex justify-center items-center">
                    <p className="text-base font-semibold text-black">Cancel</p>
                </div>
                <div className="sort w-1/2 flex justify-center items-center">
                    <p className="text-base font-semibold text-red-500">Apply</p>
                </div>
            </div>
            <div className="p-5 border-b-2">
                <h1 className="font-semibold text-lg text-slate-500">Price</h1>
                <div>
                    <div className="py-1">
                        <input
                            type="radio"
                            name="price"
                            id="0-499"
                            value="0-499"
                            checked={filters.price === '0-499'}
                            onChange={handleChange}
                        />
                        <label htmlFor="0-499" className="text-slate-500 ml-2 cursor-pointer">
                            $0.00-$499.00
                        </label>
                    </div>
                    <div className="py-1">
                        <input
                            type="radio"
                            name="price"
                            id="499-999"
                            value="499-999"
                            checked={filters.price === '499-999'}
                            onChange={handleChange}
                        />
                        <label htmlFor="499-999" className="text-slate-500 ml-2 cursor-pointer">
                            $499.00-999.00
                        </label>
                    </div>
                    <div className="py-1">
                        <input
                            type="radio"
                            name="price"
                            id="999-5000"
                            value="999-5000"
                            checked={filters.price === '999-5000'}
                            onChange={handleChange}
                        />
                        <label htmlFor="999-5000" className="text-slate-500 ml-2 cursor-pointer">
                            999.00-above
                        </label>
                    </div>
                </div>
            </div>
            <div className="p-5 border-b-2">
                <h1 className="font-semibold text-lg text-slate-500">Sleeves</h1>
                <div>
                    <div className="py-1">
                        <input
                            type="radio"
                            name="sleeves"
                            id="full-Sleeves"
                            value="full Sleeves"
                            checked={filters.sleeves === 'full Sleeves'}
                            onChange={handleChange}
                        />
                        <label htmlFor="full-Sleeves" className="text-slate-500 ml-2 cursor-pointer">
                            Full Sleeves
                        </label>
                    </div>
                    <div className="py-1">
                        <input
                            type="radio"
                            name="sleeves"
                            id="half-Sleeves"
                            value="half Sleeves"
                            checked={filters.sleeves === 'half Sleeves'}
                            onChange={handleChange}
                        />
                        <label htmlFor="half-Sleeves" className="text-slate-500 ml-2 cursor-pointer">
                            Half Sleeves
                        </label>
                    </div>
                </div>
            </div>
            <div className="p-5 border-b-2">
                <h1 className="font-semibold text-lg text-slate-500">Colors</h1>
                <div>
                    <div className="py-1">
                        <input
                            type="radio"
                            name="colors"
                            id="blue"
                            value="blue"
                            checked={filters.colors === 'blue'}
                            onChange={handleChange}
                        />
                        <label htmlFor="blue" className="text-slate-500 ml-2 cursor-pointer">
                            blue
                        </label>
                    </div>
                    <div className="py-1">
                        <input
                            type="radio"
                            name="colors"
                            id="white"
                            value="white"
                            checked={filters.colors === 'white'}
                            onChange={handleChange}
                        />
                        <label htmlFor="white" className="text-slate-500 ml-2 cursor-pointer">
                            white
                        </label>
                    </div>
                    <div className="py-1">
                        <input
                            type="radio"
                            name="colors"
                            id="black"
                            value="black"
                            checked={filters.colors === 'black'}
                            onChange={handleChange}
                        />
                        <label htmlFor="black" className="text-slate-500 ml-2 cursor-pointer">
                            black
                        </label>
                    </div>
                    <div className="py-1">
                        <input
                            type="radio"
                            name="colors"
                            id="brown"
                            value="brown"
                            checked={filters.colors === 'brown'}
                            onChange={handleChange}
                        />
                        <label htmlFor="brown" className="text-slate-500 ml-2 cursor-pointer">
                            brown
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Filter;
