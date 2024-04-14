import { Suspense, lazy } from 'react'
import { BrowserRouter } from 'react-router-dom'
import PageLoader from '@/components/PageLoader'
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'


const DefaultLayout = lazy(() => import('@/shared/Layouts/DefaultLayout'))

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-[#ffdcdc1a]">
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <DefaultLayout />
          </Suspense>
        </BrowserRouter>
      </div>
    </QueryClientProvider>

  )
}
export default App
