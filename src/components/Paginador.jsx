import React, { useEffect, useState } from 'react'

const Paginador = ({ paginas, total, setPage, page, perPage }) => {
    const [paginador, setPaginador] = useState({
        to: total == 0 ? 0 : (page == 1 ? 1 : (((page - 1) * perPage) + 1)),
        from: (page == paginas ? total : (page * perPage))
    })

    useEffect(() => {
        setPaginador({
            to: total == 0 ? 0 : (page == 1 ? 1 : (((page - 1) * perPage) + 1)),
            from: (page == paginas ? total : (page * perPage))
        })
    }, [page])


    const handlePrevious = () => {
        if (page == 1) return
        setPage(page - 1)
    }

    const handleNext = () => {
        if (page == paginas) return
        setPage(page + 1)
    }

    const handleLink = (pagina) => {
        if (pagina == page) return
        setPage(pagina)
    }
    return (
        <div className="w-10/12 flex items-center justify-around border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
                <a href="#" className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Anterior</a>
                <a href="#" className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Siguiente</a>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Mostrando
                        <span className="font-medium"> {paginador.to} </span>
                        a
                        <span className="font-medium"> {paginador.from} </span>
                        de
                        <span className="font-medium"> {total} </span>
                        resultados
                    </p>
                </div>
                <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        <button onClick={handlePrevious} className={` ${page == 1 ? 'cursor-default opacity-70' : 'cursor-pointer'} relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20`}>
                            <span className="sr-only">Anterior</span>
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                            </svg>
                        </button>
                        {(new Array(paginas)).fill(0).map((item, index) => (
                            <button onClick={() => handleLink(index + 1)} key={index} aria-current="page" className={`relative inline-flex items-center border px-4 py-2 text-sm font-medium ${page == (index + 1) ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'}`}>{index + 1}</button>
                        ))}
                        <button onClick={handleNext} className={` ${page == paginas ? 'cursor-default opacity-70' : 'cursor-pointer'} relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20`}>
                            <span className="sr-only">Siguiente</span>
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default Paginador
