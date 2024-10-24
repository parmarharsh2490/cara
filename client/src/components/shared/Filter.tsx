import { IFilter } from '@/types/index';
import  { ChangeEvent, useEffect } from 'react';

const Filter = ({filters, setFilters,setProducts }: {filters : IFilter,setFilters : any,setProducts? : any}) => {
    const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        console.log(name,value);
        
        if(name == "price"){
            let price = value.split('-');
            let minPrice = price[0]
            let maxPrice = price[1]
            setFilters({
                ...filters,
                skip : 0,
                minPrice,
                maxPrice
            })
    setProducts([])

        }else{
        setFilters({
            ...filters,
            skip : 0,
            [name]: value
        });
    setProducts([])

    }
        console.log(filters);
    };

    const resetFilter = () => {
        setFilters({
            price: '',
            sleeves: '',
            color: '',
            skip  : 0
        });
    };
    useEffect(() => {
    }, [filters])
    
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
                            checked={Number(filters.minPrice) === 0 && Number(filters.maxPrice) === 499}
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
                            checked={Number(filters.minPrice) === 499 && Number(filters.maxPrice) === 999}
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
                            id="999-100000"
                            value="999-100000"
                            checked={Number(filters.minPrice) === 999 && Number(filters.maxPrice) === 100000}
                            onChange={handleChange}
                        />
                        <label htmlFor="999-100000" className="text-slate-500 ml-2 cursor-pointer">
                            999.00-above
                        </label>
                    </div>
                </div>
            </div>
            <div className="p-5 border-b-2">
                <h1 className="font-semibold text-lg text-slate-500">Gender</h1>
                <div>
                    <div className="py-1">
                        <input
                            type="radio"
                            name="gender"
                            id="male"
                            value="male"
                            checked={filters.gender === 'male'}
                            onChange={handleChange}
                        />
                        <label htmlFor="male" className="text-slate-500 ml-2 cursor-pointer">
                            Male
                        </label>
                    </div>
                    <div className="py-1">
                        <input
                            type="radio"
                            name="gender"
                            id="female"
                            value="female"
                            checked={filters.gender === 'female'}
                            onChange={handleChange}
                        />
                        <label htmlFor="female" className="text-slate-500 ml-2 cursor-pointer">
                            Female
                        </label>
                    </div>
                    <div className="py-1">
                        <input
                            type="radio"
                            name="gender"
                            id="child"
                            value="child"
                            checked={filters.gender === 'child'}
                            onChange={handleChange}
                        />
                        <label htmlFor="child" className="text-slate-500 ml-2 cursor-pointer">
                            Child
                        </label>
                    </div>
                </div>
            </div>
            <div className="p-5 border-b-2">
                <h1 className="font-semibold text-lg text-slate-500">color</h1>
                <div>
                    <div className="py-1">
                        <input
                            type="radio"
                            name="color"
                            id="blue"
                            value="blue"
                            checked={filters.color === 'blue'}
                            onChange={handleChange}
                        />
                        <label htmlFor="blue" className="text-slate-500 ml-2 cursor-pointer">
                            blue
                        </label>
                    </div>
                    <div className="py-1">
                        <input
                            type="radio"
                            name="color"
                            id="white"
                            value="white"
                            checked={filters.color === 'white'}
                            onChange={handleChange}
                        />
                        <label htmlFor="white" className="text-slate-500 ml-2 cursor-pointer">
                            white
                        </label>
                    </div>
                    <div className="py-1">
                        <input
                            type="radio"
                            name="color"
                            id="black"
                            value="black"
                            checked={filters.color === 'black'}
                            onChange={handleChange}
                        />
                        <label htmlFor="black" className="text-slate-500 ml-2 cursor-pointer">
                            black
                        </label>
                    </div>
                    <div className="py-1">
                        <input
                            type="radio"
                            name="color"
                            id="brown"
                            value="brown"
                            checked={filters.color === 'brown'}
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
