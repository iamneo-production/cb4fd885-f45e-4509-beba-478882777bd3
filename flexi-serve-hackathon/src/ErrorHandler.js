import { ToastContainer } from 'react-toastify'
import AppHeader from './components/AppHeader'
import { BrowserRouter } from 'react-router-dom'

export const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div className="App">
    <ToastContainer theme="colored" position="top-center"></ToastContainer>
    <BrowserRouter>
      <AppHeader></AppHeader>
      <div className="container">
      <div className="card">
        <div className="card-header">
        <center><h3>Something went wrong:</h3></center>
        </div>
        <div className="card-body">
          <center>
        <div role="alert">
          <pre>{error.message}</pre>
          <button onClick={resetErrorBoundary}>Try again</button>
        </div>
        </center>
        </div>
      </div>
    </div>
    </BrowserRouter>
    </div>
  )
}

export const LogError = (error) => {
  console.log(error.message)
};