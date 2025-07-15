import { useState } from 'react'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    costGuess: '',
    spidrPin: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const formatPin = (value) => {
    const digits = value.replace(/\D/g, '')
    const formatted = digits.replace(/(\d{4})(?=\d)/g, '$1-')
    return formatted.slice(0, 19)
  }

  const validatePin = (value) => {
    const digits = value.replace(/\D/g, '')
    return digits.length === 16
  }

  const handlePinChange = (e) => {
    const formattedValue = formatPin(e.target.value)
    setFormData(prev => ({
      ...prev,
      spidrPin: formattedValue
    }))
  }

  const formatPhoneNumber = (value) => {
    const digits = value.replace(/\D/g, '')
    if (digits.length <= 3) {
      return digits
    } else if (digits.length <= 6) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
    } else {
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`
    }
  }

  const handlePhoneChange = (e) => {
    const formattedValue = formatPhoneNumber(e.target.value)
    setFormData(prev => ({
      ...prev,
      phoneNumber: formattedValue
    }))
  }

  const handleCostChange = (e) => {
    let value = e.target.value.replace(/[^\d.]/g, '');
    const parts = value.split('.');
    if (parts.length > 2) {
      value = parts[0] + '.' + parts.slice(1).join('');
    }
    if (parts[1] && parts[1].length > 2) {
      value = parts[0] + '.' + parts[1].slice(0, 2);
    }
    setFormData(prev => ({
      ...prev,
      costGuess: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validatePin(formData.spidrPin)) {
      alert('Please enter exactly 16 digits for the PIN')
      return
    }
    
    console.log('Form Data:', formData)
    alert('Thank you for your interest!')
    
    setFormData({
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      costGuess: '',
      spidrPin: ''
    })
  }

  return (
    <div className="app" style={{ position: 'relative', minHeight: '100vh' }}>
      <div className="form-container">
        <div className="form-header">
          <h1>Get Your Spidr Air Fryer</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="interest-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                placeholder="Enter your first name"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                placeholder="Enter your last name"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handlePhoneChange}
                required
                placeholder="(555) 123-4567"
                maxLength="14"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="your.email@example.com"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="costGuess">Guess the Air Fryer's Cost</label>
            <div className="cost-input-wrapper">
              <span className="currency-symbol">$</span>
              <input
                type="text"
                id="costGuess"
                name="costGuess"
                value={formData.costGuess}
                onChange={handleCostChange}
                required
                placeholder="299.99"
                maxLength="10"
                className="cost-input"
                inputMode="decimal"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="spidrPin">Very Secret 16-Digit Spidr PIN</label>
            <input
              type="text"
              id="spidrPin"
              name="spidrPin"
              value={formData.spidrPin}
              onChange={handlePinChange}
              required
              placeholder="1234-5678-9012-3456"
              maxLength="19"
            />
          </div>

          <button type="submit" className="btn-line">
            Submit Interest
          </button>
        </form>
      </div>
    </div>
  )
}

export default App
