import TopNav from './components/TopNav'
import AppRoutes from './routes/AppRoutes'

function App() {
  return (
    <>
      <TopNav />
      <div style={{ paddingTop: '65px', paddingBottom: '70px' }}>
        <AppRoutes />
      </div>
    </>
  )
}

export default App