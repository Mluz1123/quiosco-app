import Layout from '@/layout/Layout'
import useQuiosco from '@/hooks/useQuiosco'
// import { PrismaClient } from '@prisma/client'
export default function Home() {
  const { categoriaActual } = useQuiosco()

  return (
    <Layout pagina={`Menú ${categoriaActual.nombre}`}>
      <h1 className='text-4xl font-black'>{categoriaActual.nombre}</h1>
    </Layout>
  )
}
// export const getServerSideProps = async () => {
//   const prisma = new PrismaClient()
//   const categorias = await prisma.categoria.findMany()

//   return {
//     props: {
//       categorias
//     }
//   }
// }
