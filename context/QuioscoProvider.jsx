import { useState, useEffect, createContext } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const QuioscoContext = createContext()

const QuioscoProvider = ({ children }) => {
  const [categorias, setCategorias] = useState([])
  const [categoriaActual, setCategoriaActual] = useState({})
  const [producto, setProducto] = useState({})
  const [modal, setModal] = useState(false)
  const [pedido, setPedido] = useState([])
  const [paso, setPaso] = useState(1)

  const obtenerCategorias = async () => {
    const { data } = await axios('/api/categorias')
    setCategorias(data)
  }

  useEffect(() => {
    obtenerCategorias()
  }, [])

  useEffect(() => {
    setCategoriaActual(categorias[0])
  }, [categorias])

  const handleClickCategoria = (id) => {
    const categoria = categorias.filter((cat) => cat.id === id)
    setCategoriaActual(categoria[0])
  }

  const handleSetProducto = (producto) => {
    setProducto(producto)
  }

  const handleChangeModal = () => {
    setModal(!modal)
  }

  //Se sacan las propiedades que no se requieran y se crea una copia de producto
  const handleAgregarPedido = ({ categoriaId, imagen, ...producto }) => {
    //Condición para evitar productos diplicados y que solo actualice la cantidad
    //some() devuleve 'true' o 'false'
    if (pedido.some((productoState) => productoState.id === producto.id)) {
      //Actualizar la cantidad

      const pedidoActualizado = pedido.map((productoState) =>
        productoState.id === producto.id ? producto : productoState
      )

      setPedido(pedidoActualizado)
      toast.success('Producto Actualizado Correctamente 👌')
    } else {
      setPedido([...pedido, producto])
      toast.success('Agregando al Pedido 👍')
    }
    setModal(false)
  }

  const handleChangePaso = (paso) => {
    setPaso(paso)
  }
  return (
    <QuioscoContext.Provider
      value={{
        categorias,
        categoriaActual,
        handleClickCategoria,
        producto,
        handleSetProducto,
        modal,
        handleChangeModal,
        pedido,
        handleAgregarPedido,
        paso,
        handleChangePaso
      }}
    >
      {children}
    </QuioscoContext.Provider>
  )
}
export { QuioscoProvider }
export default QuioscoContext
