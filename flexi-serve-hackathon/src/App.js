import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import AppHeader from './components/AppHeader'
import OrderHistory from './components/OrderHistory'
import './App.css'
import Recharge from './components/Recharge'
import Profile from './components/Profile'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback, LogError} from './ErrorHandler'


function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={LogError}>
    <div className="App">
      <ToastContainer theme="colored" position="top-center"></ToastContainer>
      <BrowserRouter>
        <AppHeader></AppHeader>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/recharge" element={<Recharge />}></Route>
          <Route path="/order-history" element={<OrderHistory />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
    </ErrorBoundary>
  )
}

export default App
