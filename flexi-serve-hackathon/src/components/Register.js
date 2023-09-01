import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useErrorBoundary } from 'react-error-boundary'

const Register = () => {
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [country, setCountry] = useState('india')
  const [address, setAddress] = useState('')
  const [gender, setGender] = useState('male')

  const navigate = useNavigate()
  const { showBoundary } = useErrorBoundary();

  const isValidate = () => {
    let isProceed = true
    let errorMessage = 'Please enter the value in '
    if (id === null || id === '') {
      isProceed = false
      errorMessage += ' Username'
    }
    if (name === null || name === '') {
      isProceed = false
      errorMessage += ' Fullname'
    }
    if (password === null || password === '') {
      isProceed = false
      errorMessage += ' Password'
    }
    if (email === null || email === '') {
      isProceed = false
      errorMessage += ' Email'
    }

    if (!isProceed) {
      toast.warning(errorMessage)
    } else if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
      isProceed = true
    } else {
      isProceed = false
      toast.warning('Please enter the valid email')
    }

    return isProceed
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let regobj = {
      id,
      name,
      password,
      email,
      phone,
      country,
      address,
      gender,
      orders: [],
    }
    if (isValidate()) {
      fetch('http://localhost:8080/user', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(regobj),
      })
        .then((res) => {
          toast.success('Registered successfully.')
          navigate('/login')
        })
        .catch((err) => {
          toast.error('Registration failed :' + err.message)
          showBoundary(err)
        })
    }
  }
  return (
    <div>
      <div className="offset-lg-3 col-lg-6">
        <form className="container" onSubmit={handleSubmit}>
          <div className="card">
            <div className="card-header">
              <h1>User Registeration</h1>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group">
                    <label htmlFor='username'>
                      Username <span className="errmsg">*</span>
                    </label>
                    <input
                      value={id}
                      onChange={(e) => setId(e.target.value)}
                      className="form-control"
                      id='username'
                    ></input>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label htmlFor='password'>
                      Password <span className="errmsg">*</span>
                    </label>
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      className="form-control"
                      id='password'
                    ></input>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label htmlFor='fullname'>
                      Full Name <span className="errmsg">*</span>
                    </label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="form-control"
                      id='fullname'
                    ></input>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label htmlFor='email'>
                      Email <span className="errmsg">*</span>
                    </label>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-control"
                      id='email'
                    ></input>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label htmlFor='phone'>
                      Phone <span className="errmsg"></span>
                    </label>
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="form-control"
                      id='phone'
                    ></input>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label htmlFor='country'>
                      Country <span className="errmsg">*</span>
                    </label>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="form-control"
                      id='country'
                    >
                      <option value="india">India</option>
                      <option value="usa">USA</option>
                      <option value="uk">UK</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <label htmlFor='address'>Address</label>
                    <textarea
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="form-control"
                      id='address'
                    ></textarea>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>Gender</label>
                    <br></br>
                    <input
                      type="radio"
                      checked={gender === 'male'}
                      onChange={(e) => setGender(e.target.value)}
                      name="gender"
                      value="male"
                      className="app-check"
                      id='male'
                    ></input>
                    <label htmlFor='male'>Male</label>{' '}
                    <input
                      type="radio"
                      checked={gender === 'female'}
                      onChange={(e) => setGender(e.target.value)}
                      name="gender"
                      value="female"
                      className="app-check"
                      id='female'
                    ></input>
                    <label htmlFor='female'>Female</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer">
              <button type="submit" className="btn btn-primary">
                Register
              </button>{' '}
              {''}
              <Link to={'/login'} className="btn btn-danger">
                Close
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
