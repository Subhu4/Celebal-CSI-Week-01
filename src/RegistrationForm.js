import './styles.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const countryCityData = {
  India: ['Delhi', 'Mumbai', 'Bangalore'],
  USA: ['New York', 'Los Angeles', 'Chicago'],
  UK: ['London', 'Manchester', 'Liverpool'],
};

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    phoneCode: '+91',
    phoneNumber: '',
    country: '',
    city: '',
    pan: '',
    aadhaar: '',
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    if (formData.country) {
      setCities(countryCityData[formData.country] || []);
      setFormData(prev => ({ ...prev, city: '' }));
    }
  }, [formData.country]);

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    if (!formData.country) newErrors.country = 'Country is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.pan.trim()) newErrors.pan = 'PAN is required';
    if (!formData.aadhaar.trim()) newErrors.aadhaar = 'Aadhaar is required';
    else if (!/^\d{12}$/.test(formData.aadhaar)) newErrors.aadhaar = 'Aadhaar must be 12 digits';
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      navigate('/post-successful-submission', { state: formData });
    }
  };

  const isFormValid = Object.keys(validate()).length === 0;

  return (
    <div style={{ maxWidth: '500px', margin: 'auto' }}>
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
        <div>{errors.firstName}</div>

        <input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
        <div>{errors.lastName}</div>

        <input name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
        <div>{errors.username}</div>

        <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        <div>{errors.email}</div>

        <div>
          <input
            name="password"
            placeholder="Password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
          />
          <label>
            <input type="checkbox" checked={showPassword} onChange={() => setShowPassword(!showPassword)} />
            Show Password
          </label>
        </div>
        <div>{errors.password}</div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <input name="phoneCode" value={formData.phoneCode} onChange={handleChange} style={{ width: '20%' }} />
          <input name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} />
        </div>
        <div>{errors.phoneNumber}</div>

        <select name="country" value={formData.country} onChange={handleChange}>
          <option value="">Select Country</option>
          {Object.keys(countryCityData).map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <div>{errors.country}</div>

        <select name="city" value={formData.city} onChange={handleChange} disabled={!formData.country}>
          <option value="">Select City</option>
          {cities.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
        <div>{errors.city}</div>

        <input name="pan" placeholder="PAN No." value={formData.pan} onChange={handleChange} />
        <div>{errors.pan}</div>

        <input name="aadhaar" placeholder="Aadhaar No." value={formData.aadhaar} onChange={handleChange} />
        <div>{errors.aadhaar}</div>

        <button type="submit" disabled={!isFormValid}>Submit</button>
      </form>
    </div>
  );
};

export default RegistrationForm;